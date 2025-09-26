import { InsuranceService } from "../insurance.service";

describe("InsuranceService", () => {
    let service: InsuranceService;

    beforeEach(() => {
        service = new InsuranceService();
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
