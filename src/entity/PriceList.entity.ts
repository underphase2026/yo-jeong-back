import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agency } from './Agency.entity';
import { Phone } from './Phone.entity';
import { Telecom } from './Telecom.entity';
import { Estimate } from './Estimate.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Rate } from './Rate.entity';

@Entity()
export class PriceList {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '가격표 ID (PK)',
    example: 1,
  })
  id: number;

  @ManyToOne(() => Agency, (agency) => agency.priceLists)
  @ApiProperty({
    description: '대리점 정보 (FK)',
    example: {
      id: 1,
      name: 'SKT 대리점 가야점',
    },
  })
  agency: Agency;

  @ManyToOne(() => Phone, (phone) => phone.priceLists)
  @ApiProperty({
    description: '휴대폰 기기 정보 (FK)',
    example: {
      id: 1,
      name: 'iPhone 13',
      brand: { id: 1 },
      volume: '128GB',
      color: 'Black',
    },
  })
  phone: Phone;

  @ManyToOne(() => Telecom, (telecom) => telecom.priceLists)
  @ApiProperty({
    description: '통신사 정보 (FK)',
    example: {
      id: 1,
      name: 'SKT',
    },
  })
  telecom: Telecom;

  @Column()
  @ApiProperty({
    description: '가압 유형',
    example: 'New',
  })
  subscription_type: string;

  @Column()
  @ApiProperty({
    description: '기기 가격',
    example: 800000,
  })
  price: number;

  @Column()
  @ApiProperty({
    description: '기기 원가',
    example: 1500000,
  })
  original_price: number;

  @Column()
  @ApiProperty({
    description: '추가 지원금',
    example: 300000,
  })
  subsidy_by_agency: number;

  @ManyToOne(() => Rate, (rate) => rate.pricelist)
  @ApiProperty({
    description: '요금제 정보 (FK)',
    example: {
      id: 1,
      name: '5G 프리미엄',
      price: 89000,
    },
  })
  rate: Rate;

  @Column()
  @ApiProperty({
    description: '추가 할인명',
    example: '추가 할인',
    default: '추가 할인',
  })
  discount_name: string;

  @Column()
  @ApiProperty({
    description: '추가 할인 가격',
    example: 10000,
    default: 10000,
  })
  discount_price: number;

  @CreateDateColumn()
  @ApiProperty({
    description: '생성 시간',
    example: '2023-01-01T00:00:00.000Z',
  })
  create_time: Date;

  @Column()
  @ApiProperty({
    description: '삭제 시간',
    example: '',
    default: '',
  })
  delete_time: string;

  @OneToMany(() => Estimate, (estimate) => estimate.priceList)
  estimates: Estimate[];

  init(
    _agency: Agency,
    _phone: Phone,
    _telecom: Telecom,
    _subscription_type: string,
    _price: number,
    _original_price: number,
    _discount_name: string,
    _discount_price: number,
    _delete_time: string,
    _rate: Rate,
    _id?: number,
  ) {
    this.agency = _agency;
    this.phone = _phone;
    this.telecom = _telecom;
    this.subscription_type = _subscription_type;
    this.price = _price;
    this.original_price = _original_price;
    this.discount_name = _discount_name;
    this.discount_price = _discount_price;
    this.delete_time = _delete_time;
    this.rate = _rate;
    if (_id) this.id = _id;
    return this;
  }

  static setter(
    _agency: Agency,
    _phone: Phone,
    _telecom: Telecom,
    _subscription_type: string,
    _price: number,
    _original_price: number,
    _discount_name: string,
    _discount_price: number,
    _delete_time: string,
    _rate: Rate,
    _id?: number,
  ) {
    return new PriceList().init(
      _agency,
      _phone,
      _telecom,
      _subscription_type,
      _price,
      _original_price,
      _discount_name,
      _discount_price,
      _delete_time,
      _rate,
      _id,
    ); //.init();
  }
}
