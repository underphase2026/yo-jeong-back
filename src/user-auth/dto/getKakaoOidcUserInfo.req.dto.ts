import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class getKakaoOidcUserInfoReqDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  @ApiProperty({
    description: 'accessToken',
    example: '',
  })
  accessToken: string;
}
