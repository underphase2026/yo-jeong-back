import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class cancelReservationReqDto {
  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: '예약 고유 id',
  //   example: 123,
  // })
  // reservation_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '인증 코드',
    example: '1872536263',
  })
  auth_code: string;
}
