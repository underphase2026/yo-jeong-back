import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Rate } from 'src/entity/Rate.entity';
import { discountSimpleDto } from 'src/user/dto/registerQuote.req.dto';

export class getAllPriceListResDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '가격표 목록',
    type: [Object],
    example: [
      {
        agency_id: 1,
        phone_name: 'S25',
        phone_brand: 'samsung',
        phone_price: 300000,
        phone_plan: {
          name: '115',
          price: 115000,
        },
        discount: {
          name: '추가 할인',
          price: 10000,
        },
        subscription_type: 'New',
        telecom: 'SKT',
      },
      {
        agency_id: 1,
        phone_name: 'S25+',
        phone_brand: 'samsung',
        phone_price: 500000,
        phone_plan: {
          name: '115',
          price: 115000,
        },
        discount: {
          name: '추가 할인',
          price: 10000,
        },
        telecom: 'SKT',
        subscription_type: 'New',
      },
    ],
  })
  priceList: {
    agecny_id: number;

    phone_name: string;
    phone_brand: string;
    phone_price: number;

    phone_plan: Rate;

    discount: discountSimpleDto;

    subscription_type: string;
    telecom: string;
  }[];
}
