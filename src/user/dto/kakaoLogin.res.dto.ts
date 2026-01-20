import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class kakaoLoginResDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '인증 토큰',
    example: 'XZ@12HR12J87',
  })
  authtoken: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: '신규 유저 여부',
    example: true,
  })
  is_new_user: boolean;
}
