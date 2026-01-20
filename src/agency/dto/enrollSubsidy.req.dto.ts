import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class enrollSubsidyReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사 명',
    example: 'SKT',
  })
  telecom: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '공통지원금 량',
    example: 500000,
  })
  subsidy_value: number;
}
