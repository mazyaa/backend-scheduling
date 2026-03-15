import { Request, Response } from 'express';
import * as uploader from '../utils/uploader';

export const single = async (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    res.status(400).json({
      message: 'No file uploaded',
    });
    return;
  }
  try {
    const result = await uploader.singleUpload(file as Express.Multer.File);

    res.status(200).json({
      message: 'File Uploaded Successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to upload file',
      error: error,
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { fileUrl } = req.body as { fileUrl: string };
    const result = await uploader.remove(fileUrl);

    res.status(200).json({
      message: 'File Removed Successfully!',
      data: result,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Failed to remove file',
      error: error,
    });
  }

}
