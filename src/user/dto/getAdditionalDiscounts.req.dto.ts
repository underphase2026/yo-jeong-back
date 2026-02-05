import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class getAdditionalDiscountsReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '조회할 대리점 ID',
    example: 1,
  })
  agencyId: number;
}
