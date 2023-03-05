const { expect } = require('@jest/globals');
const Block = require('./block');
const Blockchain = require('./index')

describe('Blockchain', () => {

    let blockchain
    let blockchain2

    beforeEach(() => {
        blockchain = new Blockchain
        blockchain2 = new Blockchain
    });

    it('start with genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis())
    });

    it('adds a new block', () => {
        const data = 'file.pdf'
        blockchain.addBlock(data)
        expect(blockchain.chain[blockchain.chain.length -1].data).toEqual(data)
    });

    it('Validates a valid chain', () => {
        blockchain2.addBlock('500U$')
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true)
    })

    it('Invalidates a chain with a corrupt genesis block', () => {
        blockchain2.chain[0].data = '0U$'
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false)
    })

    it('Invalidates a corrupt chain', () => {
        blockchain2.addBlock('200U$')
        blockchain2.chain[1].data = '0U$'
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false)
    })

    it('Replaces the chain with  a valid chain', () => {
        blockchain2.addBlock('600U$')
        blockchain.replaceChain(blockchain2.chain)
        expect(blockchain.chain).toEqual(blockchain2.chain)
    })

    it('Does not replace the chain with one of less or equal length', () => {
        blockchain.addBlock('200U$')
        blockchain.replaceChain(blockchain2.chain)
        expect(blockchain.chain).not.toEqual(blockchain2.chain)
    })

})
