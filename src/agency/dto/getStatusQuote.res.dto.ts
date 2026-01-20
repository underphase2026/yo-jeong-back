import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class getStatusQuoteResDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 이름',
    example: '박민준',
  })
  user_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '대리점 전화 번호',
    example: '01012345678',
  })
  agency_phone_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 방문 척도',
    example: true,
  })
  is_user_visit: boolean;
}
