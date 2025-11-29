@echo off
REM Usage: run-rmiregistry.bat [port]

SET PORT=%1
IF "%PORT%"=="" SET PORT=1099

echo Checking if RMI registry is already running on port %PORT%...

netstat -ano | findstr ":%PORT%" | findstr "LISTENING" > nul

if %ERRORLEVEL% EQU 0 (
    echo RMI registry is already running on port %PORT%.
    echo Nothing to do.
    exit /b 0
)

echo Starting RMI registry on port %PORT%...
start /B rmiregistry -J-Djava.class.path=common\target\classes


timeout /t 2 > nul

echo Checking if startup failed...

netstat -ano | findstr ":%PORT%" | findstr "LISTENING" > nul

if %ERRORLEVEL% NE 0 (
    echo  ERROR: Failed to start RMI registry.
    exit /b 1
)

echo RMI registry is now running on port %PORT%.
