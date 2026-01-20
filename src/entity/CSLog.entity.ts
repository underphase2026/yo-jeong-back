import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KakaoUser } from './KakaoUser.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CSLog {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '고객센터 로그 ID (PK)',
    example: 1,
  })
  id: number;

  @ManyToOne(() => KakaoUser, (kakaoUser) => kakaoUser.csLogs)
  @ApiProperty({
    description: '카카오 유저 정보 (FK)',
    example: {
      id: 1,
      user_number: 999888777,
      name: '홍길동',
      nickname: '길동이',
      phone_number: '01012345678',
      profile_image: 'http://kakao.com/profile',
      gender: 'male',
      email: 'user123@gmail.com',
    },
  })
  kakaoUser: KakaoUser;

  @Column()
  @ApiProperty({
    description: '고객센터 문의 유형',
    example: '제품문의',
  }) //다시 예시 적용
  type: string;

  @Column()
  @ApiProperty({
    description: '고객센터 문의 제목',
    example: '제품 A에 대한 문의',
  }) //다시 예시 적용
  title: string;

  @Column()
  @ApiProperty({
    description: '고객센터 문의 내용',
    example: '제품 A의 기능에 대해 궁금합니다.',
  }) //다시 예시 적용
  content: string;

  @Column()
  @ApiProperty({
    description: '고객센터 문의 상태',
    example: '처리중',
  }) //다시 예시 적용
  status: string;

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
