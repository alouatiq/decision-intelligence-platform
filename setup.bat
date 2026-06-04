@echo off
REM 🎯 Decision Intelligence Platform - Setup Script (Windows)
REM This script sets up the project for development

echo.
echo 📦 Decision Intelligence Platform Setup
echo ======================================== 
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
for /f "tokens=*" %%i in ('node -v') do echo ✅ Node.js version: %%i
for /f "tokens=*" %%i in ('npm -v') do echo ✅ npm version: %%i
echo.

REM Check if package.json exists
if not exist package.json (
    echo ❌ package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm install failed
    pause
    exit /b 1
)

echo.
echo ✅ Setup complete!
echo.
echo 🚀 To start development, run:
echo    npm run dev
echo.
echo 📚 Documentation:
echo    - README.md - Full documentation
echo    - QUICKSTART.md - Quick start guide
echo    - SETUP_COMPLETE.md - Project overview
echo.
echo 🎯 Available commands:
echo    npm run dev     - Start development server
echo    npm run build   - Build for production
echo    npm run preview - Preview production build
echo.
echo Happy deciding! 🎉
echo.
pause
