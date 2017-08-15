module.exports = function(source) {
  /* module.id reference is a workaround for the issue addressed in the
     following change in extract-text-webpack-plugin:
     Refer to the entry point instead of the first module for default identifier
     by akihikodaki · Pull Request #601 ·
     webpack-contrib/extract-text-webpack-plugin
     https://github.com/webpack-contrib/extract-text-webpack-plugin/pull/601
  */
  return source + ";module.exports = [[module.id, module.exports()]];";
}
