@echo off
setlocal ENABLEDELAYEDEXPANSION

REM ---------------------------------------------------
REM Resolve project root (parent of /scripts)
REM ---------------------------------------------------
set "SCRIPT_DIR=%~dp0"
pushd "%SCRIPT_DIR%\.."
set "ROOT_DIR=%CD%"
popd

echo [master.bat] Project root: %ROOT_DIR%

REM ---------------------------------------------------
REM Quick check: Java available?
REM (full JAVA_HOME detection is for 14.3)
REM ---------------------------------------------------
where java >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java (java.exe) not found in PATH. Please install JDK 17.
    exit /b 1
)

REM ---------------------------------------------------
REM Check compiled classes (ask user to run mvn clean install if missing)
REM ---------------------------------------------------
if not exist "%ROOT_DIR%\master\target\classes" (
    echo [ERROR] master\target\classes not found.
    echo         Please run "mvn clean install" at project root.
    exit /b 1
)

if not exist "%ROOT_DIR%\common\target\classes" (
    echo [ERROR] common\target\classes not found.
    echo         Please run "mvn clean install" at project root.
    exit /b 1
)

REM ---------------------------------------------------
REM Build classpath (only project classes for now)
REM ---------------------------------------------------
set "CP=%ROOT_DIR%\common\target\classes;%ROOT_DIR%\master\target\classes"

echo [master.bat] Using classpath:
echo   %CP%
echo.

REM ---------------------------------------------------
REM Start Master node
REM ---------------------------------------------------
echo [master.bat] Starting MasterNode...
java -cp "%CP%" com.grid.master.MasterNode

endlocal
