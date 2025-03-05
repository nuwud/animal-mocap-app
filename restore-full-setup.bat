@echo off
echo ======================================
echo Restoring Full Setup
echo ======================================
echo.

echo 1. Restoring original package.json...
copy package.json.backup package.json
echo.

echo 2. Restoring original babel.config.js...
copy babel.config.js.backup babel.config.js
echo.

echo 3. Restoring original app.json...
copy app.json.backup app.json
echo.

echo 4. Removing node_modules...
if exist node_modules rmdir /S /Q node_modules
echo.

echo 5. Clearing npm cache...
npm cache clean --force
echo.

echo 6. Installing full dependencies...
npm install --legacy-peer-deps
echo.

echo Restoration complete! 
echo.
echo Note: You may need to manually apply patches with:
echo npx patch-package
echo.
pause
