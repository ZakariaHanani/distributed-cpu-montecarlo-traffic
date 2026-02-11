@echo off
set "SCRIPT_DIR=%~dp0"
cd "%SCRIPT_DIR%\..\auth-service"
call mvnw.cmd spring-boot:run
