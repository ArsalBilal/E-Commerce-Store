module.exports = {
  webpack: {
    configure: {
      ignoreWarnings: [
        { module: /html-webpack-plugin/ }
      ]
    }
  }
}