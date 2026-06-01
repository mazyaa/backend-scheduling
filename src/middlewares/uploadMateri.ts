import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { HttpError } from '../utils/error';

const MAX_MATERI_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MATERI_MIME_TYPES = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
]);

const getMateriFileExtension = (mimetype: string, originalName: string): string => {
    if (mimetype === 'application/pdf') {
        return '.pdf';
    }

    if (mimetype === 'application/msword') {
        return '.doc';
    }

    if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        return '.docx';
    }

    if (mimetype === 'application/vnd.ms-powerpoint') {
        return '.ppt';
    }

    if (mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        return '.pptx';
    }

    return path.extname(originalName).toLowerCase();
};

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
        const ext = getMateriFileExtension(file.mimetype, file.originalname);
        const safeName = `materi_${timestamp}${ext}`;
        cb(null, safeName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: MAX_MATERI_FILE_SIZE,
    },
    fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MATERI_MIME_TYPES.has(file.mimetype)) {
            cb(new HttpError('File materi harus berformat PDF, DOC, DOCX, PPT, atau PPTX.', 400));
            return;
        }

        cb(null, true);
    },
});

export const singleMateri = upload.single('file');
