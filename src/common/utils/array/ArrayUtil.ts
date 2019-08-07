import { BitUtil } from '../bit/BitUtil';
import { MathUtil } from '../math/MathUtil';

export class ArrayUtil {


    /**
     * 将位状态转换成数组
     * @param value
     * @param startIndex 默认0
     * @param endIndex 默认BitUtil.MAX_BIT_FOR_NUM)
     */
    public static bitToArr(value: number, startIndex: number = 0, endIndex: number = BitUtil.MAX_BIT_FOR_NUM): number[] {
        return BitUtil.bitToArr(value, startIndex, endIndex);
    }

    /**
     *
     * @param arr
     * @param startIndex 默认0
     * @param endIndex 默认BitUtil.MAX_BIT_FOR_NUM)
     */
    public static arrToBit(arr: number[], startIndex: number = 0, endIndex: number = BitUtil.MAX_BIT_FOR_NUM): number {
        return BitUtil.arrToBit(arr, startIndex, endIndex);
    }

    /**
     * 返回和
     * @param arr
     */
    public static getSum(arr: number[]): number {
        let sum: number = 0;
        for (const value of arr) {
            sum += value;
        }
        return sum;
    }

    /**
     * 对数组进行洗牌
     * @param arr
     * @param shuffTime  洗牌次数,默认20
     */
    public static shuff<T>(arr: T[], shuffTime: number = 20): T[] {
        for (let i: number = 0; i < shuffTime; ++i) {
            arr.push(arr.splice(MathUtil.random(0, arr.length), 1)[0]);
        }
        return arr;
    }

    /**
     * 创建数字数组 [startIndx,endIndex)
     * @param startIndex
     * @param endIndex
     */
    public static createNumArr(startIndex: number, endIndex: number): number[] {
        const arr: number[] = [];
        for (let i: number = startIndex; i < endIndex; ++i) {
            arr.push(startIndex + i);
        }
        return arr;
    }

    /**
     * 生成[startIndex,endIndex)的数组,并进行洗牌shuffTime次
     * @param startIndex开始索引
     * @param endIndex结束索引
     * @param shuffTime洗牌次数
     */
    public static createValueAndShuff(startIndex: number, endIndex: number, shuffTime: number = 20): number[] {
        return ArrayUtil.shuff(ArrayUtil.createNumArr(startIndex, endIndex), shuffTime);
    }

}

