import { ApiProperty } from '@nestjs/swagger';

export class getAgencyRatePlansResDto {
  @ApiProperty({
    description: '요금제 목록',
    type: [Object],
    example: [
      {
        plan_name: '5G 스탠다드',
        price: 75000,
        telecom: 'SKT',
        data: 150,
      },
      {
        plan_name: '5G 프리미엄',
        price: 89000,
        telecom: 'SKT',
        data: 250,
      },
    ],
  })
  rate: {
    plan_name: string;
    price: number;
    telecom: string;
    data: number;
  }[];
}
