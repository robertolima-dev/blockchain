const Transaction = require('./transaction')
const Wallet = require('./index')

describe('Transaction', () => {

    let transaction
    let wallet
    let recipient
    let amount

    beforeEach(() => {
        wallet = new Wallet()
        amount = 50
        recipient = 'MyBlockHashAddress'
        transaction = Transaction.newTransction(wallet, recipient, amount)
    });

    it('outputs the "amount" substracted fron the wallet balances', () => {
        expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount).toEqual(wallet.balance - amount)
    })

    it('outputs "amount" added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address == recipient).amount).toEqual(amount)
    })

    it('input the balance of the wallet', () => {
        expect(transaction.input.amount).toEqual(wallet.balance)
    })

    it('validates a valid transaction', () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true)
    })

    it('invalidates a corrupt transaction', () => {
        transaction.outputs[0].amount = 50000
        expect(Transaction.verifyTransaction(transaction)).toBe(false)
    })

    describe('transaction with an amount exceeds the balance', () => {

        beforeEach(() => {
            amount = 50000
            transaction = Transaction.newTransction(wallet, recipient, amount)
        });

        it('does not create the transaction', () => {
            expect(transaction).toEqual(undefined)
        })

    })

    describe('update a transaction', () => {

        let nextAmount
        let nextRecipient

        beforeEach(() => {
            nextAmount = 20
            nextRecipient = 'RecipinetBlockHashAddress'
            // transaction = new Transaction()
            transaction = transaction.update(wallet, nextRecipient, nextAmount)
        });

        it('subtracts the next amount from the sender output', () => {
            expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount).toEqual(wallet.balance - amount - nextAmount)
        })

        it('outputs an amount for the next recipient', () => {
            expect(transaction.outputs.find(output => output.address == nextRecipient).amount).toEqual(nextAmount)
        })

    })
})