## Exemplos de passagem de parametros de query:

| Key                | Value                                                                       |
| ------------------ | ----------------------------------------------------------------------------|
| limit              | 10                                                                          |
| orders             | [["id", "ASC"]]                                                             |
| page               | 1                                                                           |
| filters[]          | [{ "where": ["jogos.id", "1"] }]                                            |
| filters[]          | [{ "where": ["categoria_jogos.nome", "Aventura"] }]                         |