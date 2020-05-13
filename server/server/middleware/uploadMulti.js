const multer = require('multer');
const uid = require('uid');
const path =require('path')

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "server/media/posts");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, uid(5) +  path.extname(file.originalname));
    }
});


module.exports =  multer({ storage: storage }).array('image',15);