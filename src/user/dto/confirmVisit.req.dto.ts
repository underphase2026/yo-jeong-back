import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class confirmVisitReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '예약 고유 id',
    example: 123,
  })
  reservation_id: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '해당 판매점 방문 가능 여부',
    example: true,
  })
  is_visitable: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 방문 시간',
    example: '2025-12-03 14:00',
  })
  visit_time: string;
}
