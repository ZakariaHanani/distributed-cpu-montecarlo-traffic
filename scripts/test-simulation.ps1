$baseUrl = "http://localhost:8081/api/simulations"

try {
    # 1. Check workers
    Write-Host "Checking workers..."
    $workers = Invoke-RestMethod -Uri "$baseUrl/workers" -ErrorAction Stop
    Write-Host "Worker count: $($workers.count)"

    if ($workers.count -eq 0) {
        Write-Host "No workers found! Please start workers."
        exit 1
    }

    # 2. Submit simulation
    Write-Host "Submitting simulation..."
    $body = @{
        gridSize = 5
        numberOfCars = 50
        monteCarloIterations = 3000
        weather = "SUNNY"
        trafficLightsEnabled = $true
        seed = 12345
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri $baseUrl -Method Post -Body $body -ContentType "application/json"
    $jobId = $response.jobId
    Write-Host "Job submitted. ID: $jobId"

    # 3. Poll for completion
    Write-Host "Polling for results..."
    $status = "RUNNING"
    while ($status -eq "RUNNING" -or $status -eq "PENDING") {
        Start-Sleep -Seconds 1
        $jobResult = Invoke-RestMethod -Uri "$baseUrl/$jobId"
        $status = $jobResult.status
        Write-Host "Status: $status"
    }

    if ($status -eq "COMPLETED") {
        Write-Host "Simulation completed!"
        
        # 4. Fetch worker results
        $workerResults = Invoke-RestMethod -Uri "$baseUrl/$jobId/worker-results"
        Write-Host "Worker Results Breakdown:"
        $workerResults | ConvertTo-Json -Depth 5 | Write-Host
        
        Write-Host "`nTest Passed: Simulation distributed and completed successfully."
    } else {
        Write-Host "Simulation failed: $($jobResult.errorMessage)"
        exit 1
    }
} catch {
    Write-Host "Error occurred: $_"
    exit 1
}
