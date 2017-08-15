const {spawn} = require("child_process");
const {stderr} = require("process");

module.exports = function(source) {
  /* module.id reference is a workaround for the issue addressed in the
     following change in extract-text-webpack-plugin:
     Refer to the entry point instead of the first module for default identifier
     by akihikodaki · Pull Request #601 ·
     webpack-contrib/extract-text-webpack-plugin
     https://github.com/webpack-contrib/extract-text-webpack-plugin/pull/601
  */
  const callback = this.async();
  const process = spawn("git",
                        ["log", "-1", "--format=%ct", "--", this.resourcePath],
                        {stdio: ["ignore", "pipe", stderr]});

  let result = source + ";module.exports = [[module.id, module.exports({lastModified: new Date(";

  process.stdout.on("data", chunk => chunk && (result += chunk));
  process.stdout.on("end", chunk => callback(null, result + " * 1000)})]];"));

  process.on("error", error => {
    process.stdout.removeAllListeners();
    this.callback(error);
  });
}
