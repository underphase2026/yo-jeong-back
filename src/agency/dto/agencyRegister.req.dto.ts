import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class agencyRegisterReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 유저 아이디',
    example: 'agency1',
  })
  user_id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 유저 비밀번호',
    example: 'agency1_password',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점명',
    example: '가야 SKT 판매점',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '계약된 대리점 명',
    example: 'SKT 대리점 가야점',
  })
  seller_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 주소',
    example: '부산광역시 가야동',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 전화번호',
    example: '0511234567',
  })
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 이메일',
    example: 'agency1@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '오픈 시간',
    example: '11:00',
  })
  start_time: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '클로즈 시간',
    example: '19:00',
  })
  end_time: string;
}
