import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure 'uploads/' folder exists
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save the file using original name
    }
});

export const upload = multer({ storage: storage });