import { Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('signature')
  generateSignature() {
    return this.uploadService.generateSignature();
  }
}
