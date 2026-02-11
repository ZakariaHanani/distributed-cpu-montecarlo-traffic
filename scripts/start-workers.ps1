$Count = 4
$ScriptDir = $PSScriptRoot
$WorkerScript = "$ScriptDir\worker.bat"

Write-Host "Starting $Count workers..."

for ($i=1; $i -le $Count; $i++) {
    Write-Host "Starting worker #$i"
    Start-Process -FilePath $WorkerScript
    Start-Sleep -Seconds 2
}

Write-Host "All workers started. Keeping shell open to display logs..."

# Loop forever to keep the shell alive and showing logs
while ($true) {
    Start-Sleep -Seconds 10
}
