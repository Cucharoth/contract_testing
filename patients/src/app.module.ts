import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patient.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      cache: true,
      isGlobal: true,
    }),
    PatientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
