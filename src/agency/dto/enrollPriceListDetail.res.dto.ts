import { ApiProperty } from '@nestjs/swagger';

export class enrollPriceListDetailResDto {
  @ApiProperty({ description: '성공 여부', example: true })
  success: boolean = true;

  @ApiProperty({ description: '업데이트된 PriceList ID', example: 1 })
  priceListId: number;
}
