import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FAQ {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'FAQ(자주 묻는 질문) ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: 'FAQ 제목',
    example: '휴대폰 구매는 어떻게 하나요?',
  }) //다시 예시 적용
  title: string;

  @Column()
  @ApiProperty({
    description: 'FAQ 내용',
    example: '휴대폰 구매는 홈페이지에서 가능합니다.',
  }) //다시 예시 적용
  content: string;

  @Column()
  @ApiProperty({
    description: 'FAQ 카테고리',
    example: '구매 안내',
  }) //다시 예시 적용
  category: string;

  @Column()
  @ApiProperty({
    description: 'FAQ 표시 순서',
    example: 1,
  }) //다시 예시 적용
  display_order: number;

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
