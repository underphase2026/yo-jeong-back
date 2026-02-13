import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class getAdditionalDiscountsReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '조회할 대리점 ID',
    example: 1,
  })
  agencyId: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: '조회할 가격표 ID (옵션)',
    example: 1,
    required: false,
  })
  priceListId: number;
}
