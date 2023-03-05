const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('./index')

describe('TransactionPool', () => {
    let tp, wallet, transaction 

    beforeEach(() => {
        tp = new TransactionPool()
        wallet = new Wallet()
        transaction = Transaction.newTransction(wallet, 'r4nd0m-4dr355', 30)
        tp.updateOrAddTransaction(transaction)
    })

    it('adds a transaction to the pool', () => {
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction)
    })

    it('updates a transaction in the pool', () => {
        const oldTransaction = JSON.stringify(transaction)
        const newTransaction = transaction.update(wallet, 'n3xt-r3cipi3nt', 50)
        tp.updateOrAddTransaction(newTransaction)

        expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction.id))).not.toEqual(oldTransaction)
    })

})

