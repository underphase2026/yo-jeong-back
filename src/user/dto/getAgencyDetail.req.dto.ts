import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class getAgencyDetailReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 고유 id',
    example: 1,
  })
  agency_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 기기명',
    example: 'S25',
  })
  phone_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 제조사명',
    example: 'samsung',
  })
  phone_brand: string;

  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: '요금제 금액',
  //   example: 55000,
  // })
  // rating: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사',
    example: 'SKT',
  })
  telecom: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '가입 유형',
    example: '기기변경',
  })
  subscription_type: string;
}
