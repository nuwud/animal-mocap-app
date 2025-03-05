# Animal MoCap App - Simple Setup

This simplified setup is for testing the basic app structure without the complex dependencies that were causing issues.

## Steps to Use the Simple Setup

1. Run the simplified setup script:
   ```
   use-simple-setup.bat
   ```

2. This will:
   - Back up your original package.json
   - Replace it with a simplified version
   - Remove node_modules
   - Install minimal dependencies

3. Start the app with:
   ```
   npm start
   ```

4. To return to the full setup later:
   ```
   copy package.json.backup package.json
   npm install --legacy-peer-deps
   ```

## What's Different in the Simple Setup?

The simple setup removes:
- TensorFlow.js dependencies
- Camera-related packages
- Patch-package dependencies

It provides a basic app that just shows a simple interface with a test button, which allows you to verify that the React Native environment is working correctly.

## Troubleshooting

If you still encounter issues:
1. Make sure no processes are using files in the project directory
2. Restart your computer to release any locked files
3. Try running command prompt as administrator

Once the simple setup is working, we can gradually add back the advanced features.