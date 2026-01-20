import { ApiProperty } from '@nestjs/swagger';

export class confirmVisitResDto {
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

  @ApiProperty({
    description: '예약 고유 id',
    example: 123,
  })
  reservation_id: number;

  @ApiProperty({
    description: '해당 판매점 방문 가능 여부',
    example: true,
  })
  is_visitable: boolean;

  @ApiProperty({
    description: '판매점 방문 시간',
    example: '2025-12-03 14:00',
  })
  visit_time: string;
}
