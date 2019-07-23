import { assert } from "chai";
import { ArrayUtil } from "../../src/utils/array/ArrayUtil";

describe("ArrayUtil", () => {
  var arr: Array<number>;

  beforeEach(function () {
    arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  })

  it("getSum", () => {
    assert.equal(ArrayUtil.getSum(arr), 9 * 5)
  })

  it("arrToBit", () => {
    assert.equal(ArrayUtil.arrToBit(arr), 0x3FE)
  })

  it("bitToArr", () => {
    assert.sameOrderedMembers(ArrayUtil.bitToArr(15, 0, 4), [1, 1, 1, 1])
  })

  it("shuff", function () {
    assert.sameMembers(ArrayUtil.shuff(arr), arr)
  })

  it("createNumArr", function () {
    assert.sameOrderedMembers(ArrayUtil.createNumArr(0, 10), arr)
  })


});