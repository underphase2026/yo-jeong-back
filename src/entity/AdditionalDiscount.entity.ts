import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agency } from './Agency.entity';
import { ApiProperty } from '@nestjs/swagger';

import { PriceList } from './PriceList.entity';

@Entity()
export class AdditionalDiscount {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '추가할인 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '추가할인 이름',
    example: '신규가입할인',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '할인 가격',
    example: 50000,
  })
  price: number;

  @ManyToOne(() => PriceList, (priceList) => priceList.additionalDiscounts)
  @ApiProperty({
    description: '가격표 정보 (FK)',
    example: {
      id: 1,
    },
  })
  priceList: PriceList;

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
}
