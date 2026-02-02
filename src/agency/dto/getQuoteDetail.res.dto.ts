import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

// 개별 견적서 정보 클래스
export class QuoteDetailItem {
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

  @ApiProperty({
    description: '공통지원금',
    example: 500000,
  })
  subsidy_by_telecom: number;

  @ApiProperty({
    description: '추가 지원금',
    example: 300000,
  })
  subsidy_by_agency: number;

  @ApiProperty({
    description: '생성 시간',
    example: '2023-01-01T00:00:00.000Z',
  })
  create_time: Date;
}

// 배열 응답 DTO
export class getQuoteDetailResDto {
  @IsArray()
  @Type(() => QuoteDetailItem)
  @ApiProperty({
    description: '견적서 목록 (24시간 이내, 오래된 순 정렬)',
    type: [QuoteDetailItem],
  })
  quotes: QuoteDetailItem[];
}
