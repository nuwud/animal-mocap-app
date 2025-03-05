@echo off
echo ======================================
echo Animal MoCap App - Setup Helper
echo ======================================
echo.
echo This script will help you set up and run the Animal MoCap app.
echo.

:MENU
echo Choose an option:
echo 1. Install dependencies (clean install)
echo 2. Update dependencies (preserve existing node_modules)
echo 3. Build and run on Android device
echo 4. Run development server only
echo 5. Clear build caches and node_modules
echo 6. Exit
echo.

set /p choice=Enter your choice (1-6): 

if "%choice%"=="1" goto CLEAN_INSTALL
if "%choice%"=="2" goto UPDATE_DEPS
if "%choice%"=="3" goto BUILD_ANDROID
if "%choice%"=="4" goto DEV_SERVER
if "%choice%"=="5" goto CLEAR_CACHE
if "%choice%"=="6" goto EXIT

echo Invalid choice. Please try again.
goto MENU

:CLEAN_INSTALL
echo.
echo ======================================
echo Performing clean installation
echo ======================================
echo.
if exist node_modules rmdir /S /Q node_modules
if exist yarn.lock del yarn.lock
if exist package-lock.json del package-lock.json
npm install --legacy-peer-deps
echo.
echo Installation complete!
echo.
goto MENU

:UPDATE_DEPS
echo.
echo ======================================
echo Updating dependencies
echo ======================================
echo.
npm install --legacy-peer-deps
npx patch-package
echo.
echo Dependencies updated!
echo.
goto MENU

:BUILD_ANDROID
echo.
echo ======================================
echo Building and running on Android
echo ======================================
echo.
echo Checking for connected devices...
adb devices
echo.
echo Building and installing app on connected device...
npm run android
echo.
goto MENU

:DEV_SERVER
echo.
echo ======================================
echo Starting development server
echo ======================================
echo.
echo Press Ctrl+C to stop the server when done.
npm start
echo.
goto MENU

:CLEAR_CACHE
echo.
echo ======================================
echo Clearing caches and node_modules
echo ======================================
echo.
if exist node_modules rmdir /S /Q node_modules
if exist yarn.lock del yarn.lock
if exist package-lock.json del package-lock.json
if exist android\build rmdir /S /Q android\build
if exist android\app\build rmdir /S /Q android\app\build
if exist android\.gradle rmdir /S /Q android\.gradle
if exist .expo rmdir /S /Q .expo
if exist .expo-cache rmdir /S /Q .expo-cache
npm cache clean --force
echo.
echo All caches and build directories cleared!
echo.
goto MENU

:EXIT
echo.
echo Thank you for using Animal MoCap App!
echo.
exit /b 0
