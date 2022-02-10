import path from "path";
import multer from "multer";

export const setMulterForBookImage = (id: string, imgStorePath: string) => {
    const storage = multer.diskStorage({
        destination: imgStorePath,
        filename(req, file, cb) {
            cb(null, (Number(id) + 1).toString() + path.extname(file.originalname));
        },
    });
    
    const upload = multer({
        storage,
        fileFilter(req, file, cb) {
            if (file.mimetype != 'image/jpeg') {
                cb(new Error('File extension is not the .jpg'));
            } 
            else {
                cb(null, true);
            }
        } 
    });

    return upload;
}