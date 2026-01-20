import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class agencyLoginReqDto {
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
}
