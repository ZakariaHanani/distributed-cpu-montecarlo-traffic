@echo off
setlocal ENABLEDELAYEDEXPANSION

REM ---------------------------------
REM Resolve project root
REM ---------------------------------
set "SCRIPT_DIR=%~dp0"
pushd "%SCRIPT_DIR%\.."
set "ROOT_DIR=%CD%"
popd

echo [master.bat] Project root: %ROOT_DIR%

REM ---------------------------------
REM Resolve Java (JAVA_HOME -> PATH)
REM ---------------------------------
set "JAVA_CMD="

REM 1) JAVA_HOME/bin/java.exe
if defined JAVA_HOME (
    if exist "%JAVA_HOME%\bin\java.exe" (
        set "JAVA_CMD=%JAVA_HOME%\bin\java.exe"
    )
)

REM 2) If still empty, try java from PATH
if not defined JAVA_CMD (
    for /f "delims=" %%J in ('where java 2^>nul') do (
        set "JAVA_CMD=%%J"
        goto :AfterJavaSearch
    )
)

:AfterJavaSearch
if not defined JAVA_CMD (
    echo [ERROR] Could not find Java (JDK 17).
    echo         Please either:
    echo           - Install Java and add it to PATH, or
    echo           - Set JAVA_HOME to your JDK installation.
    exit /b 1
)

echo [master.bat] Using Java: %JAVA_CMD%

REM ---------------------------------
REM Build classpath and run
REM ---------------------------------
set "CP=%ROOT_DIR%\common\target\classes;%ROOT_DIR%\master\target\classes"

echo [master.bat] Using classpath:
echo   %CP%
echo.

"%JAVA_CMD%" -cp "%CP%" com.grid.master.MasterNode

endlocal
