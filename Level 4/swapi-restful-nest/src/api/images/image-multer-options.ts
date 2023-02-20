import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Request } from 'express';

export const IMAGES_MAX_COUNT = 100;
export const FIVE_MB_IN_BYTES = 5242880;

const imageFilter = (
  _: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!Boolean(file.mimetype.match(/(jpg|jpeg|png|gif)/)))
    callback(null, false);
  callback(null, true);
};

export const imageMulterOptions: MulterOptions = {
  limits: { fileSize: FIVE_MB_IN_BYTES },
  fileFilter: imageFilter,
};
