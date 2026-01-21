import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class getPhoneDetailReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '기기 명',
    example: '갤럭시S25',
  })
  phone_name: string;
}
