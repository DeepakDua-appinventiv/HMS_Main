import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, '/home/admin446/Desktop/Hospital Mang Project/public/uploads'); 
    },
    filename: (req, file, cb) => {
      return cb(null, file.originalname); 
    }
  });
  
  const upload = multer({ storage:storage });

  export default {upload};