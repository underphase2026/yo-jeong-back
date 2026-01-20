import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class chooseAgencyReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '선택한 판매점 명',
    example: '실버실버 대리점',
  })
  agency_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '원하는 핸드폰 기기 명',
    example: '17pro',
  })
  phone_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '원하는 핸드폰 색상',
    example: 'black',
  })
  phone_color: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '유저 선택 정보 id',
    example: '5',
  })
  searchedInfo_id: number;

  // @IsNumber()
  // @IsNotEmpty()
  // @ApiProperty({
  //   description: '원하는 핸드폰 갯수',
  //   example: 1,
  // })
  // count: number;
}
