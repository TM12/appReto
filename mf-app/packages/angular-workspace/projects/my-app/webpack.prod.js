const { WebpackBundleAnalyzer } = require('webpack-bundle-analyzer');
const GitRevisionPlugin = require('git-revision-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = {
  // Otras configuraciones de Webpack aquí
  plugins: [
    new WebpackBundleAnalyzer(),
    new webpack.DefinePlugin({
      'process.env': {
        COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
        BUILD_DATE: JSON.stringify(new Date().toISOString()),
      },
    }),
  ],
};
