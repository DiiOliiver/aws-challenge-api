import request from "supertest";
import app from "../../src/app";

describe("Category API", () => {
  it("should create, return list and delete a category", async () => {
    const newCategory = {
      name: `Smartphones Teste ${Math.floor(Math.random() * 1000)}`,
    };

    const createRes = await request(app).post("/categories").send(newCategory);
    expect(createRes.status).toBe(201);

    const categoryId = createRes.body.id;

    const deleteRes = await request(app).delete(`/categories/${categoryId}`);
    expect(deleteRes.status).toBe(204);

    const listRes = await request(app).get("/categories");
    expect(listRes.status).toBe(200);
  });


  it("should return 400 if trying to delete a category linked to devices", async () => {
    const categoryRes = await request(app)
      .post("/categories")
      .send({ name: `Smartphones Teste ${Math.floor(Math.random() * 1000)}` });
    expect(categoryRes.status).toBe(201);

    const categoryId = categoryRes.body.id;

    const deviceRes = await request(app)
      .post("/devices")
      .send({
        name: `Dispositivo Teste ${Math.floor(Math.random() * 1000)}`,
        category: categoryId,
        color: "black",
        partNumber: `12345${Math.floor(Math.random() * 1000)}`,
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
