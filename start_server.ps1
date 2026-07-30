# Script PowerShell Server Web per Collaudo Locale (Non-Blocking con Timeout Socket)
$Port = 8080
$SourceDir = $PSScriptRoot

$MimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".ico"  = "image/x-icon"
    ".wasm" = "application/wasm"
}

$IPAddresses = Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" } | 
    Select-Object -ExpandProperty IPAddress

if ($null -eq $IPAddresses) { $IPAddresses = @("127.0.0.1") }

$Listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)

try {
    $Listener.Start()
} catch {
    Write-Error "Impossibile avviare il server sulla porta $Port."
    exit
}

Clear-Host
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "      SERVER WEB LOCALE HACCP - ATTIVO E ROBUSTO" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Indirizzi per accedere:" -ForegroundColor White
Write-Host " -> http://localhost:$Port/index.html (Su questo PC)" -ForegroundColor Green
foreach ($ip in $IPAddresses) {
    Write-Host " -> http://$ip`:$Port/index.html (Da iPhone/iPad)" -ForegroundColor Green
}
Write-Host ""
Write-Host "=================================================================" -ForegroundColor Cyan

while ($true) {
    try {
        if ($Listener.Pending()) {
            $Client = $Listener.AcceptTcpClient()
            $Client.ReceiveTimeout = 1000
            $Client.SendTimeout = 1000
            $Stream = $Client.GetStream()
            $Stream.ReadTimeout = 1000

            $Buffer = New-Object System.Byte[] 8192
            try {
                $BytesRead = $Stream.Read($Buffer, 0, $Buffer.Length)
                if ($BytesRead -gt 0) {
                    $RequestString = [System.Text.Encoding]::UTF8.GetString($Buffer, 0, $BytesRead)
                    
                    if ($RequestString -match "^GET\s+([^\s\?]+)") {
                        $RawUrl = $Matches[1]
                        if ($RawUrl -eq "/" -or $RawUrl -eq "") { $RawUrl = "/index.html" }
                        
                        $DecodedUrl = [System.Uri]::UnescapeDataString($RawUrl)
                        $LocalPath = Join-Path $SourceDir $DecodedUrl.Replace("/", "\")
                        
                        if (Test-Path $LocalPath -PathType Leaf) {
                            $Extension = [System.IO.Path]::GetExtension($LocalPath).ToLower()
                            $ContentType = $MimeTypes[$Extension]
                            if ($null -eq $ContentType) { $ContentType = "application/octet-stream" }
                            
                            $FileBytes = [System.IO.File]::ReadAllBytes($LocalPath)
                            $Header = "HTTP/1.1 200 OK`r`n" +
                                      "Content-Type: $ContentType`r`n" +
                                      "Content-Length: $($FileBytes.Length)`r`n" +
                                      "Access-Control-Allow-Origin: *`r`n" +
                                      "Connection: close`r`n`r`n"
                            $HeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($Header)
                            $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
                            $Stream.Write($FileBytes, 0, $FileBytes.Length)
                        } else {
                            $Body = "404 - File non trovato."
                            $BodyBytes = [System.Text.Encoding]::UTF8.GetBytes($Body)
                            $Header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($BodyBytes.Length)`r`nConnection: close`r`n`r`n"
                            $HeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($Header)
                            $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
                            $Stream.Write($BodyBytes, 0, $BodyBytes.Length)
                        }
                    }
                }
            } catch {
                # Safe catch socket read timeout
            } finally {
                $Client.Close()
            }
        } else {
            Start-Sleep -Milliseconds 20
        }
    } catch {
        # Loop safety
    }
}
