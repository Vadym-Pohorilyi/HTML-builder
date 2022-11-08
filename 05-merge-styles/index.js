const fs = require("fs");
const path = require("path");
const { readdir } = require("node:fs/promises");

const stylesPath = path.join(__dirname, "/styles");
const distPath = path.join(__dirname, "/project-dist");
const ext = (file) => path.extname(file.name);
const read = (file) => fs.createReadStream(`${stylesPath}/${file.name}`, "UTF-8");
const write = (name) => fs.createWriteStream(`${distPath}/${name}`, "UTF-8");
const temp = [];

const createBundle = async () => {
  const files = await readdir(stylesPath, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile() && ext(file) == ".css") {
      temp.push(
        new Promise((res) => read(file).on("data", (data) => res(data)))
      );
    }
  }

  Promise.all(temp).then((data) => write("bundle.css").write(data.join("")));
};

createBundle();