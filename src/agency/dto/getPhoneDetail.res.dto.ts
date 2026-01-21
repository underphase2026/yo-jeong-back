import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class getPhoneDetailResDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '기기 원가',
    example: 1000000,
  })
  original_price: number;
}
