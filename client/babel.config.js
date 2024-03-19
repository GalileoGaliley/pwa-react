module.exports = {
    presets: [],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./app'],
          extensions: ['.js', '.ts', '.tsx', '.json'],
          alias: {
            '@app': './app',
            '@assets': './assets',
          },
        },
      ],
    ],
  };
  