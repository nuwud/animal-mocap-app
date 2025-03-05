@echo off
echo ======================================
echo Switching to Simple Setup
echo ======================================
echo.

echo 1. Backing up original package.json...
copy package.json package.json.backup
echo.

echo 2. Applying simple package.json...
copy package.simple.json package.json
echo.

echo 3. Removing node_modules...
if exist node_modules rmdir /S /Q node_modules
echo.

echo 4. Clearing npm cache...
npm cache clean --force
echo.

echo 5. Installing minimal dependencies...
npm install
echo.

echo Setup complete! You can now run:
echo npm start
echo.
echo To restore the original setup, run:
echo copy package.json.backup package.json
echo.
pause
