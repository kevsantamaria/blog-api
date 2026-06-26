import { Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Authenticated } from 'src/common/decorators/authenticated.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Generate a signature for uploading' })
  @ApiResponse({ status: 200, description: 'Signature generated successfully' })
  @Authenticated()
  @Post('signature')
  generateSignature() {
    return this.uploadService.generateSignature();
  }
}
