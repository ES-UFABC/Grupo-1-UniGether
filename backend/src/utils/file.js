const fs = require("fs")

const deleteFile = async (fileName) => {
    await fs.promises
        .stat(fileName)
        .catch()
        .then(() => fs.promises.unlink(fileName));
}

module.exports = {
    deleteFile
}