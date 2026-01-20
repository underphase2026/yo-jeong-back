import { ApiProperty } from '@nestjs/swagger';

export class agencyLoginResDto {
  @ApiProperty({
    description: '인증 토큰',
    example: 'ax234QW234',
  })
  authToken: string;
}
