import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class updateAdditionalDiscountReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '추가할인 ID (PK)',
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '수정된 할인 이름',
    example: '신규가입할인(수정)',
  })
  newName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '수정된 가격',
    example: 60000,
  })
  price: number;
}
