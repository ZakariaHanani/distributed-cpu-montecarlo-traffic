@echo off
setlocal

rem --------------------------------------------------------
rem Resolve project root (one level above /scripts)
rem --------------------------------------------------------
set "SCRIPT_DIR=%~dp0"
call "%SCRIPT_DIR%\set-env.bat"
set "ROOT_DIR=%SCRIPT_DIR%\.."

echo [run-rmg.bat] Starting RMI Registry on port 1099...

rem Set CLASSPATH to include common classes (where interfaces usually are)
set "CLASSPATH=%ROOT_DIR%\common\target\classes"
echo [run-rmg.bat] CLASSPATH: %CLASSPATH%

"%JAVA_HOME%\bin\rmiregistry" 1099

endlocal
