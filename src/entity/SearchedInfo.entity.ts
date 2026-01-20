import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KakaoUser } from './KakaoUser.entity';
import { Phone } from './Phone.entity';
import { Telecom } from './Telecom.entity';
import { Estimate } from './Estimate.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class SearchedInfo {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '검색 정보 ID (PK)',
    example: 1,
  })
  id: number;

  // @ManyToOne(() => KakaoUser, (kakaoUser) => kakaoUser.searchedInfos)
  // @ApiProperty({
  //   description: '카카오 유저 정보 (FK)',
  //   example: {
  //     id: 1,
  //     user_number: 999888777,
  //     name: '홍길동',
  //     nickname: '길동이',
  //     phone_number: '01012345678',
  //     profile_image: 'http://kakao.com/profile_image.jpg',
  //     gender: 'male',
  //     email: 'user123@gmail.com',
  //   },
  // })
  // kakaoUser: KakaoUser;

  @ManyToOne(() => Phone, (phone) => phone.searchedInfos)
  @ApiProperty({
    description: '휴대폰 기기 정보 (FK)',
    example: {
      id: 1,
      name: 'iPhone 13',
      brand: { id: 1 },
      volume: '128GB',
      color: 'Black',
      image_URL: 'http://apple.com/iphone13_black.png',
    },
  })
  phone: Phone;

  @ManyToOne(() => Telecom, (telecom) => telecom.searchedInfos)
  @ApiProperty({
    description: '통신사 정보 (FK)',
    example: {
      id: 1,
      name: 'SKT',
    },
  })
  telecom: Telecom;

  @Column()
  @ApiProperty({
    description: '통신사 변경 여부',
    example: true,
  })
  telecom_change: boolean;

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

  // @OneToMany(() => Estimate, (estimate) => estimate.searchedInfo)
  // estimates: Estimate[];
}
