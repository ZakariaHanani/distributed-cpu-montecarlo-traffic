@echo off
echo =======================================
echo   Stopping RMI Registry (rmiregistry)
echo =======================================

REM Find rmiregistry.exe process
for /f "tokens=2" %%i in ('tasklist ^| findstr /I "rmiregistry.exe"') do (
    echo Found rmiregistry with PID %%i
    echo Killing process...
    taskkill /PID %%i /F >nul
    echo Successfully stopped RMI registry.
    goto end
)

echo No running RMI registry found.

:end
echo Done.
