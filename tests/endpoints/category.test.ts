import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/config/ormconfig";

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


  it("should return 400 if trying to delete a category linked to devices", async () => {
    const categoryRes = await request(app)
      .post("/categories")
      .send({ name: "Categoria Teste" });
    expect(categoryRes.status).toBe(201);

    const categoryId = categoryRes.body.id;

    const deviceRes = await request(app)
      .post("/devices")
      .send({
        name: "Dispositivo Teste",
        category: categoryId,
        color: "black",
        partNumber: "12345",
        status: "active",
      });
    expect(deviceRes.status).toBe(201);

    const deleteRes = await request(app).delete(`/categories/${categoryId}`);
    expect(deleteRes.status).toBe(400);
    expect(deleteRes.body).toHaveProperty("error", "Unable to delete a category linked to devices");

    const deviceDeleteRes = await request(app).delete(`/devices/${deviceRes.body.id}`)
    expect(deviceDeleteRes.status).toBe(204);

    const categoryDeleteRes = await request(app).delete(`/categories/${categoryId}`);
    expect(categoryDeleteRes.status).toBe(204);
  });
});
