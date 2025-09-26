import { Module, Controller, Get } from "@nestjs/common";
import { InsuranceModule } from "./insurance/insurance.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/environment.config";

@Controller()
class RootController {
    @Get()
    getRoot(): string {
        return "Hello World!";
    }
}

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            cache: true,
            isGlobal: true,
        }),
        InsuranceModule,
    ],
    controllers: [RootController],
    providers: [],
})
export class AppModule {}
