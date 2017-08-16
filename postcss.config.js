module.exports = {
  plugins: [
    require('stylelint'),
    require('postcss-cssnext'),
    require('postcss-reporter')(
      {throwError: Boolean(process.env.POSTCSS_THROW_ERROR)}),
  ],
};
