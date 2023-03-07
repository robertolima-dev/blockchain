const express = require('express')
const Blockchain = require('../blockchain')
const HTTP_PORT = process.env.HTTP_PORT || 4001
const P2pServer = require('./p2p-server')
const Wallet = require('../wallet')
const TransactionPool = require('../wallet/transaction-pool')
// $ HTTP_PORT=4002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev

const app = express()
const bc = new Blockchain()
const wallet = new Wallet()
const tp = new TransactionPool()
const p2pServer = new P2pServer(bc, tp)

app.use(express.json())

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to blockchain!" })
})

app.get('/blocks', (req, res) => {
    res.json(bc.chain)
})

app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data)
    console.log(`New block added ${block.toString()}`)
    p2pServer.syncChain()
    res.redirect('/blocks')
})

app.get('/transactions', (req, res) => {
    res.json(tp.transactions)
})

app.post('/transact', (req, res) => {
    const { recipient, amount } = req.body
    const transaction = wallet.createTransaction(recipient, amount, tp)
    p2pServer.broadcastTransaction(transaction)
    res.redirect('/transactions')
})

app.get('/public-key', (req, res) => {
    res.json({ publicKey: wallet.publicKey })
})

app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`)
})

p2pServer.listen()

