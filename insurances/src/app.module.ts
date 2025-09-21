import { Module } from "@nestjs/common";
import { InsuranceModule } from "./insurance/insurance.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/environment.config";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            cache: true,
            isGlobal: true,
        }),
        InsuranceModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
