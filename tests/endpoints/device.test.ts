import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/config/ormconfig";

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
    const newCategory = {
      name: `Smartphones Teste ${Math.floor(Math.random() * 1000)}`,
    };

    const createCategoryRes = await request(app).post("/categories").send(newCategory);
    expect(createCategoryRes.status).toBe(201);

    const categoryId = createCategoryRes.body.id

    const newDevice = {
      name: "iPhone 14 Teste",
      category: categoryId,
      color: "Preto",
      partNumber: "A1234",
      status: "active",
    };

    const createRes = await request(app).post("/devices").send(newDevice);
    console.log(createRes.body)
    expect(createRes.status).toBe(201);

    const deviceId = createRes.body.id;

    const deleteRes = await request(app).delete(`/devices/${deviceId}`);
    expect(deleteRes.status).toBe(204);

    const listRes = await request(app).get("/devices");
    expect(listRes.status).toBe(200);

    const deleteCategoryRes = await request(app).delete(`/categories/${categoryId}`);
    expect(deleteCategoryRes.status).toBe(204);
  });
});
