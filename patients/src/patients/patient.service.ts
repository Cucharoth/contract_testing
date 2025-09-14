import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class PatientsService {
    getPatientLicenses(patientId: string) {
        return axios.get(`/license/${patientId}`)
    }            
}