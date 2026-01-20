import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class getQuoteDetailReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '인증 코드',
    example: '4242164975',
  })
  auth_code: string;
}
