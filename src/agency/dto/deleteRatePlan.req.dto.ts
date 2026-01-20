import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class deleteRatePlanReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 명',
    example: '5G 스탠다드',
  })
  plan_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사 명',
    example: 'SKT',
  })
  telecom: string;
}
