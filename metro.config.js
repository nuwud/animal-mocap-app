// @ts-check
const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const exclusionList = require('metro-config/src/defaults/exclusionList');

/**
 * Get the root configuration based on if Expo is available
 */
const getBaseConfig = () => {
  try {
    // Try to use Expo's config if available
    const { getDefaultConfig: getExpoConfig } = require('expo/metro-config');
    return getExpoConfig(__dirname);
  } catch (e) {
    // Fall back to React Native's config
    return getDefaultConfig(__dirname);
  }
};

const defaultConfig = getBaseConfig();

// Safely extract sourceExts and assetExts
let sourceExts = [];
let assetExts = [];

if (defaultConfig && defaultConfig.resolver) {
  sourceExts = defaultConfig.resolver.sourceExts || [];
  assetExts = defaultConfig.resolver.assetExts || [];
}

// Support local modules
const watchFolders = [
  path.resolve(__dirname, "./modules"),
  path.resolve(__dirname, "./node_modules"),
];

// Avoid processing the same files twice
const blockedFiles = [
  /.*\/modules\/.*\/node_modules\/.*/,
  /.*\/node_modules\/react-native\/.*\/node_modules\/.*/,
];

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    resolverMainFields: ["sbmodern", "react-native", "browser", "main"],
    blacklistRE: exclusionList(blockedFiles),
    // For older Metro versions
    blockList: exclusionList(blockedFiles),
    nodeModulesPaths: [path.resolve(__dirname, './node_modules')],
    disableHierarchicalLookup: true,
  },
  watchFolders,
};

module.exports = mergeConfig(defaultConfig, config);
