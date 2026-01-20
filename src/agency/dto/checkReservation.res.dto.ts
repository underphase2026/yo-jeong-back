import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class checkReservationResDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '예약 상태',
    example: 'approved',
  })
  approval_status: string;
}
