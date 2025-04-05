import { AppDataSource } from "./src/config/ormconfig";

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