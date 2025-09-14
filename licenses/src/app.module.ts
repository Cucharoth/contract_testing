import { Module } from '@nestjs/common';
import { LicensesModule } from './licenses/licenses.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    PrismaModule,
    LicensesModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
