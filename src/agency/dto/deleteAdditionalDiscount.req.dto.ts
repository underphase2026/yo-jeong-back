import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class deleteAdditionalDiscountReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '삭제할 할인 이름',
    example: '신규가입할인',
  })
  name: string;
}
