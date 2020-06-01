# Backend Challenge

## Observações

- [x] Crie um servidor em Node.js usando [Apollo GraphQL Server](https://www.apollographql.com/docs/apollo-server/)
    - [x] Crie o schema GraphQL com uma query `suitablePlanets`, que retorna os dados dos planetas com gravidade alta
    - [x] Crie uma mutation `installStation`, que dado um planeta, instala uma estação de carregamento no planeta(é sugerido criar uma tabela em algum DB que guarde a informação de aonde estão instaladas as estações)
    - [ ] Use um [RESTDataSource](https://www.apollographql.com/docs/apollo-server/data/data-sources/) para pegar os dados da [Arcsecond]
      - *Notei que o provider levava um tempo considerável para retornar a resposta, ocorrendo assim um time considerável na resposta; então, acabei utilizando um Job para coletar os planetas específicos e inserir-los no banco. O Job deve ser refatorado pra trabalhar com filas de requisições.*
- [x] Deixe aberto em algum repositório open-source(gitlab, github, etc...)
- [x] Integre o servidor com algum banco de dados(para marcar onde as estações foram instaladas)
- [x] Documente o seu projeto, e explique como rodar ele
# Extras
- [ ] Adicione testes usando [Jest] ou qualquer outro framework para testes
- [x] Usar Typescript
- [x] Coloque um docker-compose, que simplifique rodar o seu servidor e o DB
- [x] Usamos [prisma](prisma.io) mas sinta-se livre para usar qualquer ORM
  - Optei por utilizar o TypeORM, por ter mais domínio.
- [x] Como o dado da [Arcsecond] vem páginado, tente pegar mais de uma página(e.g. 10 páginas)


# Como executar
Primeiro deve-se executar
```sh
docker-compose up -d
```

A aplicação será executada em http://localhost:4000

## Chamadas da API

Query > Suitable Planets
```graphql
{
    suitablePlanets {
        id
        name
        mass
        hasStation
    }
}
```

Mutation > Install Planet Station
```graphql
mutation {
  installStation(id: 1) {
    id
    name
    hasStation
  }
}
```

