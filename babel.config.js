module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@src': './src',
            '@app': './src/app',
            '@core': './src/core',
            '@assets': './assets',
            '@components': './src/app/components',
            '@screens': './src/app/screens',
            '@navigation': './src/app/navigation',
            '@state': './src/app/state',
            '@vision': './src/vision',
          },
        },
      ],
    ],
  };
};