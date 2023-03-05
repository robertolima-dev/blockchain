const { expect } = require('@jest/globals')
const Block = require('./block')
// const { DIFFICULTY, MINE_RATE } = require('../../config')

describe('Block', () => {

    let data
    let lastBlock
    let block

    beforeEach(() => {
        data = 'index.html'
        lastBlock = Block.genesis()
        block = Block.mineBlock(lastBlock, data)
    });

    it('sets `data` to match the input', () => {
        expect(block.data).toEqual(data)
    });

    it('sets `lastHash` to match the hash of the least block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash)
    });

    it('generates a hash that matches the difficulty', () => {
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty))
    })

    it('lowers the difficulty for slowly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 360000)).toEqual(block.difficulty - 1)
    })

    it('raises the difficulty for quickly mined blocks', () => {
        expect(Block.adjustDifficulty(block, block.timestamp + 1)).toEqual(block.difficulty + 1)
    })

})
