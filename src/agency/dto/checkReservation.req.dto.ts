import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class checkReservationReqDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '인증 코드',
    example: '1872536263',
  })
  auth_code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '예약 상태',
    example: 'approved',
  })
  approval_status: string;
}
