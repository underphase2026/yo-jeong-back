import { ApiProperty } from '@nestjs/swagger';

export interface PriceOption {
  type: '기기변경' | '번호이동' | '신규가입'; // 명시적으로 3가지 타입만 포함
  plan: string;
  price: number;
}

// Interface for the single telecom's price setting - 요청하신 응답의 배열 요소 구조
export interface PriceSettingFeildProps {
  telecom: 'SKT' | 'KT' | 'LG U+'; // 명시적으로 3가지 통신사만 포함
  device: string;
  options: PriceOption[];
}

export class getPriceListByPhoneResDto {
  
  priceList: PriceSettingFeildProps[];

  constructor() {
    this.priceList = [];
  }
}
