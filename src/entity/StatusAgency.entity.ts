import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agency } from './Agency.entity';

@Entity()
export class StatusAgency {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '판매점 견적 현황 ID (PK)',
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

  @Column()
  @ApiProperty({
    description: '견적서 발급 현황 건수',
    example: 1000,
  })
  quote_count: number;

  @Column()
  @ApiProperty({
    description: '완료된 견적 건수',
    example: 1000,
  })
  complete_quote_count: number;

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
