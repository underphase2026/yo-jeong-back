import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class getPriceListByPhoneReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '기기 명',
    example: '17 Pro',
  })
  phone_name: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: '기기 제조사 명',
  //   example: 'Apple',
  // })
  // phone_brand: string;
}
