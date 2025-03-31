#!/bin/sh

# Espera o banco de dados iniciar
echo "Aguardando o banco de dados iniciar..."
while ! nc -z api_db 3306; do
  sleep 1
done
echo "Banco de dados disponível. Iniciando a API..."

# Executa o build (caso não tenha sido executado)
echo "Rodando a compilação TypeScript..."
npm run build

ls -la dist/

echo "Executando migrations..."
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d dist/config/ormconfig.js

echo "Iniciando a aplicação"
node dist/server.js
