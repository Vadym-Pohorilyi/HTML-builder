const { mkdir, copyFile, readdir, rm } = require('fs/promises');
const path = require('path');
const filesCopyPath = path.join(__dirname, 'files-copy');
const filesDirPath = path.join(__dirname, 'files');

async function createNewCopyDir() {
    try {
        await mkdir(filesCopyPath, {recursive: true});
        await clearCopyDir();

        const files = await readdir(filesDirPath);

        for(let file of files) {
            await copyFile(path.join(filesDirPath, file), path.join(filesCopyPath, file));
        }
    } catch(err) {
        console.error(err);
    }
};

async function clearCopyDir() {
    const filesInCopyDir = await readdir(filesCopyPath);

    for(let file of filesInCopyDir) {
        await rm(path.join(filesCopyPath, file), {force: true});
    }
};

createNewCopyDir();