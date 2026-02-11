import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class deleteAdditionalDiscountReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '삭제할 추가할인 ID (PK)',
    example: 1,
  })
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '가격표 ID',
    example: 1,
  })
  priceListId: number;
}
