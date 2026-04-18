import { NextFunction, Request, Response } from 'express';
import Joi, { ValidationError } from 'joi';
import { generateJoiErrorMessage } from '../../utils/helper';

const createSessionDetailScheduleSchema = Joi.object({
  detailJadwalTrainingId: Joi.string().uuid().required(),
  jamMulai: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .required(),
  jamSelesai: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .required(),
  aktivitas: Joi.string().required(),
});

const updateSessionDetailScheduleSchema = Joi.object({
  detailJadwalTrainingId: Joi.string().uuid().optional(),
  jamMulai: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .optional(),
  jamSelesai: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
    .optional(),
  aktivitas: Joi.string().optional(),
});

export const createSessionDetailScheduleValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await createSessionDetailScheduleSchema.validateAsync(req.body, { abortEarly: false}),

    next();
  } catch (error) {
    const errorMessage = generateJoiErrorMessage(error as ValidationError);
    res.status(400).json({ message: errorMessage })
  }
} 

export const updateDetailScheduleValidation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await updateSessionDetailScheduleSchema.validateAsync(req.body, { abortEarly: false })

    next();
  } catch (error) {
    const errorMesage = generateJoiErrorMessage(error as ValidationError);
    res.status(400).json({ message: errorMesage })
  }
}
