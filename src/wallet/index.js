const ChainUtil = require('../../chain-util')
const { INITIAL_BALANCE } = require('../../config')
const Transaction = require('./transaction')

class Wallet {

    constructor() {
        this.balance = INITIAL_BALANCE
        this.keyPair = ChainUtil.genKeyPair()
        this.publicKey = this.keyPair.getPublic().encode('hex')
    }

    toString() {
        return `
        Wallet:
        balance = ${this.balance}
        publicKey = ${this.publicKey.toString()}
        `
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash)
    }

    createTransaction(recipient, amount, transactionPool) {
        if (amount > this.balance) {
            console.log(`Amount: ${amount} exceeds current balance: ${this.balance}`)
            return 
        } 

        let transaction = transactionPool.existingTransaction(this.publicKey)

        if (transaction) {

            transaction.update(this, recipient, amount)

        } else {

            transaction = Transaction.newTransction(this, recipient, amount)
            transactionPool.updateOrAddTransaction(transaction)

        }

        return transaction
    }
    
}

module.exports = Wallet