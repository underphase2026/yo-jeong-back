import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class kakaoLoginReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '카카오 인증 토큰',
    example: 'k_a_t_1234567890',
  })
  kakao_access_token: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '카카오 ID',
    example: 999888777,
  })
  kakao_id: number;
}
