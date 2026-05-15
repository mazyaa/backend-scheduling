import Joi, { ValidationError } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { generateJoiErrorMessage } from '../../utils/helper';

export const createPesertaSchema = Joi.object({
  name: Joi.string().max(150).required(),
  email: Joi.string().email().max(150).required(),
  noWa: Joi.string().max(20).required(),
  password: Joi.string().max(255).allow(null, '').optional(),
  keahlian: Joi.string().max(255).allow(null, '').optional(),
  
  instansi: Joi.string().max(200).allow(null, '').optional(),
  fileCv: Joi.string().allow(null, '').optional(),
  fileIjazah: Joi.string().allow(null, '').optional(),
  fileSuratRekomendasi: Joi.string().allow(null, '').optional(),
  fileKtp: Joi.string().allow(null, '').optional(),
  fileFoto: Joi.string().allow(null, '').optional(),
  fileBuktiBayar: Joi.string().allow(null, '').optional(),
  fileBuktiFollow: Joi.string().allow(null, '').optional(),
  
  jadwalTrainingId: Joi.string().uuid().allow(null, '').optional(),
});

export const updatePesertaSchema = Joi.object({
  name: Joi.string().max(150).optional(),
  email: Joi.string().email().max(150).optional(),
  noWa: Joi.string().max(20).optional(),
  password: Joi.string().max(255).allow(null, '').optional(),
  keahlian: Joi.string().max(255).allow(null, '').optional(),
  
  instansi: Joi.string().max(200).allow(null, '').optional(),
  fileCv: Joi.string().allow(null, '').optional(),
  fileIjazah: Joi.string().allow(null, '').optional(),
  fileSuratRekomendasi: Joi.string().allow(null, '').optional(),
  fileKtp: Joi.string().allow(null, '').optional(),
  fileFoto: Joi.string().allow(null, '').optional(),
  fileBuktiBayar: Joi.string().allow(null, '').optional(),
  fileBuktiFollow: Joi.string().allow(null, '').optional(),
});

export const createPesertaValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await createPesertaSchema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
};

export const updatePesertaValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updatePesertaSchema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errorMessage = generateJoiErrorMessage(error as ValidationError);
        res.status(400).json({ message: errorMessage });
    }
};
