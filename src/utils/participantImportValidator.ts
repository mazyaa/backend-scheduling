import Joi from 'joi';

export const participantImportRowSchema = Joi.object({
  _rowNumber: Joi.number().required(),
  _isEmpty: Joi.boolean().required(),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email tidak boleh kosong',
    'string.email': 'Format email tidak valid',
    'any.required': 'Email diperlukan'
  }),
  name: Joi.string().required().messages({
    'string.empty': 'Nama tidak boleh kosong',
    'any.required': 'Nama diperlukan'
  }),
  noWa: Joi.string().required().messages({
    'string.empty': 'Nomor HP tidak boleh kosong',
    'any.required': 'Nomor HP diperlukan'
  }),
  instansi: Joi.string().required().messages({
    'string.empty': 'Instansi tidak boleh kosong',
    'any.required': 'Instansi diperlukan'
  }),
  fileCv: Joi.string().required().messages({
    'string.empty': 'Link CV tidak boleh kosong',
    'any.required': 'Link CV diperlukan'
  }),
  fileIjazah: Joi.string().required().messages({
    'string.empty': 'Link Ijazah tidak boleh kosong',
    'any.required': 'Link Ijazah diperlukan'
  }),
  fileSuratRekomendasi: Joi.string().allow(null, '').optional(),
  fileKtp: Joi.string().required().messages({
    'string.empty': 'Link KTP tidak boleh kosong',
    'any.required': 'Link KTP diperlukan'
  }),
  fileFoto: Joi.string().allow(null, '').optional(),
  fileBuktiBayar: Joi.string().allow(null, '').optional(),
  fileBuktiFollow: Joi.string().allow(null, '').optional(),
});
