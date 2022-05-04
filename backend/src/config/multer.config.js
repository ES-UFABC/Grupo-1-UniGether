const multer = require('multer');
const crypto = require('crypto');
const { resolve } = require('path');

module.exports = {
    upload(folder){
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', 'tmp', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`
                    return callback(null, fileName)
                },
            }),
            limits: {filesize:0.5 * 1024 * 1024},
        }
    }
};