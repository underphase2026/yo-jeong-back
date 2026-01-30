import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class enrollPriceListDetailReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '기기 제조사 명', example: 'samsung' })
  phone_brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '기기 명', example: 'S25' })
  phone_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '요금제 명', example: '115' })
  phone_plan_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '통신사 명', example: 'SKT' })
  telecom: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '개통 타입', example: '기기변경' })
  subscription_type: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: '추가지원금', example: 300000 })
  subsidy_by_agency: number;
}
