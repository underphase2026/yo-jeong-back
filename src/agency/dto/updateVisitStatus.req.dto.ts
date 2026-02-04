import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class updateVisitStatusReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '견적서 인증 코드',
    example: '4242164975',
  })
  auth_code: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '고객 방문 여부',
    example: true,
  })
  is_user_visit: boolean;
}
