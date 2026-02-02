import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { agencyLoginResDto } from './dto/agencyLogin.res.dto';
import { agencyLoginReqDto } from './dto/agencyLogin.req.dto';
import { agencyPasswordResetReqDto } from './dto/agencyPasswordReset.req.dto';
import { agencyPasswordResetResDto } from './dto/agencyPasswordReset.res.dto';
import { enrollPriceListReqDto } from './dto/enrollPriceList.req.dto';
import { enrollPriceListResDto } from './dto/enrollPriceList.res.dto';
import { modifyListResDto } from './dto/modifyList.res.dto';
import { modifyListReqDto } from './dto/modifyList.req.dto';
import { deletePriceListResDto } from './dto/deletePriceList.res.dto';
import { deletePriceListReqDto } from './dto/deletePriceList.req.dto';
import { registerRatePlanReqDto } from './dto/registerRatePlan.req.dto';
import { registerRatePlanResDto } from './dto/registerRatePlan.res.dto';
import { getAgencyRatePlansReqDto } from './dto/getAgencyRatePlans.req.dto';
import { getAgencyRatePlansResDto } from './dto/getAgencyRatePlans.res.dto';
import { getRatePlanDetailReqDto } from './dto/getRatePlanDetail.req.dto';
import { getRatePlanDetailResDto } from './dto/getRatePlanDetail.res.dto';
import { deleteRatePlanReqDto } from './dto/deleteRatePlan.req.dto';
import { deleteRatePlanResDto } from './dto/deleteRatePlan.res.dto';
import { checkReservationReqDto } from './dto/checkReservation.req.dto';
import { checkReservationResDto } from './dto/checkReservation.res.dto';
import { getAgencyReservationsReqDto } from './dto/getAgencyReservations.req.dto';
import { getAgencyReservationsResDto } from './dto/getAgencyReservations.res.dto';
import { AuthService } from 'src/auth/auth.service';
import { agencyRegisterResDto } from './dto/agencyRegister.res.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from 'src/entity/Seller.entity';
import { IsNull, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { Agency } from 'src/entity/Agency.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Phone } from 'src/entity/Phone.entity';
import { Telecom } from 'src/entity/Telecom.entity';
import { agencyRegisterReqDto } from './dto/agencyRegister.req.dto';
import { Brand } from 'src/entity/Brand.entity';
import { payloadClass } from 'src/auth/payload.class';
import { getAllPriceListReqDto } from './dto/getAllPriceList.req.dto';
import { getAllPriceListResDto } from './dto/getAllPriceList.res.dto';
import { Rate } from 'src/entity/Rate.entity';
import { SubsidyByTelecom } from 'src/entity/SubsidyByTelecom.entity';
import { enrollSubsidyReqDto } from './dto/enrollSubsidy.req.dto';
import { enrollSubsidyResDto } from './dto/enrollSubsidy.res.dto';
import { getStatusAgencyReqDto } from './dto/getStatusAgency.req.dto';
import { getStatusAgencyResDto, quoteDto } from './dto/getStatusAgency.res.dto';
import { StatusAgency } from 'src/entity/StatusAgency.entity';
import { getStatusQuoteReqDto } from './dto/getStatusQuote.req.dto';
import { getStatusQuoteResDto } from './dto/getStatusQuote.res.dto';
import { Estimate } from 'src/entity/Estimate.entity';
import { getQuoteDetailReqDto } from './dto/getQuoteDetail.req.dto';
import { getQuoteDetailResDto } from './dto/getQuoteDetail.res.dto';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { ifError } from 'assert';
import { getPriceListByPhoneReqDto } from './dto/getPriceListByPhone.req.dto';
import {
  getPriceListByPhoneResDto,
  PriceOption,
  PriceSettingFeildProps,
} from './dto/getPriceListByPhone.res.dto';
import { enrollPriceListDetailResDto } from './dto/enrollPriceListDetail.res.dto';
import { enrollPriceListDetailReqDto } from './dto/enrollPriceListDetail.req.dto';
import { checkIsUserVisitReqDto } from './dto/checkIsUserVisit.req.dto';
import { checkIsUserVisitResDto } from './dto/checkIsUserVisit.res.dto';
import { checkLoginReqDto } from './dto/checkLogin.req.dto';
import { checkLoginResDto } from './dto/checkLogin.res.dto';
import { app } from 'firebase-admin';
import { getPhoneDetailResDto } from './dto/getPhoneDetail.res.dto';
import { getPhoneDetailReqDto } from './dto/getPhoneDetail.req.dto';

interface PriceListEntity {
  id: number;
  agency: { id: number };
  phone: { id: number; name: string };
  telecom: { id: number; name: string }; // name 필드를 통해 통신사 이름을 가져옴
  rate: { id: number; name: string; price: number }; // name 필드를 통해 요금제 이름을 가져옴
  subscription_type: string; // '기기변경', '번호이동', '신규가입' 등
  price: number; // 기기 가격 (실제 응답의 price 필드에 사용)
  delete_time: string;
}

@Injectable()
export class AgencyService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>,
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
    @InjectRepository(PriceList)
    private priceListRepository: Repository<PriceList>,
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
    @InjectRepository(Telecom)
    private telecomRepository: Repository<Telecom>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
    @InjectRepository(SubsidyByTelecom)
    private subsidyBytTelecomRepository: Repository<SubsidyByTelecom>,
    @InjectRepository(StatusAgency)
    private statusAgencyRepository: Repository<StatusAgency>,
    @InjectRepository(Estimate)
    private estimateRepository: Repository<Estimate>,
    @InjectRepository(KakaoUser)
    private kakaoUserRepository: Repository<KakaoUser>,
  ) {}

  async agencyLogin(dto: agencyLoginReqDto): Promise<agencyLoginResDto> {
    const login = await this.authService.validateAgency(dto);
    const response = new agencyLoginResDto();
    // response.authToken = 'ax234QW234';
    response.authToken = login.authToken;
    return response;
  }

  async agencyRegister(
    dto: agencyRegisterReqDto,
  ): Promise<agencyRegisterResDto> {
    // const seller = await this.sellerRepository.findOne({
    //   where: { name: dto.seller_name },
    // });
    // if (!seller) {
    //   throw new BadRequestException();
    // }

    const agency = await this.agencyRepository.findOne({
      where: { user_id: dto.user_id },
    });
    if (agency) {
      throw new BadRequestException();
    }

    const agencyEntity = new Agency();
    agencyEntity.user_id = dto.user_id;
    agencyEntity.password = dto.password;
    agencyEntity.name = dto.name;
    // agencyEntity.seller = seller;
    agencyEntity.address = dto.address;
    agencyEntity.phone_number = dto.phone_number;
    agencyEntity.start_time = dto.start_time;
    agencyEntity.end_time = dto.end_time;
    agencyEntity.review_score = 5.0;
    agencyEntity.reviews = 0;
    agencyEntity.email = dto.email;
    agencyEntity.image_URL = '';
    agencyEntity.delete_time = '';
    agencyEntity.auth_tag = true;
    await this.agencyRepository.save(agencyEntity);

    const response = new agencyLoginResDto();
    return response;
  }

  async agencyPasswordReset(
    dto: agencyPasswordResetReqDto,
    agency: Agency,
  ): Promise<agencyPasswordResetResDto> {
    const searchAgency = await this.agencyRepository.findOne({
      where: {
        user_id: dto.user_id,
        phone_number: dto.phone_number,
        email: dto.email,
      },
    });
    if (!searchAgency) {
      throw new NotFoundException();
    }

    const agencies: Agency = {
      ...searchAgency,
      password: dto.new_password,
    };

    await this.agencyRepository.save(agencies);

    const response = new agencyPasswordResetResDto();
    return response;
  }

  /**여기*/
  async enrollPriceList(
    dto: enrollPriceListReqDto,
    agency: payloadClass,
  ): Promise<enrollPriceListResDto> {
    if (!agency) throw new BadRequestException();
    // console.debug(`agency: ${JSON.stringify(agency)}`);
    const { priceList } = dto;

    for (const item of priceList) {
      const priceListForSearch = await this.priceListRepository.findOne({
        where: {
          agency: { id: item.agecny_id, delete_time: '' },
          phone: {
            name: item.phone_name,
            brand: { name: item.phone_brand, delete_time: '' },
            delete_time: '',
          },
          rate: { name: item.phone_plan.name, delete_time: '' },
          telecom: { name: item.telecom, delete_time: '' },
          delete_time: '',
        },
      });
      if (priceListForSearch) throw new BadRequestException();

      const phone: Phone | null = await this.phoneRepository.findOne({
        where: { name: item.phone_name },
      });

      if (!phone) throw new BadRequestException();
      await this.phoneRepository.save(phone);

      // // const newBrand = new Brand();
      // // newBrand.name = item.phone_brand;
      // // newBrand.image_URL = '';
      // // newBrand.delete_time = '';
      // const brand = await this.brandRepository.findOne({
      //   where: { name: item.phone_brand },
      // });
      // if (!brand) {
      //   throw new BadRequestException();
      // }

      // const newPhone = new Phone();
      // newPhone.name = item.phone_name;
      // newPhone.volume = '256GB';
      // newPhone.color = 'black';
      // newPhone.image_URL = '';
      // newPhone.delete_time = '';
      // newPhone.brand = brand;

      // // await this.brandRepository.save(newBrand);
      // await this.phoneRepository.save(newPhone);

      // const response = new enrollPriceListResDto();
      // return response;
      const telecom: Telecom | null = await this.telecomRepository.findOne({
        where: { name: item.telecom },
      });

      // const newTelecom = new Telecom();
      // newTelecom.name = item.telecom;
      // newTelecom.delete_time = '';
      // await this.telecomRepository.save(newTelecom);

      // const response = new enrollPriceListResDto();
      // return response;
      if (!telecom) throw new BadRequestException();

      // const pricelistEntity = new PriceList();
      // pricelistEntity.phone = phone;
      // pricelistEntity.agency = agency;
      // pricelistEntity.telecom = telecom;
      // pricelistEntity.subscription_type = item.subscription_type;
      // pricelistEntity.price = item.rebatedPrice;
      // pricelistEntity.delete_time = '';
      // let pricelistEntity = await this.priceListRepository.findOne({
      //   where: {
      //     phone: { id: phone.id }, // ID를 사용하여 검색
      //     agency: { id: agency.payload.id },
      //     telecom: { id: telecom.id },
      //     subscription_type: item.subscription_type,
      //   },
      // });

      // console.debug(new Agency());
      // const newRate = new Rate();
      // newRate.name = item.phone_plan.name;
      // newRate.price = item.phone_plan.price;
      // newRate.data = 200;
      // newRate.telecom = telecom;
      // newRate.delete_time = '';
      // await this.rateRepository.save(newRate);

      const rate = await this.rateRepository.findOne({
        where: { name: item.phone_plan.name },
      });
      if (!rate) throw new BadRequestException();

      const new_agency = new Agency();
      new_agency.id = agency.payload.id;

      const new_data = PriceList.setter(
        new_agency,
        phone,
        telecom,
        item.subscription_type,
        item.phone_price,
        phone.price,
        item.discount.name,
        item.discount.price,
        '',
        rate,
      );
      console.debug(new_data);
      new_data.subsidy_by_agency = 300000;

      // const find_priceList = await this.priceListRepository.find({
      //   where: {
      //     subscription_type: item.subscription_type,
      //     agency: new_agency,
      //     phone: phone,
      //     telecom: telecom,
      //     // discount_name: item.discount.name,
      //     // discount_price: item.discount.price,
      //     rate: rate,
      //     delete_time: '',
      //   },
      // });
      // if (find_priceList) throw new NotFoundException();

      await this.priceListRepository.save(new_data);
    }

    const response = new enrollPriceListResDto();
    return response;
  }

  async modifyPriceList(
    dto: modifyListReqDto,
    agency: payloadClass,
  ): Promise<modifyListResDto> {
    const { priceList } = dto;

    // const agencyForSearch: Agency | null = await this.agencyRepository.findOne({
    //   where: { id: agency.payload.id },
    // });
    // if (!agencyForSearch) throw new BadRequestException();
    // console.debug(agencyForSearch);
    const agencyForSearch = new Agency();
    agencyForSearch.id = agency.payload.id;

    const updatePromises = priceList.map(async (item) => {
      const phone: Phone | null = await this.phoneRepository.findOne({
        where: { name: item.phone_name },
      });
      if (!phone) throw new BadRequestException();
      console.debug(phone);

      const telecom: Telecom | null = await this.telecomRepository.findOne({
        where: { name: item.telecom },
      });
      if (!telecom) throw new BadRequestException();
      console.debug(telecom);

      const rate: Rate | null = await this.rateRepository.findOne({
        where: { name: item.phone_plan.name },
      });
      if (!rate) throw new BadRequestException();
      console.debug(rate);

      const pricelistEntity: PriceList | null =
        await this.priceListRepository.findOne({
          where: {
            subscription_type: item.subscription_type,

            agency: { id: agency.payload.id },
            phone: { id: phone.id },
            telecom: { id: telecom.id },
            rate: { id: rate.id },
            delete_time: '',
          },
        });
      if (!pricelistEntity) {
        throw new NotFoundException();
      }
      console.debug(pricelistEntity);

      pricelistEntity.price = item.phone_price;
      await this.priceListRepository.save(pricelistEntity);

      return item;
    });
    try {
      const updatedPriceList = await Promise.all(updatePromises);

      const response = new modifyListResDto();
      response.priceList = updatedPriceList;

      return response;
    } catch (error) {
      throw error;
    }

    /*
    const priceList = [
      {
        phone_name: 'S25',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 35,
      },
      {
        phone_name: 'S25+',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 55,
      },
    ];
    */
    // const response = new modifyListResDto();

    // //response.priceList = priceList;
    // return response;
  }

  async getAllPriceList(
    // dto: getAllPriceListReqDto,
    agency: payloadClass,
  ): Promise<getAllPriceListResDto> {
    // const searchAgency = await this.agencyRepository.findOne({
    //   where: { id: agency.payload.id },
    // });
    // if (!searchAgency) throw new BadRequestException();

    // const priceList = await this.priceListRepository.find({
    //   where: { agency: { id: searchAgency.id }, delete_time: '' },
    //   relations: ['phone', 'telecom', 'rate'],
    // });
    // if (!priceList) throw new NotFoundException();
    // console.debug(priceList);

    const response = new getAllPriceListResDto();
    // response.priceList = priceList.map((item) => ({
    //   agecny_id: item.agency.id,
    //   phone_name: item.phone.name,
    //   phone_brand: item.phone.brand.name,
    //   phone_price: item.price,
    //   phone_plan: {
    //     name: item.rate.name,
    //     price: item.rate.price,
    //   },
    //   discount: {
    //     name: item.discount_name,
    //     price: item.discount_price,
    //   },
    //   subscription_type: item.subscription_type,
    //   telecom: item.telecom.name,
    // }));

    return response;
  }

  async deletePriceList(
    dto: deletePriceListReqDto,
  ): Promise<deletePriceListResDto> {
    const response = new deletePriceListResDto();
    return response;
  }

  async registerRatePlan(
    dto: registerRatePlanReqDto,
  ): Promise<registerRatePlanResDto> {
    const response = new registerRatePlanResDto();
    return response;
  }

  async getAgencyRatePlans(
    dto: getAgencyRatePlansReqDto,
  ): Promise<getAgencyRatePlansResDto> {
    const rate = [
      {
        plan_name: '5G 스탠다드',
        price: 75000,
        telecom: 'SKT',
        data: 150,
      },
      {
        plan_name: '5G 프리미엄',
        price: 89000,
        telecom: 'SKT',
        data: 250,
      },
    ];
    const response = new getAgencyRatePlansResDto();
    response.rate = rate;
    return response;
  }

  async getRatePlanDetail(
    dto: getRatePlanDetailReqDto,
  ): Promise<getRatePlanDetailResDto> {
    const response = new getRatePlanDetailResDto();
    response.plan_name = '5G 스탠다드';
    response.telecom = 'SKT';
    response.price = 75000;
    response.data = 150;
    return response;
  }

  async deleteRatePlan(
    dto: deleteRatePlanReqDto,
  ): Promise<deleteRatePlanResDto> {
    const response = new deleteRatePlanResDto();
    return response;
  }

  async checkReservations(
    dto: checkReservationReqDto,
  ): Promise<checkReservationResDto> {
    const response = new checkReservationResDto();
    response.approval_status = 'approved';
    return response;
  }

  async getAgencyReservations(
    dto: getAgencyReservationsReqDto,
  ): Promise<getAgencyReservationsResDto> {
    const reservation = [
      {
        user_id: 'user1',
        phone_name: 'S25',
        phone_brand: 'samsung',
        auth_code: '1872536263',
        status: 'Pending',
      },
    ];
    const response = new getAgencyReservationsResDto();
    response.reservation = reservation;
    return response;
  }

  async enrollSubsidy(
    dto: enrollSubsidyReqDto,
    agency: payloadClass,
  ): Promise<enrollSubsidyResDto> {
    const agencyForSearch = new Agency();
    agencyForSearch.id = agency.payload.id;

    const newSubsidy: SubsidyByTelecom | null =
      await this.subsidyBytTelecomRepository.findOne({
        where: { telecom: dto.telecom },
      });
    if (newSubsidy) throw new NotFoundException();

    const subsidyEntity = new SubsidyByTelecom();
    subsidyEntity.value = dto.subsidy_value;
    subsidyEntity.telecom = dto.telecom;

    await this.subsidyBytTelecomRepository.save(subsidyEntity);

    const response = new enrollSubsidyResDto();
    return response;
  }

  async getStatusAgency(
    dto: getStatusAgencyReqDto,
    agency: payloadClass,
  ): Promise<getStatusAgencyResDto> {
    // 1. 해당 Agency 확인
    const agencyForSearch = await this.agencyRepository.findOne({
      where: { id: agency.payload.id },
    });
    if (!agencyForSearch)
      throw new UnauthorizedException('존재하지 않는 판매점입니다.');

    // 2. 해당 Agency의 모든 견적서 조회 (KakaoUser 정보 포함)
    const estimates = await this.estimateRepository.find({
      where: {
        priceList: { agency: { id: agencyForSearch.id } },
        delete_time: '',
      },
      relations: ['kakaoUser'], // 고객 정보를 가져오기 위해 필수
      order: { create_time: 'DESC' },
    });

    // 3. 통계 계산
    const quoteCount = estimates.length;
    const completeQuoteCount = estimates.filter(
      (e) => e.is_user_visit === true,
    ).length;

    // 4. StatusAgency 엔티티 업데이트 (DB 저장)
    let statusAgency = await this.statusAgencyRepository.findOne({
      where: { agency: { id: agencyForSearch.id }, delete_time: '' },
    });

    if (!statusAgency) {
      statusAgency = new StatusAgency();
      statusAgency.agency = agencyForSearch;
      statusAgency.delete_time = '';
    }

    statusAgency.quote_count = quoteCount;
    statusAgency.complete_quote_count = completeQuoteCount;
    await this.statusAgencyRepository.save(statusAgency);

    // 5. 응답 DTO 생성 및 리스트 매핑
    const response = new getStatusAgencyResDto();
    response.quote_count = statusAgency.quote_count;
    response.complete_quote_count = statusAgency.complete_quote_count;

    response.quotes = estimates.map((estimate) => {
      const q = new quoteDto();
      q.quote_id = estimate.id;
      q.customer_name = estimate.kakaoUser?.name || '정보 없음';

      // DTO의 오타(costomer)에 맞춰 매핑하되, 엔티티에 phone_number가 활성화되어 있어야 합니다.
      // 만약 엔티티 컬럼이 없다면 undefined가 들어갑니다.
      q.costomer_phone_number =
        (estimate.kakaoUser as any)?.phone_number || '010-0000-0000';

      q.quote_code = estimate.auth_code;
      q.create_time = estimate.create_time;
      q.is_user_visit = estimate.is_user_visit; // 방문 여부 추가

      return q;
    });

    return response;
  }

  async getStatusQuote(
    dto: getStatusQuoteReqDto,
    agency: payloadClass,
  ): Promise<getStatusQuoteResDto> {
    const estimateExample = await this.estimateRepository.findOne({
      where: {
        auth_code: dto.auth_code,
        delete_time: '',
      },
      relations: ['priceList', 'kakaoUser', 'priceList.agency'],
    });
    if (!estimateExample) throw new BadRequestException();
    console.debug(estimateExample);

    const priceListForSearch = await this.priceListRepository.findOne({
      where: {
        id: estimateExample.priceList.id,
        delete_time: '',
      },
      relations: ['agency'],
    });
    if (!priceListForSearch) throw new NotFoundException();

    // const agencyForSearch = await this.agencyRepository.findOne({
    //   where:{id}
    // })

    const response = new getStatusQuoteResDto();
    response.agency_phone_number = priceListForSearch.agency.phone_number;
    response.is_user_visit = estimateExample.is_user_visit;
    response.user_name = estimateExample.kakaoUser.name;

    // //더미 데이터 넣기
    // const response = new getStatusQuoteResDto();
    // response.user_name = '박민준';
    // response.agency_phone_number = '01012345678';
    // response.is_user_visit = false;

    return response;
  }

  async getQuoteDetail(
    dto: getQuoteDetailReqDto,
    agency: payloadClass,
  ): Promise<getQuoteDetailResDto> {
    if (!agency) throw new UnauthorizedException();

    // 1. 판매점 확인
    const agencyForSearch = await this.agencyRepository.findOne({
      where: {
        id: agency.payload.id,
        delete_time: '',
      },
    });
    if (!agencyForSearch)
      throw new UnauthorizedException('판매점 정보를 찾을 수 없습니다.');

    // 2. 24시간 전 시간 계산
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // 3. 인증 코드(auth_code)로 특정 견적서 조회 (24시간 이내, 오래된 순)
    const estimateData = await this.estimateRepository.findOne({
      where: {
        auth_code: dto.auth_code,
        priceList: {
          agency: { id: agencyForSearch.id },
        },
        delete_time: '',
        create_time: MoreThanOrEqual(twentyFourHoursAgo), // ★ 24시간 필터
      },
      relations: [
        'kakaoUser',
        'priceList',
        'priceList.agency',
        'priceList.rate',
        'phone',
        'phone.brand',
        'priceList.telecom',
      ],
      order: {
        create_time: 'ASC', // ★ 오래된 순 정렬
      },
    });

    // 데이터가 없으면 404 반환
    if (!estimateData) {
      console.error(
        `Estimate not found. AgencyID: ${agencyForSearch.id}, AuthCode: ${dto.auth_code}`,
      );
      throw new NotFoundException(
        '해당 인증 코드와 일치하는 견적서가 없습니다.',
      );
    }

    // 4. 통신사 공시지원금 조회
    const subsidy_by_telecom = await this.subsidyBytTelecomRepository.findOne({
      where: {
        telecom: estimateData.priceList.telecom.name,
      },
    });

    // 지원금 정보가 없을 경우 404 또는 기본값 처리
    if (!subsidy_by_telecom) {
      throw new NotFoundException('통신사 지원금 정보를 찾을 수 없습니다.');
    }

    // 5. 응답 DTO 매핑
    const response = new getQuoteDetailResDto();
    response.is_phone_activate = estimateData.is_user_visit;
    response.customer_name = estimateData.kakaoUser?.name || '정보 없음';
    response.customer_email = estimateData.kakaoUser?.email || '정보 없음';
    response.phone_brand = estimateData.phone?.brand?.name || '정보 없음';
    response.phone_name = estimateData.phone?.name || '정보 없음';
    response.phone_volume = estimateData.phone?.volume || '';
    response.phone_plan_name = estimateData.priceList?.rate?.name || '정보 없음';
    response.subscription_type = estimateData.subscription_type;
    response.subsidy_by_telecom = subsidy_by_telecom.value;
    response.subsidy_by_agency = estimateData.priceList.discount_price;

    return response;
  }

  // async getPriceListByPhone(
  //   dto: getPriceListByPhoneReqDto,
  //   agency: payloadClass,
  // ): Promise<getPriceListByPhoneResDto> {
  //   if (!agency) throw new UnauthorizedException('Agency payload is missing.');

  //   // 1. 대리점 조회 (delete_time: IsNull 적용)
  //   const agencyForSearch = await this.agencyRepository.findOne({
  //     where: { id: agency.payload.id, delete_time: IsNull() },
  //   });
  //   if (!agencyForSearch) throw new NotFoundException('Agency not found.');

  //   const { phone_name } = dto;

  //   // 2. 휴대폰 조회
  //   // 서버 환경에서는 'iPhone'과 'iphone'을 다르게 인식할 수 있으니 주의가 필요합니다.
  //   const phoneForSearch = await this.phoneRepository.findOne({
  //     where: { name: phone_name },
  //   });

  //   if (!phoneForSearch) {
  //     console.error(`[Error] Phone not found: ${phone_name}`);
  //     throw new NotFoundException('Phone not found.');
  //   }

  //   // 3. 관련 가격 리스트 한 번에 조회 (N+1 문제 해결 및 IsNull 적용)
  //   const allPriceLists = await this.priceListRepository.find({
  //     where: {
  //       agency: { id: agencyForSearch.id },
  //       phone: { id: phoneForSearch.id },
  //       delete_time: IsNull(),
  //     },
  //     relations: ['telecom', 'rate'],
  //   });

  //   // 디버깅을 위한 로그 (서버 터미널에서 확인 가능)
  //   console.log(
  //     `[Debug] Found ${allPriceLists.length} price items for phone: ${phone_name}`,
  //   );

  //   const TARGET_TELECOMS = ['SKT', 'KT', 'LG U+'] as const;
  //   const REQUIRED_TYPES = ['기기변경', '번호이동', '신규가입'] as const;
  //   const priceListResults: PriceSettingFeildProps[] = [];

  //   // 4. 통신사별 루프
  //   for (const telecomName of TARGET_TELECOMS) {
  //     const currentPriceList: PriceSettingFeildProps = {
  //       telecom: telecomName,
  //       device: phone_name,
  //       options: [],
  //     };

  //     for (const type of REQUIRED_TYPES) {
  //       // 메모리 내에서 데이터 찾기
  //       // 서버가 리눅스인 경우 문자열 비교 시 공백이나 대소문자를 엄격히 체크하세요.
  //       const foundPrice = allPriceLists.find(
  //         (p) =>
  //           p.telecom.name.trim() === telecomName &&
  //           p.subscription_type === type,
  //       );

  //       if (foundPrice) {
  //         const subsidy_by_telecom =
  //           await this.subsidyBytTelecomRepository.findOne({
  //             where: { telecom: telecomName },
  //           });

  //         const telecomSubsidyValue = subsidy_by_telecom?.value || 0;

  //         currentPriceList.options.push({
  //           type: type,
  //           plan: foundPrice.rate.name,
  //           price:
  //             foundPrice.original_price -
  //             foundPrice.subsidy_by_agency -
  //             telecomSubsidyValue,
  //         });
  //       } else {
  //         currentPriceList.options.push({
  //           type: type,
  //           plan: '설정된 가격 없음',
  //           price: 0,
  //         });
  //       }
  //     }
  //     priceListResults.push(currentPriceList);
  //   }

  //   const response = new getPriceListByPhoneResDto();
  //   response.priceList = priceListResults;
  //   return response;
  // }

  async getPriceListByPhone(
    dto: getPriceListByPhoneReqDto,
    agency: payloadClass,
  ): Promise<getPriceListByPhoneResDto> {
    if (!agency) throw new UnauthorizedException('Agency payload is missing.');

    // 1. 대리점 조회 (delete_time: IsNull 적용)
    const agencyForSearch = await this.agencyRepository.findOne({
      where: { id: agency.payload.id, delete_time: '' },
    });
    if (!agencyForSearch)
      throw new NotFoundException('대리점을 찾을 수 없습니다.');

    const { phone_name } = dto;

    // 2. 핸드폰 조회 (delete_time: IsNull 적용)
    const phoneForSearch = await this.phoneRepository.findOne({
      where: { name: phone_name, delete_time: '' },
    });
    if (!phoneForSearch)
      throw new NotFoundException('핸드폰 정보를 찾을 수 없습니다.');

    // 3. 전체 가격 리스트 조회 (delete_time: IsNull 적용)
    const allPriceLists = await this.priceListRepository.find({
      where: {
        agency: { id: agencyForSearch.id },
        phone: { id: phoneForSearch.id },
        delete_time: '',
      },
      relations: ['telecom', 'rate'],
    });

    const TARGET_TELECOMS = ['SKT', 'KT', 'LG U'] as const;
    const REQUIRED_TYPES = ['기기변경', '번호이동', '신규가입'] as const;
    const priceListResults: PriceSettingFeildProps[] = [];

    for (const telecomName of TARGET_TELECOMS) {
      // 4. 통신사 조회 (delete_time: IsNull 적용)
      const telecom = await this.telecomRepository.findOne({
        where: { name: telecomName, delete_time: '' },
      });

      if (!telecom)
        throw new NotFoundException(`${telecomName} 정보를 찾을 수 없습니다.`);

      const currentPriceList: PriceSettingFeildProps = {
        telecom: telecomName,
        device: phone_name,
        options: [],
      };

      // 통신사 지원금 조회 (통신사명 기준)
      const subsidyByTelecom = await this.subsidyBytTelecomRepository.findOne({
        where: { telecom: telecomName },
      });

      for (const type of REQUIRED_TYPES) {
        const option: PriceOption = {
          type: type,
          plan: '설정된 가격 없음',
          price: 0,
        };

        // 메모리에 가져온 데이터에서 필터링 (DB 재조회 방지)
        const matchedPrice = allPriceLists.find(
          (p) => p.telecom.name === telecomName && p.subscription_type === type,
        );

        if (matchedPrice) {
          const originalPrice = matchedPrice.original_price || 0;
          const agencySubsidy = matchedPrice.subsidy_by_agency || 0;
          const telecomSubsidy = subsidyByTelecom ? subsidyByTelecom.value : 0;

          option.plan = matchedPrice.rate?.name || '요금제 정보 없음';
          option.price = originalPrice - agencySubsidy - telecomSubsidy;
        }

        currentPriceList.options.push(option);
      }
      priceListResults.push(currentPriceList);
    }

    const response = new getPriceListByPhoneResDto();
    response.priceList = priceListResults;

    return response;
  }

  // async enrollPriceListDetail(
  //   dto: enrollPriceListDetailReqDto,
  //   agency: payloadClass,
  // ): Promise<enrollPriceListDetailResDto> {
  //   if (!agency) throw new UnauthorizedException();
  //   const new_agency = new Agency();
  //   new_agency.id = agency.payload.id;

  //   const {
  //     phone_brand,
  //     phone_name,
  //     phone_plan_name,
  //     telecom,
  //     subscription_type,
  //     subsidy_by_agency,
  //   } = dto;
  //   const agencyForSearch = await this.agencyRepository.findOne({
  //     where: {
  //       id: new_agency.id,
  //       delete_time: '',
  //     },
  //   });
  //   if (!agencyForSearch) throw new NotFoundException();

  //   const subsidy_by_telecom = await this.subsidyBytTelecomRepository.findOne({
  //     where: { telecom: telecom },
  //   });
  //   if (!subsidy_by_telecom) throw new NotFoundException();
  //   const phoneForSearch = await this.phoneRepository.findOne({
  //     where: {
  //       name: phone_name,
  //       delete_time: '',
  //     },
  //   });
  //   if (!phoneForSearch) throw new NotFoundException();
  //   const rate = await this.rateRepository.findOne({
  //     where: { name: phone_plan_name, delete_time: '' },
  //   });
  //   if (!rate) throw new NotFoundException();
  //   const priceListForSearch = await this.priceListRepository.findOne({
  //     where: {
  //       phone: {
  //         name: phone_name,
  //         brand: { name: phone_brand, delete_time: '' },
  //         delete_time: '',
  //       },
  //       agency: { id: new_agency.id, delete_time: '' },
  //       subscription_type: subscription_type,
  //       rate: { name: phone_plan_name, delete_time: '' },
  //       delete_time: '',
  //     },
  //   });
  //   if (!priceListForSearch) {
  //     const telecom_ = await this.telecomRepository.findOne({
  //       where: { name: telecom, delete_time: '' },
  //     });
  //     if (!telecom_) throw new NotFoundException();

  //     const price =
  //       phoneForSearch.price - subsidy_by_agency - subsidy_by_telecom.value;
  //     const pricelistEntity = PriceList.setter(
  //       agencyForSearch,
  //       phoneForSearch,
  //       telecom_,
  //       subscription_type,
  //       price,
  //       phoneForSearch.price,
  //       '추가 할인',
  //       10000,
  //       '',
  //       rate,
  //     );
  //     pricelistEntity.subsidy_by_agency = subsidy_by_agency;
  //     await this.priceListRepository.save(pricelistEntity);
  //   } else {
  //     priceListForSearch.price =
  //       phoneForSearch.price - subsidy_by_agency - subsidy_by_telecom.value;
  //     priceListForSearch.rate = rate;
  //     await this.priceListRepository.save(priceListForSearch);
  //   }

  //   const response = new enrollPriceListResDto();

  //   return response;
  // }

  async enrollPriceListDetail(
    dto: enrollPriceListDetailReqDto,
    agency: payloadClass,
  ): Promise<enrollPriceListDetailResDto> {
    if (!agency) throw new UnauthorizedException();

    const agencyId = agency.payload.id;

    const {
      phone_brand,
      phone_name,
      phone_plan_name,
      telecom,
      subscription_type,
      subsidy_by_agency,
    } = dto;

    // 1. 대리점 존재 확인
    const agencyForSearch = await this.agencyRepository.findOne({
      where: { id: agencyId, delete_time: '' },
    });
    if (!agencyForSearch) throw new NotFoundException('Agency not found');

    // 2. 통신사 공시지원금 확인
    const subsidy_by_telecom = await this.subsidyBytTelecomRepository.findOne({
      where: { telecom: telecom },
    });
    if (!subsidy_by_telecom)
      throw new NotFoundException('Telecom subsidy info not found');

    // 3. 휴대폰 존재 확인
    const phoneForSearch = await this.phoneRepository.findOne({
      where: { name: phone_name, delete_time: '' },
    });
    if (!phoneForSearch) throw new NotFoundException('Phone not found');

    // 4. 요금제 존재 확인
    const rate = await this.rateRepository.findOne({
      where: { name: phone_plan_name, delete_time: '' },
    });
    if (!rate) throw new NotFoundException('Rate plan not found');

    // 5. 기존 등록된 가격 리스트 검색
    const priceListForSearch = await this.priceListRepository.findOne({
      where: {
        phone: {
          name: phone_name,
          brand: { name: phone_brand, delete_time: '' },
          delete_time: '',
        },
        agency: { id: agencyId, delete_time: '' },
        subscription_type: subscription_type,
        delete_time: '',
      },
      relations: ['rate'], // 요금제 정보 포함
    });

    const finalPrice =
      phoneForSearch.price - subsidy_by_agency - subsidy_by_telecom.value;

    if (!priceListForSearch) {
      // [신규 등록]
      const telecom_ = await this.telecomRepository.findOne({
        where: { name: telecom, delete_time: '' },
      });
      if (!telecom_) throw new NotFoundException('Telecom not found');

      const pricelistEntity = PriceList.setter(
        agencyForSearch,
        phoneForSearch,
        telecom_,
        subscription_type,
        finalPrice,
        phoneForSearch.price,
        '추가 할인',
        10000,
        '',
        rate,
      );
      pricelistEntity.subsidy_by_agency = subsidy_by_agency;
      await this.priceListRepository.save(pricelistEntity);
    } else {
      // [수정 로직] 기존 데이터가 있을 때 모든 필드 업데이트
      priceListForSearch.price = finalPrice;
      priceListForSearch.rate = rate;
      priceListForSearch.subsidy_by_agency = subsidy_by_agency; // 👈 추가지원금 업데이트 반영

      await this.priceListRepository.save(priceListForSearch);
    }

    const response = new enrollPriceListDetailResDto();

    return response;
  }

  async getPhoneDetail(
    dto: getPhoneDetailReqDto,
    agency: payloadClass,
  ): Promise<getPhoneDetailResDto> {
    const new_agency = new Agency();
    new_agency.id = agency.payload.id;

    const phone = await this.phoneRepository.findOne({
      where: {
        name: dto.phone_name,
        delete_time: '',
      },
    });
    if (!phone) throw new NotFoundException();

    const response = new getPhoneDetailResDto();
    response.original_price = phone.price;

    return response;
  }

  async checkIsUserVisit(
    dto: checkIsUserVisitReqDto,
    agency: payloadClass,
  ): Promise<checkIsUserVisitResDto> {
    const new_agency = new Agency();
    new_agency.id = agency.payload.id;

    const kakaoUser = await this.kakaoUserRepository.findOne({
      where: {
        id: dto.costumer_id,
        delete_time: '',
      },
    });
    if (!kakaoUser) throw new BadRequestException();
    const estimate = await this.estimateRepository.findOne({
      where: {
        kakaoUser: { id: dto.costumer_id },
        is_user_visit: false,
        delete_time: '',
      },
    });
    if (!estimate) throw new NotFoundException();
    estimate.is_user_visit = true;
    await this.estimateRepository.save(estimate);

    const response = new checkIsUserVisitResDto();

    return response;
  }

  async checkLogin(
    dto: checkLoginReqDto,
    agency: payloadClass,
  ): Promise<checkLoginResDto> {
    const response = new checkLoginResDto();
    return response;
  }

  async pushDummyData(): Promise<any> {
    // const skt = new Telecom();
    // skt.name = 'SKT';
    // skt.delete_time = '';
    // await this.telecomRepository.save(skt);
    // const kt = new Telecom();
    // kt.name = 'KT';
    // kt.delete_time = '';
    // await this.telecomRepository.save(kt);
    // const lgu = new Telecom();
    // lgu.name = 'LG U+';
    // lgu.delete_time = '';
    // await this.telecomRepository.save(lgu);

    // const samsung = new Brand();
    // samsung.name = 'samsung';
    // samsung.image_URL = '';
    // samsung.delete_time = '';
    // await this.brandRepository.save(samsung);
    // const apple = new Brand();
    // apple.name = 'apple';
    // apple.image_URL = '';
    // apple.delete_time = '';
    // await this.brandRepository.save(apple);

    const brand1 = await this.brandRepository.findOne({
      where: { name: 'samsung' },
    });
    if (!brand1) throw new NotFoundException();
    const s25 = new Phone();
    s25.name = '갤럭시S25';
    s25.volume = '256GB';
    s25.color = 'black';
    s25.image_URL = '/images/device/galaxy/galaxy_s25.png';
    s25.delete_time = '';
    s25.brand = brand1;
    s25.price = 1000000;
    await this.phoneRepository.save(s25);
    const s25p = new Phone();
    s25p.name = '갤럭시S25 플러스';
    s25p.volume = '256GB';
    s25p.color = 'black';
    s25p.image_URL = '/images/device/galaxy/galaxy_s25_+.png';
    s25p.delete_time = '';
    s25p.brand = brand1;
    s25p.price = 1300000;
    await this.phoneRepository.save(s25p);
    const s25u = new Phone();
    s25u.name = '갤럭시S25 울트라';
    s25u.volume = '512GB';
    s25u.color = 'black';
    s25u.image_URL = '/images/device/galaxy/galaxy_s25_ultra.png';
    s25u.delete_time = '';
    s25u.brand = brand1;
    s25u.price = 1400000;
    await this.phoneRepository.save(s25u);

    const brand2 = await this.brandRepository.findOne({
      where: { name: 'apple' },
    });
    if (!brand2) throw new NotFoundException();
    const i17 = new Phone();
    i17.name = '아이폰 17';
    i17.volume = '256GB';
    i17.color = 'black';
    i17.image_URL = '/images/device/iphone/iphone_17.png';
    i17.delete_time = '';
    i17.brand = brand2;
    i17.price = 1300000;
    await this.phoneRepository.save(i17);
    const i17air = new Phone();
    i17air.name = '아이폰 17 Air';
    i17air.volume = '256GB';
    i17air.color = 'black';
    i17air.image_URL = '/images/device/iphone/iphone_17_air.png';
    i17air.delete_time = '';
    i17air.brand = brand2;
    i17air.price = 1500000;
    await this.phoneRepository.save(i17air);

    const i17pro = new Phone();
    i17pro.name = '아이폰 17 Pro';
    i17pro.volume = '256GB';
    i17pro.color = 'black';
    i17pro.image_URL = '/images/device/iphone/iphone_17_pro.png';
    i17pro.delete_time = '';
    i17pro.brand = brand2;
    i17pro.price = 2000000;
    await this.phoneRepository.save(i17pro);

    const i17promax = new Phone();
    i17promax.name = '아이폰 17 Pro Max';
    i17promax.volume = '512GB';
    i17promax.color = 'black';
    i17promax.image_URL = '/images/device/iphone/iphone_17_pro_max.png';
    i17promax.delete_time = '';
    i17promax.brand = brand2;
    i17promax.price = 2300000;
    await this.phoneRepository.save(i17promax);

    // //rate, priceList 더미 데이터 넣어야 됨.

    // const TARGET_TELECOMS: ('SKT' | 'KT' | 'LG U+')[] = ['SKT', 'KT', 'LG U+'];

    // for (const telecomName of TARGET_TELECOMS) {
    //   console.debug(telecomName);
    //   const telecom = await this.telecomRepository.findOne({
    //     where: { name: telecomName, delete_time: '' },
    //   });
    //   if (!telecom) throw new NotFoundException();

    //   const rate115 = new Rate();
    //   rate115.telecom = telecom;
    //   rate115.name = '115';
    //   rate115.data = 200;
    //   rate115.price = 115000;
    //   rate115.delete_time = '';
    //   await this.rateRepository.save(rate115);
    //   const rate105 = new Rate();
    //   rate105.telecom = telecom;
    //   rate105.name = '105';
    //   rate105.data = 150;
    //   rate105.price = 105000;
    //   rate105.delete_time = '';
    //   await this.rateRepository.save(rate105);
    //   const rate95 = new Rate();
    //   rate95.telecom = telecom;
    //   rate95.name = '95';
    //   rate95.data = 100;
    //   rate95.price = 95000;
    //   rate95.delete_time = '';
    //   await this.rateRepository.save(rate95);
    // }

    const response = {};
    return response;
  }
}
