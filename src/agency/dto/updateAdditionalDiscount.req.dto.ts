import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class updateAdditionalDiscountReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '수정할 기존 할인 이름',
    example: '신규가입할인',
  })
  name: string;

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
