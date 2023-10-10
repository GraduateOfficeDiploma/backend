import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import * as sharp from 'sharp';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    rawImage: Express.Multer.File,
    width: number,
    height: number,
  ): Promise<string> {
    const editedImage = await sharp(rawImage.buffer)
      .resize({
        width,
        height,
        position: 'center',
      })
      .png()
      .toBuffer();
    const response = await v2.uploader.upload(
      'data:image/png;base64,' + editedImage.toString('base64'),
    );
    return response.url;
  }

  async uploadDocument(document: Express.Multer.File): Promise<string> {
    const response = await v2.uploader.upload(document.buffer.toString());
    return response.url;
  }
}
