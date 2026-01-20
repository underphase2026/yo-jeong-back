import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Rate } from 'src/entity/Rate.entity';

export class discountSimpleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '추가 할인명',
    example: '추가 할인',
    default: '추가 할인',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '추가 할인 금액',
    example: 10000,
    default: 10000,
  })
  price: number;
}

export class registerQuoteReqDto {
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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 가격',
    example: 300000,
  })
  phone_price: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 정보',
    example: {
      name: '115',
      price: 115000,
    },
  })
  phone_plan: {
    name: string;
    price: number;
    description: string;
  };

  @IsNotEmpty()
  @ApiProperty({
    description: '추가 할인 정보',
    example: {
      name: '추가 할인',
      price: 10000,
    },
  })
  discount: discountSimpleDto;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '가입 유형',
    example: '기기변경',
  })
  subscription_type: string;

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
    description: '사용자 이름',
    example: '박민준',
  })
  customer_name: string;
}
