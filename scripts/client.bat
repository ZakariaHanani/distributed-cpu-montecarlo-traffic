@echo off
setlocal enabledelayedexpansion

set "SCRIPT_DIR=%~dp0"
call "%SCRIPT_DIR%\set-env.bat"
set "ROOT_DIR=%SCRIPT_DIR%\.."

set "JAVA_CMD=%JAVA_HOME%\bin\java.exe"

echo [client.bat] Using Java: %JAVA_CMD%

set "CP=%ROOT_DIR%\common\target\classes;%ROOT_DIR%\client\target\classes"
echo [client.bat] Using classpath: %CP%

"%JAVA_CMD%" -cp "%CP%" com.grid.client.ClientApp

endlocal
