module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      /*
       * Path aliases resolver
       * https://github.com/tleunen/babel-plugin-module-resolver
       */
      'module-resolver',
      {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        root: ['./src'],
        alias: {
          src: './src'
        }
      }
    ]
  ]
};
