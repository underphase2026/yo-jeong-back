import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class getSubsidyResDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '공통지원금 량',
    example: 500000,
  })
  subsidy_value: number;
}
