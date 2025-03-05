@echo off
echo ======================================
echo Animal MoCap App - Minimal Setup
echo ======================================
echo.
echo This script will perform a minimal setup for testing.
echo.

echo 1. Removing old node_modules...
if exist node_modules rmdir /S /Q node_modules
echo.

echo 2. Clearing npm cache...
npm cache clean --force
echo.

echo 3. Installing only core dependencies...
npm install --no-save expo react-native react-native-permissions react
echo.

echo 4. Setup complete!
echo.
echo Now you can run:
echo npm start
echo.
pause
