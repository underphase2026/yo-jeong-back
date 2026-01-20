import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class searchAgenciesReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 기기명',
    example: '갤럭시 S25',
  })
  phone_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 제조사',
    example: 'samsung',
  })
  phone_brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사',
    example: 'SKT',
  })
  telecom: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사 변경 가능 여부',
    example: true,
  })
  can_change_telecom: boolean;
}
