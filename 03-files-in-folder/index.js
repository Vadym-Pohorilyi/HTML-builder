const { stdout } = process;
const { readdir, stat } = require('fs/promises');

const path = require('path');

const currentDir = path.join(__dirname, 'secret-folder');

stdout.write('\n');

async function readFiles() {
    try {
        const files = await readdir(currentDir, {withFileTypes: true});

        for (const file of files) {
            let fileStats = await stat(path.join(currentDir, file.name));

            if(file.isFile() && fileStats.isFile()) {
                let fileName = file.name.split('.')[0];
                let fileType = path.extname(file.name).slice(1);
                let fileSize = fileStats.size / 1024;

                stdout.write(`${fileName} - ${fileType} - ${fileSize.toFixed(3)}kb\n`)
            }
        }

      } catch (err) {
        console.error(err)
      }
};

readFiles();