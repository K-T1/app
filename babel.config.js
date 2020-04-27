module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      'babel-preset-expo',
      'module:metro-react-native-babel-preset',
      'module:react-native-dotenv',
    ],
    plugins: [
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@api': './src/api',
            '@assets': './src/assets',
            '@components': './src/components',
            '@configs': './src/configs',
            '@models': './src/models',
            '@navigators': './src/navigators',
            '@screens': './src/screens',
            '@stores': './src/stores',
            '@styles': './src/styles',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  }
}
