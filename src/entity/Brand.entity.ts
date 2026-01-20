import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Phone } from './Phone.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '제조사 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '제조사명',
    example: 'Apple',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '제조사 로고 이미지 URL',
    example: 'http://apple.com/logo.png',
  })
  image_URL: string;

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

  @OneToMany(() => Phone, (phone) => phone.brand)
  phones: Phone[];
}
