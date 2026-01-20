import { ApiProperty } from '@nestjs/swagger';

export class chooseAgencyResDto {
  // @ApiProperty({
  //   description: '카카오 유저 고유 id',
  //   example:'999888777',
  // })
  // kakao_id: number;

  @ApiProperty({
    description: '휴대폰 기기명',
    example: 'S25',
  })
  phone_name: string;

  @ApiProperty({
    description: '휴대폰 제조사명',
    example: 'Galaxy',
  })
  phone_brand: string;

  @ApiProperty({
    description: '휴대폰 기기 가격',
    example: 300000,
  })
  price: number;

  @ApiProperty({
    description: '할부시 월정액',
    example: 55000,
  })
  rating: number;

  @ApiProperty({
    description: '인증 코드',
    example: '1872536263',
  })
  auth_code: string;
}
