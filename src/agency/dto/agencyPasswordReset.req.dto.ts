import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class agencyPasswordResetReqDto {
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
    description: '판매점 전화번호',
    example: '0511234567',
  })
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 유저 이메일',
    example: 'agency1@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '새로운 판매점 유저 비밀번호',
    example: 'new_agency1_password',
  })
  new_password: string;
}
