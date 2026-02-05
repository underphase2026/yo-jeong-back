import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { AdditionalDiscountItem } from './AdditionalDiscountItem.class';

export class getAdditionalDiscountsResDto {
  @IsArray()
  @Type(() => AdditionalDiscountItem)
  @ApiProperty({
    description: '추가할인 목록',
    type: [AdditionalDiscountItem],
  })
  discounts: AdditionalDiscountItem[];
}
