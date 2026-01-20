import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class getStatusQuoteReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '견적서 인증 코드',
    example: '3606663710',
  })
  auth_code: string;
}
