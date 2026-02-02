import { Rate } from 'src/entity/Rate.entity';
import { discountSimpleDto } from './registerQuote.req.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class benefitSimpleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '특별 혜택명',
    example: '스마트폰 케이스 쇼핑몰 5,000원 할인',
  })
  description: string;
}

export class rateSimpleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '요금제명',
    example: '115',
  })
  name: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 가격',
    example: 115000,
  })
  price: number;
}

export class getQuoteResDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '소비자 이름',
    example: '박민준',
  })
  customer_name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 ID',
    example: 1,
  })
  agency_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 이름',
    example: '가야 SKT 판매점',
  })
  agency_name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 리뷰 평점',
    example: 4.5,
  })
  agency_rating: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 주소',
    example: '부산광역시 가야동',
  })
  agency_address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 위도',
    example: 35.1795543,
  })
  agency_latitude: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 경도',
    example: 129.0756416,
  })
  agency_longitude: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 전화번호',
    example: '0511234567',
  })
  agency_phone_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사 명',
    example: 'SKT',
  })
  telecom: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 제조사명',
    example: 'samsung',
  })
  phone_brand: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 기기명',
    example: 'S25',
  })
  phone_name: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 판매 가격',
    example: 300000,
  })
  phone_price: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 원가',
    example: 1000000,
  })
  phone_original_price: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 정보',
    example: {
      name: '115',
      price: 115000,
    },
  })
  phone_plan: rateSimpleDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '이미지 경로',
    example: '/images/device/galaxy/galaxy_s25.png',
  })
  phone_image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '가입 유형',
    example: 'New',
  })
  subscription_type: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '인증 여부',
    example: true,
  })
  auth_tag: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: '할인 정보',
    example: {
      name: '추가 할인',
      price: 10000,
    },
    default: {
      name: '추가 할인',
      price: 10000,
    },
  })
  discount: discountSimpleDto;

  @IsNotEmpty()
  @ApiProperty({
    description: '특별 혜택 목록',
    example: [
      '스마트폰 케이스 쇼핑몰 5,000원 할인',
      '요정 서비스 이용 시 5만원 추가 할인',
      '대리점 방문했는데 가격이 다르다면? 차액 보장!',
    ],
    default: [
      '스마트폰 케이스 쇼핑몰 5,000원 할인',
      '요정 서비스 이용 시 5만원 추가 할인',
      '대리점 방문했는데 가격이 다르다면? 차액 보장!',
    ],
  })
  benefits: string[];

  constructor() {
    this.discount = { name: '', price: 0 };
  }
}
