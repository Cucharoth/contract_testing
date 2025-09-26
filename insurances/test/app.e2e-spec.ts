import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request, { Response } from "supertest";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it("/ (GET)", async () => {
        const server: unknown = app.getHttpServer();
        // supertest expects a Node http server or express app; cast after runtime retrieval
        const res: Response = await request(
            server as Parameters<typeof request>[0],
        ).get("/");
        expect(res.status).toBe(200);
        expect(res.text).toBe("Hello World!");
    });
});
