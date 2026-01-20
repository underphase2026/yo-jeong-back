import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Estimate } from './Estimate.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class BillImage {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '청구서 이미지 ID (PK)',
    example: 1,
  })
  id: number;

  @ManyToOne(() => Estimate, (estimate) => estimate.billImages)
  @ApiProperty({
    description: '견적서 정보 (FK)',
    example: {
      id: 1,
      phone: { id: 1 },
      agency: { id: 1 },
      price: 500000,
      rate: 60000,
      searched_info: { id: 1 },
      auth_code: 'ABC123',
    },
  })
  estimate: Estimate;

  @Column()
  @ApiProperty({
    description: '청구서 이미지 저장 경로',
    example: '/images/bill_1.jpg',
  })
  stortage_path: string;

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
