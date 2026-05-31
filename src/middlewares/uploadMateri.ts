import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        const dir = path.join(process.cwd(), 'uploads', 'materi');

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const safeName = `materi_${timestamp}${ext}`;
        cb(null, safeName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
    },
});

export const singleMateri = upload.single('file');
