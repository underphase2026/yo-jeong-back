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
import { PriceList } from './PriceList.entity';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '요금제 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '요금제 명',
    example: '115',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '요금제 가격',
    example: 115000,
  })
  price: number;

  @Column()
  @ApiProperty({
    description: '요금제 데이터 용량(GB)',
    example: 200,
    default: 200,
  })
  data: number;

  @ManyToOne(() => Telecom, (telecom) => telecom.priceLists)
  @ApiProperty({
    description: '통신사 정보 (FK)',
    example: {
      id: 1,
      name: 'SKT',
    },
  })
  telecom: Telecom;

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

  @OneToMany(() => PriceList, (pricelist) => pricelist.rate)
  pricelist: PriceList[];
}
