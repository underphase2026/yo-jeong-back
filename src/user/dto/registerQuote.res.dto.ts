import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class resisterQuoteResDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '견적서 코드',
    example: '2023042300',
  })
  quote_code: string;
}
