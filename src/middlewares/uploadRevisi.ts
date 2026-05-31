import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        const { penilaianId } = req.params;
        const dir = path.join(process.cwd(), 'uploads', 'revisi', penilaianId);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        const timestamp = Date.now();
        const ext = path.extname(file.originalname);
        const safeName = `revisi_admin_${timestamp}${ext}`;
        cb(null, safeName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
});

export const singleRevisi = upload.single('file');
