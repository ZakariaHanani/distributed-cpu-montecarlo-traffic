@echo off
setlocal enabledelayedexpansion

rem --------------------------------------------------------
rem Resolve project root (one level above /scripts)
rem --------------------------------------------------------
set "SCRIPT_DIR=%~dp0"
set "ROOT_DIR=%SCRIPT_DIR%\.."

rem --------------------------------------------------------
rem Resolve Java: prefer JAVA_HOME, then PATH
rem --------------------------------------------------------
set "JAVA_CMD="

rem 1) JAVA_HOME\bin\java.exe
if defined JAVA_HOME if exist "%JAVA_HOME%\bin\java.exe" (
    set "JAVA_CMD=%JAVA_HOME%\bin\java.exe"
)

rem 2) Fallback: java from PATH
if not defined JAVA_CMD (
    for /f "delims=" %%i in ('where java 2^>nul') do (
        set "JAVA_CMD=%%i"
        goto :have_java
    )
)

:have_java
if not defined JAVA_CMD (
    echo [ERROR] Java (JDK 17) not found.
    echo         Please either:
    echo           - install Java and add ^"java^" to your PATH
    echo           - or set JAVA_HOME to your JDK folder.
    exit /b 1
)

echo [worker.bat] Using Java: %JAVA_CMD%

rem --------------------------------------------------------
rem Classpath and main class
rem --------------------------------------------------------
set "CP=%ROOT_DIR%\common\target\classes;%ROOT_DIR%\worker\target\classes"

echo [worker.bat] Using classpath:
echo   %CP%
echo.

rem NOTE: if your main class is com.grid.worker.workerApp (lowercase w),
rem change the next line accordingly.
"%JAVA_CMD%" -cp "%CP%" com.grid.worker.workerApp

endlocal
