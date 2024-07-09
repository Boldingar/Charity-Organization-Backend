import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { BeneficiariesModule } from './beneficiaries/beneficiaries.module';
import { DepartmentsModule } from './departments/departments.module';
import { DonationsModule } from './donations/donations.module';
import { DonatorsModule } from './donators/donators.module';
import { EventsModule } from './events/events.module';
import { StaffModule } from './staff/staff.module';
import { VolunteersModule } from './volunteers/volunteers.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
        logging: true
      }),
    }),
    AuthModule,
    BeneficiariesModule,
    DepartmentsModule,
    DonationsModule,
    DonatorsModule,
    EventsModule,
    StaffModule,
    VolunteersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
