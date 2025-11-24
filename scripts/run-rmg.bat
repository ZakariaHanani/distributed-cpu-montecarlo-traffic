@echo off
REM Usage: run-rmg.bat [port]
REM Default port = 1099

SET PORT=%1
IF "%PORT%"=="" SET PORT=1099

echo Starting RMI registry on port %PORT%...
start /B rmiregistry %PORT%

timeout /t 2 > nul
if errorlevel 1 (
    echo  Failed to start RMI registry
    exit /b 1
) else (
    echo  RMI registry should be running on port %PORT%
)
