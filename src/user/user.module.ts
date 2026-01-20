import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Agency } from 'src/entity/Agency.entity';
import { Estimate } from 'src/entity/Estimate.entity';
import { SearchedInfo } from 'src/entity/SearchedInfo.entity';
import { AgencyModule } from 'src/agency/agency.module';
import { Phone } from 'src/entity/Phone.entity';
import { Telecom } from 'src/entity/Telecom.entity';
import { Rate } from 'src/entity/Rate.entity';
import { SubsidyByTelecom } from 'src/entity/SubsidyByTelecom.entity';
import { UserAuthModule } from 'src/user-auth/user-auth.module';
import { ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    // TypeOrmModule에 필요한 Entity를 등록
    forwardRef(() => AgencyModule),
    forwardRef(() => UserAuthModule),
    HttpModule,
    TypeOrmModule.forFeature([
      KakaoUser,
      PriceList,
      Agency,
      Estimate,
      SearchedInfo,
      Phone,
      Telecom,
      Rate,
      SubsidyByTelecom,
    ]),
  ],
  providers: [
    UserService,
    {
      provide: 'USER_CONFIG',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        jwtSecret: config.get<string>('JWT_SECRET'),
        jwtExp: config.get<string>('JWT_EXPIRATION_TIME'),
      }),
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
