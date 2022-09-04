const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");


if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executejava = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPutFilePath = path.join(outputPath, `${jobId}`);
  const codePath = path.join(__dirname, "codes");

  return new Promise((resolve, reject) => {
    console.log(outputPath,jobId)
    console.log(`javac ${filepath}  && cd  ${codePath} && java ${"Main"} `)
    exec(
      `javac ${filepath}  && cd  ${codePath} && java ${"Main"}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executejava,
};
