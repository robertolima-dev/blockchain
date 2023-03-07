<h1 align="center">
<br>Blockchain
</h1>


Blockchain é uma tecnologia de registro distribuído que permite a criação de um livro-razão digital seguro e imutável. É usado para armazenar e transmitir informações de forma segura, transparente e confiável. É usado principalmente para criptomoedas, mas também pode ser usado para outras aplicações, como registros médicos, registros de propriedade, contratos inteligentes e muito mais. A blockchain é uma tecnologia que permite a criação de um livro-razão digital seguro e imutável, o que significa que as informações armazenadas não podem ser alteradas ou excluídas.

## Benefícios

1. Segurança: A blockchain é extremamente segura, pois usa criptografia para proteger os dados.

2. Transparência: Todas as transações são registradas e visíveis para todos os usuários da rede.

3. Descentralização: A blockchain não depende de um único servidor central, o que significa que não há um único ponto de falha.

4. Imutabilidade: Uma vez que uma transação é registrada na blockchain, ela não pode ser alterada ou excluída.

5. Custos reduzidos: A blockchain elimina a necessidade de intermediários, o que significa que as transações são mais baratas.

6. Velocidade: As transações na blockchain são processadas muito mais rapidamente do que as transações tradicionais.

## iniciando o projeto

Clone o projeto

`$ git clone git@github.com:robertolima-dev/blockchain.git`

`$ cd blockchain`

`$ npm i`

`$ npm run dev` vai iniciar http no localhost:4001 e socket no localhost:5001

Abra um novo terminal e rode:
`$ HTTP_PORT=4002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev` vai iniciar um p2p http no localhost:4002 e socket no localhost:5002

## inciando um bloco

Vá na raiz do projeto e rode
`node miner1.js`

Abra um novo terminal e rode:
`node miner2.js`

<div align="center">
  <br/>
  <br/>
  <br/>
    <div>
      <sub>Copyright © 2023 - <a href="https://github.com/robertolima-dev">robertolima-dev</sub></a>
    </div>
    <br/>
    <p> 
      <a href="https://github.com/robertolima-dev/licenca/blob/main/LICENSE.md">LICENÇA</a>
    </p>
</div>