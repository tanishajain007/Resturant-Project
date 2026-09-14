const multer = require("multer")
const path = require("path")
const fs = require("fs")

const uploadPath = path.join(__dirname, "../public/uploads");

console.log(uploadPath);
console.log(__dirname)

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage: Storage });

module.exports = upload;