import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class checkIsUserVisitReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '소비자 id',
    example: 6,
  })
  costumer_id: number;
}
