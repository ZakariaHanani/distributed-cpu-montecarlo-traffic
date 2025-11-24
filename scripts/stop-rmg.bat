@echo off
for /f "tokens=2" %%i in ('tasklist ^| findstr rmiregistry.exe') do (
    echo Stopping RMI registry (PID %%i)...
    taskkill /PID %%i /F
)
echo  Done