import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class getQuoteDetailResDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '개통 여부',
    example: false,
  })
  is_phone_activate: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '고객 이름',
    example: '박찬민',
  })
  customer_name: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //     description:'고객 전화번호'
  //   })
  // customer_phone_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '고객 이메일',
    example: 'able3104@naver.com',
  })
  customer_email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '기기 제조사명',
    example: 'Apple',
  })
  phone_brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '기기 명',
    example: '17 Pro',
  })
  phone_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '기기 용량',
    example: '256GB',
  })
  phone_volume: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 명',
    example: '115',
  })
  phone_plan_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '가입 유형',
    example: 'New',
  })
  subscription_type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '공통지원금',
    example: 500000,
  })
  subsidy_by_telecom: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '추가 지원금',
    example: 300000,
  })
  subsidy_by_agency: number;
}
