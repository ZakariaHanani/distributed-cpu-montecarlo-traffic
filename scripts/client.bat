@echo off
setlocal ENABLEDELAYEDEXPANSION

set "SCRIPT_DIR=%~dp0"
pushd "%SCRIPT_DIR%\.."
set "ROOT_DIR=%CD%"
popd

echo [client.bat] Project root: %ROOT_DIR%

where java >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java (java.exe) not found in PATH. Please install JDK 17.
    exit /b 1
)

if not exist "%ROOT_DIR%\client\target\classes" (
    echo [ERROR] client\target\classes not found.
    echo         Please run "mvn clean install" at project root.
    exit /b 1
)

if not exist "%ROOT_DIR%\common\target\classes" (
    echo [ERROR] common\target\classes not found.
    echo         Please run "mvn clean install" at project root.
    exit /b 1
)

set "CP=%ROOT_DIR%\common\target\classes;%ROOT_DIR%\client\target\classes"

echo [client.bat] Using classpath:
echo   %CP%
echo.

echo [client.bat] Starting ClientApp...
java -cp "%CP%" com.grid.client.ClientApp

endlocal
