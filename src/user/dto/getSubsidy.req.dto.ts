import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class getSubsidyReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사 명',
    example: 'SKT',
  })
  telecom: string;
}
