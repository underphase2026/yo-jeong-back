import { ApiProperty } from '@nestjs/swagger';

export class updateVisitStatusResDto {
  @ApiProperty({
    description: '업데이트 성공 여부',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: '응답 메시지',
    example: '방문 여부가 업데이트되었습니다.',
  })
  message: string;
}
