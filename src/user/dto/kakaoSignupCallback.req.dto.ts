import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class kakaoSignupCallbackReqDto {
  @IsString()
  @ApiProperty({
    description: '추가할 전화번호',
    example: '01012345678',
  })
  phone_number: string;

  @IsString()
  @ApiProperty({
    description: '추가할 주소',
    example: '서울특별시 강남구 테헤란로 123',
  })
  address: string;

  @IsString()
  @ApiProperty({
    description: '추가할 이메일',
    example: 'user123@gmial.com',
  })
  email: string;
}
