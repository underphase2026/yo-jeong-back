import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AdditionalDiscountItem {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '추가 할인 명',
    example: '신규가입할인',
  })
  '추가 할인 명': string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '가격',
    example: 50000,
  })
  '가격': number;
}
