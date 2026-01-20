import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agency } from './Agency.entity';
import { SearchedInfo } from './SearchedInfo.entity';
import { PriceList } from './PriceList.entity';

@Entity()
export class SubsidyByTelecom {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '공통지원금 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '지원금 량',
    example: 500000,
  })
  value: number;

  @Column()
  @ApiProperty({
    description: '통신사 명',
    example: 'SKT',
  })
  telecom: string;
}
