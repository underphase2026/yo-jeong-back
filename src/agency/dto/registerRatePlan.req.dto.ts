import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class registerRatePlanReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 이름',
    example: '5G 프리미엄',
  })
  plan_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사 명',
    example: 'SKT',
  })
  telecom: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 가격',
    example: '89000',
  })
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용 가능 데이터량',
    example: 250,
  })
  data: number;
}
