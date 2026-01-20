import { ApiProperty } from '@nestjs/swagger';

export class getAgencyReservationsResDto {
  @ApiProperty({
    description: '예약 목록',
    type: [Object],
    example: [
      {
        user_id: 'user1',
        phone_name: 'S25',
        phone_brand: 'samsung',
        auth_code: '1872536263',
        status: 'Pending',
      },
    ],
  })
  reservation: {
    user_id: string;
    phone_name: string;
    phone_brand: string;
    auth_code: string;
    status: string;
  }[];
}
