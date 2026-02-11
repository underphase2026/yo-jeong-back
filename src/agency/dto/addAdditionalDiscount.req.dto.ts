import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class addAdditionalDiscountReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '추가할인 이름',
    example: '신규가입할인',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '할인 가격',
    example: 50000,
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '가격표 ID',
    example: 1,
  })
  priceListId: number;
}
