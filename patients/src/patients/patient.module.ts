import { Module } from "@nestjs/common";
import { PatientsController } from "./patient.controller";
import { PatientsService } from "./patient.service";

@Module({
    providers: [PatientsService],
    controllers: [PatientsController],
    imports: [],
    exports: [],
})
export class PatientsModule {}
