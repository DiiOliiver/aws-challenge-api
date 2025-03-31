import request from "supertest";
import app from "../src/app";
import { AppDataSource } from "../src/config/ormconfig";

describe("Category API", () => {
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

  it("should create, return list and delete a category", async () => {
    const newCategory = {
      name: "Smartphones Teste",
    };

    const createRes = await request(app).post("/categories").send(newCategory);
    expect(createRes.status).toBe(201);

    const deviceId = createRes.body.id;

    const deleteRes = await request(app).delete(`/categories/${deviceId}`);
    expect(deleteRes.status).toBe(204);

    const listRes = await request(app).get("/categories");
    expect(listRes.status).toBe(200);
  });
});
