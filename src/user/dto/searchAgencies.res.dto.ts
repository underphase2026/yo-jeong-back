import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Agency } from 'src/entity/Agency.entity';
import { Phone } from 'src/entity/Phone.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Rate } from 'src/entity/Rate.entity';
import { Telecom } from 'src/entity/Telecom.entity';

export class AgencySimpleDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '대리점 ID',
    example: 1,
  })
  agency_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '대리점명',
    example: 'SKT 판매점 가야점',
  })
  agency_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '대리점 주소',
    example: '부산광역시 부산진구 가야동',
  })
  agency_address: string;
  agency_rating: number;

  telecom: string;
  subscription_type: string;

  phome_brand: string;
  phone_name: string;
  phone_price: number;

  auth_tag: boolean;
  // 솔직히 이거는 필요한건지 모르겠음.
}

export class searchAgenciesResDto {
  @IsNotEmpty()
  @ApiProperty({
    type: [AgencySimpleDto],
    description: '대리점 목록',
    example: [
      {
        agency_id: 1,
        agency_name: '가야 SKT 판매점',
        agency_address: '부산광역시 가야동',
        agency_rating: 4.5,
        telecom: 'SKT',
        subscription_type: 'New',
        phome_brand: 'samsung',
        phone_name: 'S25',
        phone_price: 35,
        auth_tag: true,
      },
      {
        agency_id: 1,
        agency_name: '가야 SKT 판매점',
        agency_address: '부산광역시 가야동',
        agency_rating: 4.5,
        telecom: 'SKT',
        subscription_type: 'Change_device',
        phome_brand: 'samsung',
        phone_name: 'S25',
        phone_price: 30,
        auth_tag: true,
      },
    ],
  })
  agency: AgencySimpleDto[];
  setter(list: AgencySimpleDto[]) {
    this.agency = list;
  }
}
