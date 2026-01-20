import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class quoteDto {
  quote_id: number;
  customer_name: string;
  costomer_phone_number: string;
  quote_code: string;
  create_time: Date;
  is_user_visit: boolean;
}

export class getStatusAgencyResDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '견적서 발급 현황 건수 (24H)',
    example: 1000,
  })
  quote_count: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '완료된 견적 건수 (누적)',
    example: 1000,
  })
  complete_quote_count: number;

  quotes: quoteDto[];
}
