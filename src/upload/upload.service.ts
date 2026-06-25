import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { SignatureResponseDto } from './dto/signature-response.dto';

@Injectable()
export class UploadService {
  constructor(private readonly configService: ConfigService) {}

  generateSignature(): SignatureResponseDto {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = 'posts';

    const paramsToSign = {
      timestamp,
      folder,
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      this.configService.getOrThrow('CLOUDINARY_API_SECRET'),
    );
    return {
      cloudName: this.configService.getOrThrow('CLOUDINARY_CLOUD_NAME'),
      apiKey: this.configService.getOrThrow('CLOUDINARY_API_KEY'),
      timestamp,
      folder,
      signature,
    };
  }
}
