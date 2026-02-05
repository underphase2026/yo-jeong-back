import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seller } from './Seller.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PriceList } from './PriceList.entity';
import { AdditionalDiscount } from './AdditionalDiscount.entity';

@Entity()
export class Agency {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '판매점 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '판매점 유저 아이디',
    example: 'agency1',
  })
  user_id: string;

  @Column()
  @ApiProperty({
    description: '판매점 유저 비밀번호',
    example: 'agency1_password',
  })
  password: string;

  @Column()
  @ApiProperty({
    description: '판매점명',
    example: '가야 SKT 판매점',
  })
  name: string;

  // @ManyToOne(() => Seller, (seller) => seller.agencies)
  // @ApiProperty({
  //   description: '대리점 정보',
  //   example: {
  //     id: 1,
  //     name: 'SKT 대리점 가야점',
  //     user_name: 'seller_gaya_skt',
  //     password_hashed: '$2b$10$EixZaYV',
  //     create_time: '2023-01-01T00:00:00.000Z',
  //     delete_time: null,
  //   },
  // })
  // seller: Seller;

  @Column()
  @ApiProperty({
    description: '리뷰 점수',
    example: 4.5,
    default: 0,
  })
  review_score: number;

  @Column()
  @ApiProperty({
    description: '리뷰 수',
    example: 15,
    default: 0,
  })
  reviews: number;

  @Column()
  @ApiProperty({
    description: '판매점 주소',
    example: '부산광역시 가야동',
  })
  address: string;

  @Column('double')
  @ApiProperty({
    description: '판매점 위도',
    example: 35.1795543,
  })
  latitude: number;

  @Column('double')
  @ApiProperty({
    description: '판매점 경도',
    example: 129.0756416,
  })
  longitude: number;

  @Column()
  @ApiProperty({
    description: '판매점 전화번호',
    example: '0511234567',
  })
  phone_number: string;

  @Column()
  @ApiProperty({
    description: '판매점 이메일',
    example: 'agency1@example.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: '오픈 시간',
    example: '11:00',
  })
  start_time: string;

  @Column()
  @ApiProperty({
    description: '클로즈 시간',
    example: '19:00',
  })
  end_time: string;

  @Column()
  @ApiProperty({
    description: '판매점 이미지 URL',
    example: 'http://under-phase.com/agency_image.jpg',
    default: '',
  })
  image_URL: string;

  @Column()
  @ApiProperty({
    description: '인증 태그',
    example: true,
    default: false,
  })
  auth_tag: boolean;

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

  @OneToMany(() => PriceList, (priceList) => priceList.agency)
  priceLists: PriceList[];

  @OneToMany(() => AdditionalDiscount, (discount) => discount.agency)
  additionalDiscounts: AdditionalDiscount[];
}
