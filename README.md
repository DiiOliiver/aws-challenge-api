# Case Técnico: Gerenciador de dispositivos

## Stack utilizada

**Back-end:** Node v22.14.0, Express v4.16.1 e MySQL 8.0.30

## Instalação

#### 1 - Clonando o projeto
```powershell
    git clone https://github.com/DiiOliiver/aws-challenge-api.git
    cd api
```

#### 2 - Duplique o arquivo '.env-example' e renomei para '.env'
```text
    PORT=8081
    NODE_ENV=production # opções: production | developer | test

    # mysql
    DB_HOST=api_db
    DB_PORT=3306
    DB_USER={usuario}
    DB_PASSWORD={senha}
    DB_NAME=managerdevice
```
Nota 1: Utilize o exemplo acima e edite conforme necessário, apenas a porta deve permanecer 8081 ou editar também no arquivo Dockerfile.\
Nota 2: Se for levantar o projeto localmente, alterar o valor de DB_HOST para localhost, api_db é a imagem do docker que será levantado.
Nota 3: Para levantar o projeto pelo docker, necessário que o NODE_ENV esteja como production para que no build seja gerado a pasta dist e copiado para dentro do docker.

#### 3 - Levantar ambiente docker compose
```powershell
    docker compose up -d --build
```

#### 3.1 - Com esse comando é possivel acompanhar as etapas de execução do Dockerfile e entrypoint.sh (Opcional)
```powershell
    docker logs -f api_app
```


#### 4 - Acessando e levantando o projeto:
```text
    Após a finalização do levantamento do docker, encontrará a base de dados e suas tabelas geradas e a api está disponivel em http://localhost:8081.
```

#### 7 - Acessos localmente
```text
    No arquivo .env altere para o seguinte modelo

    PORT=3000
    NODE_ENV=developer

    # mysql
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER={usuario}
    DB_PASSWORD={senha}
    DB_NAME=managerdevice

    Para levantar o projeto localmente execute: npm run dev
```