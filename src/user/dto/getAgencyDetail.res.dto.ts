import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, isString, IsString } from 'class-validator';
import { Agency } from 'src/entity/Agency.entity';

export class getAgencyDetailResDto {
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
    description: '판매점명',
    example: '가야 SKT 판매점',
  })
  agency_name: string;

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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '대리점 전화번호',
    example: '0511234567',
  })
  agency_phone_number: string;

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

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 원가',
    example: 1000000,
  })
  phone_original_price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 이미지 경로',
    example: '/images/device/galaxy/galaxy_s25.png',
  })
  phone_image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사 명',
    example: 'SKT',
  })
  telecom: string;

  // //운영시간을 시작 시간과 마감 시간으로 분리
  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: '오픈 시간',
  //   example: '11:00',
  // })
  // start_time: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: '클로즈 시간',
  //   example: '19:00',
  // })
  // end_time: string;

  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: '요금제 금액',
  //   example: 55000,
  // })
  // rating: number;

  // desciption: string;
  // 이게 필요할까?

  // setter(agencies: Agency) {
  //   this.id = agencies.id;
  //   this.agency_name = agencies.name;
  //   this.address = agencies.address;
  //   this.phone_number = agencies.phone_number;
  //   this.start_time = agencies.start_time;
  //   this.end_time = agencies.end_time;
  // }
}
