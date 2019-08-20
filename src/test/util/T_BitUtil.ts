import { assert } from 'chai';
import { BitUtil } from '../../common/utils/bit/BitUtil';


describe('BitUtil', function () {

    it('bitToArr', function () {
        assert.sameDeepMembers(BitUtil.bitToArr(0x00FF, 0, 4), [1, 1, 1, 1]);
        assert.sameDeepMembers(BitUtil.bitToArr(0x00FF, 0, 8), [1, 1, 1, 1, 1, 1, 1, 1]);
        assert.sameDeepMembers(BitUtil.bitToArr(0x00FE, 0, 8), [0, 1, 1, 1, 1, 1, 1, 1]);
    });

    it('clearBit', function () {
        assert.equal(BitUtil.clearBit(0x000F, 2), 15 - Math.pow(2, 2));
        assert.equal(BitUtil.clearBit(0x000F, 1), 15 - Math.pow(2, 1));
        assert.equal(BitUtil.clearBit(0x000F, 0), 15 - Math.pow(2, 0));
    });

    it('getBitCount', function () {
        assert.equal(BitUtil.getBitCount(0), 0);
        assert.equal(BitUtil.getBitCount(1), 1);
        assert.equal(BitUtil.getBitCount(2), 1);
        assert.equal(BitUtil.getBitCount(3), 2);
        assert.equal(BitUtil.getBitCount(4), 1);
        assert.equal(BitUtil.getBitCount(5), 2);
        assert.equal(BitUtil.getBitCount(6), 2);
        assert.equal(BitUtil.getBitCount(7), 3);
        assert.equal(BitUtil.getBitCount(8), 1);
        assert.equal(BitUtil.getBitCount(9), 2);
        assert.equal(BitUtil.getBitCount(10), 2);
        assert.equal(BitUtil.getBitCount(11), 3);
        assert.equal(BitUtil.getBitCount(13), 3);
        assert.equal(BitUtil.getBitCount(14), 3);
        assert.equal(BitUtil.getBitCount(15), 4);
        assert.equal(BitUtil.getBitCount(16), 1);
        assert.equal(BitUtil.getBitCount(17), 2);
        assert.equal(BitUtil.getBitCount(18), 2);
        assert.equal(BitUtil.getBitCount(19), 3);
        assert.equal(BitUtil.getBitCount(21), 3);
        assert.equal(BitUtil.getBitCount(22), 3);
        assert.equal(BitUtil.getBitCount(23), 4);
        assert.equal(BitUtil.getBitCount(24), 2);
        assert.equal(BitUtil.getBitCount(25), 3);
        assert.equal(BitUtil.getBitCount(26), 3);
        assert.equal(BitUtil.getBitCount(27), 4);
        assert.equal(BitUtil.getBitCount(28), 3);
        assert.equal(BitUtil.getBitCount(29), 4);
        assert.equal(BitUtil.getBitCount(30), 4);
        assert.equal(BitUtil.getBitCount(31), 5);
        assert.equal(BitUtil.getBitCount(32), 1);
        // 验证是否所有位数全都是1
        for (let i: number = 0; i < BitUtil.MAX_BIT_FOR_NUM; ++i) {
            assert.equal(BitUtil.getBitCount(Math.pow(2, i)), 1);
        }

    });
});
