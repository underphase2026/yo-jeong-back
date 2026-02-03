import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

// 개별 유저 정보 클래스
export class UserItem {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '견적서 ID',
    example: 1,
  })
  estimate_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '고객 이름',
    example: '박찬민',
  })
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '고객 이메일',
    example: 'able3104@naver.com',
  })
  customer_email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '기기 제조사명',
    example: 'Apple',
  })
  phone_brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '기기 명',
    example: 'iPhone 17 Pro',
  })
  phone_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '인증 코드',
    example: '1872536263',
  })
  auth_code: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '방문 여부',
    example: false,
  })
  is_user_visit: boolean;

  @ApiProperty({
    description: '생성 시간',
    example: '2026-02-02T10:30:00.000Z',
  })
  create_time: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '경과 시간 (예: "2시간 전", "30분 전")',
    example: '2시간 30분 전',
  })
  elapsed_time: string;
}

// 배열 응답 DTO
export class getUserListResDto {
  @IsArray()
  @Type(() => UserItem)
  @ApiProperty({
    description: '유저 목록 (24시간 이내, 오래된 순 정렬)',
    type: [UserItem],
  })
  users: UserItem[];
}
