# Script PowerShell per avviare un Server Web locale leggero su Socket TCP (senza privilegi di amministratore)
# Consente di collegare l'iPhone/iPad nella stessa rete Wi-Fi per utilizzare la Web App

$Port = 8080
$SourceDir = $PSScriptRoot

# Mappings per i tipi di file (MIME Types)
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

# 1. Recupera l'indirizzo IP locale del PC nella rete Wi-Fi
$IPAddresses = Get-NetIPAddress -AddressFamily IPv4 | 
    Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" } | 
    Select-Object -ExpandProperty IPAddress

if ($null -eq $IPAddresses) {
    $IPAddresses = @("127.0.0.1")
}

# 2. Inizializza il TcpListener (non richiede diritti di amministratore a differenza di HttpListener)
$Listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)

try {
    $Listener.Start()
} catch {
    Write-Error "Impossibile avviare il server sulla porta $Port. Assicurati che la porta non sia occupata da un altro programma."
    exit
}

Clear-Host
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "      SERVER WEB LOCALE - REGISTRAZIONE LOTTI HACCP PWA" -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Il server è attivo e in ascolto!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Per aprire la Web App sul tuo iPhone/iPad:" -ForegroundColor White
Write-Host "1. Collega l'iPhone/iPad alla STESSA rete Wi-Fi di questo PC." -ForegroundColor White
Write-Host "2. Apri Safari su iOS e digita uno dei seguenti indirizzi:" -ForegroundColor White
Write-Host ""
foreach ($ip in $IPAddresses) {
    Write-Host "   -> http://$ip`:$Port/index.html" -ForegroundColor Green -NoNewline
    if ($ip -eq "127.0.0.1") { Write-Host " (Solo per test su questo PC)" -ForegroundColor DarkGray } else { Write-Host "" }
}
Write-Host ""
Write-Host "3. Su Safari per iOS, premi il pulsante 'Condividi' (icona con quadrato e freccia in alto)" -ForegroundColor White
Write-Host "   e seleziona 'Aggiungi a schermata Home' per installarla come App!" -ForegroundColor White
Write-Host ""
Write-Host "Premi CTRL+C in questa finestra per arrestare il server." -ForegroundColor Red
Write-Host "=================================================================" -ForegroundColor Cyan

# Coda di esecuzione
try {
    while ($true) {
        if (-not $Listener.Pending()) {
            Start-Sleep -Milliseconds 30
            continue
        }
        
        $Client = $Listener.AcceptTcpClient()
        $Stream = $Client.GetStream()
        
        # Buffer di lettura richiesta
        $Buffer = New-Object System.Byte[] 4096
        $BytesRead = $Stream.Read($Buffer, 0, $Buffer.Length)
        if ($BytesRead -gt 0) {
            $RequestString = [System.Text.Encoding]::UTF8.GetString($Buffer, 0, $BytesRead)
            
            # Estrazione del percorso richiesto (es. GET /index.html HTTP/1.1)
            if ($RequestString -match "^[A-Z]+\s+([^\s\?]+)") {
                $RawUrl = $Matches[1]
                if ($RawUrl -eq "/" -or $RawUrl -eq "") {
                    $RawUrl = "/index.html"
                }
                
                # Decodifica caratteri URL ed imposta percorso locale
                $DecodedUrl = [System.Uri]::UnescapeDataString($RawUrl)
                $LocalPath = Join-Path $SourceDir $DecodedUrl.Replace("/", "\")
                
                if (Test-Path $LocalPath -PathType Leaf) {
                    $Extension = [System.IO.Path]::GetExtension($LocalPath).ToLower()
                    $ContentType = $MimeTypes[$Extension]
                    if ($null -eq $ContentType) {
                        $ContentType = "application/octet-stream"
                    }
                    
                    $FileBytes = [System.IO.File]::ReadAllBytes($LocalPath)
                    
                    # Generazione Headers HTTP
                    $Header = "HTTP/1.1 200 OK`r`n" +
                              "Content-Type: $ContentType`r`n" +
                              "Content-Length: $($FileBytes.Length)`r`n" +
                              "Access-Control-Allow-Origin: *`r`n" +
                              "Connection: close`r`n`r`n"
                    
                    $HeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($Header)
                    
                    # Invio headers e file bytes
                    $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
                    $Stream.Write($FileBytes, 0, $FileBytes.Length)
                } else {
                    # 404 Not Found
                    $Body = "404 - File non trovato."
                    $BodyBytes = [System.Text.Encoding]::UTF8.GetBytes($Body)
                    $Header = "HTTP/1.1 404 Not Found`r`n" +
                              "Content-Type: text/plain; charset=utf-8`r`n" +
                              "Content-Length: $($BodyBytes.Length)`r`n" +
                              "Connection: close`r`n`r`n"
                    $HeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($Header)
                    $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
                    $Stream.Write($BodyBytes, 0, $BodyBytes.Length)
                }
            }
        }
        $Client.Close()
    }
} catch {
    # Gestione arresto
} finally {
    $Listener.Stop()
}
