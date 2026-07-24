@echo off
title TOEIC Practice Hub
echo ============================================================
echo   KHOI DONG UNG DUNG TOEIC PRACTICE HUB (CHROME PROFILE 14)
echo ============================================================
echo.

cd /d "%~dp0"

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [Loi] May tinh cua ban chua duoc cai dat Node.js!
    echo Vui long tai va cai dat Node.js tai: https://nodejs.org/
    pause
    exit /b
)

echo [*] Dang khoi dong dev server Vite (cua so thu nho)...
start /min cmd /c "npm run dev"

echo [*] Dang cho 2 giay de server san sang...
ping -n 3 127.0.0.1 >nul

echo [*] Dang tu dong mo ung dung bang Google Chrome (Profile 14)...
start chrome --profile-directory="Profile 14" http://localhost:5173/

echo.
echo ============================================================
echo   UNG DUNG TOEIC DA KHOI DONG THANH CONG!
echo   - Trinh duyet Google Chrome (Profile 14) da duoc mo.
echo   - Vui long khong tat cua so den nay trong khi hoc.
echo   - Cua so nay se tu dong dong va tat server khi bam phim bat ky.
echo ============================================================
echo.
echo Bam phim bat ky de DONG trinh khoi dong va TAT server...
pause >nul

:: Clean up node processes started by the dev server on exit
taskkill /f /im node.exe >nul 2>nul
