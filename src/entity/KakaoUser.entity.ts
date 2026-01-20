import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SearchedInfo } from './SearchedInfo.entity';
import { CSLog } from './CSLog.entity';
import { Estimate } from './Estimate.entity';

@Entity()
export class KakaoUser {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '카카오 유저 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '카카오 유저 회원 번호',
    example: '999888777',
  })
  kakaoId: string;

  @Column()
  @ApiProperty({
    description: '카카오 유저 이름',
    example: '홍길동',
  })
  name: string;

  // @Column()
  // @ApiProperty({
  //   description: '카카오 유저 닉네임',
  //   example: '길동이',
  // })
  // nickname: string;

  // @Column()
  // @ApiProperty({
  //   description: '카카오 유저 전화번호',
  //   example: '01012345678',
  // })
  // phone_number: string;

  // @Column()
  // @ApiProperty({
  //   description: '카카오 유저 프로필 이미지 URL',
  //   example: 'http://kakao.com/profile_image.jpg',
  // })
  // profile_image: string;

  // @Column()
  // @ApiProperty({
  //   description: '카카오 유저 성별',
  //   example: 'male',
  // })
  // gender: string;

  @Column()
  @ApiProperty({
    description: '카카오 유저 이메일',
    example: 'user123@gmail.com',
  })
  email: string;

  @Column()
  @ApiProperty({
    description: 'firebaseUid',
    example: '',
  })
  firebaseUid: string;

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

  // @OneToMany(() => SearchedInfo, (searchedInfo) => searchedInfo.kakaoUser)
  // searchedInfos: SearchedInfo[];

  @OneToMany(() => CSLog, (csLog) => csLog.kakaoUser)
  csLogs: CSLog[];

  @OneToMany(() => Estimate, (estimate) => estimate.kakaoUser)
  estimates: Estimate[];

  constructor() {
    this.name = '';
  }
}
