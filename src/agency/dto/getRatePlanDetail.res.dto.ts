import { ApiProperty } from '@nestjs/swagger';

export class getRatePlanDetailResDto {
  @ApiProperty({
    description: '요금제 명',
    example: '5G 스탠다드',
  })
  plan_name: string;

  @ApiProperty({
    description: '통신사 명',
    example: 'SKT',
  })
  telecom: string;

  @ApiProperty({
    description: '요금제 가격',
    example: 75000,
  })
  price: number;

  @ApiProperty({
    description: '사용 가능 데이터량',
    example: 150,
  })
  data: number;
}
