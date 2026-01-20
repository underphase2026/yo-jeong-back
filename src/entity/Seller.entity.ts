import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agency } from './Agency.entity';

@Entity()
export class Seller {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '대리점 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '대리점명',
    example: 'SKT 대리점 가야점',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '아이디',
    example: 'seller_gaya_skt',
  })
  user_name: string;

  @Column()
  @ApiProperty({
    description: '암호화된 비밀번호',
    example: '$2b$10$EixZaYV',
  })
  password_hashed: string;

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

  // @OneToMany(() => Agency, (agency) => agency.seller)
  // agencies: Agency[];
}
