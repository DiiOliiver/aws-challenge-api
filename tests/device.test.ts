import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/config/ormconfig";

describe("Device API", () => {
  beforeAll(async () => {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Banco conectado para testes");
    }
  });

  afterAll(async () => {
    await AppDataSource.destroy();
    console.log("Banco desconectado após testes");
  });

  it("should create, return list and delete a device", async () => {
    const newDevice = {
      name: "iPhone 14 Teste",
      category: 2,
      color: "Preto",
      partNumber: "A1234",
      status: "Ativo",
    };

    const createRes = await request(app).post("/devices").send(newDevice);
    expect(createRes.status).toBe(201);

    const deviceId = createRes.body.id;

    const deleteRes = await request(app).delete(`/devices/${deviceId}`);
    expect(deleteRes.status).toBe(204);

    const listRes = await request(app).get("/devices");
    expect(listRes.status).toBe(200);
  });
});
