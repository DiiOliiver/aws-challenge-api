import request from "supertest";
import app from "../../src/app";

describe("Device API", () => {
  it("should create, return list and delete a device", async () => {
    const newCategory = {
      name: `Smartphones Teste ${Math.floor(Math.random() * 1000)}`,
    };

    const createCategoryRes = await request(app).post("/categories").send(newCategory);
    expect(createCategoryRes.status).toBe(201);

    const categoryId = createCategoryRes.body.id

    const newDevice = {
      name: `iPhone 14 Teste ${Math.floor(Math.random() * 1000)}`,
      category: categoryId,
      color: "Preto",
      partNumber: `A123${Math.floor(Math.random() * 1000)}`,
    };

    const createRes = await request(app).post("/devices").send(newDevice);
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
