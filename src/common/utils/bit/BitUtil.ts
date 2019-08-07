
/**
 * 工具类:位工具
 */
export class BitUtil {


    /**
     * 数字最多位数
     */
    public static readonly MAX_BIT_FOR_NUM: number = 32;

    /**
     * 查询指定位是否是1
     * @param bitState
     * @param index
     */
    public static isBitSet(bitState: number, index: number): boolean {
        return (bitState & (1 << index)) !== 0;
    }

    /**
     * 设置指定位为1
     * @param bitState
     * @param index
     */
    public static setBit(bitState: number, index: number): number {
        return bitState | (1 << index);
    }

    public static setBits(bitState: number, index: number, num: number): number {
        const bitOne: number = BitUtil.createBitSetValue(num, index);
        return bitState | bitOne;
    }

    /**
     * 清除位标志
     * @param bitState
     * @param index
     */
    public static clearBit(bitState: number, index: number): number {
        return bitState & (~(1 << index));
    }

    /**
     * 清除 startIndex后面的指定位数
     * @param bitState
     * @param startIndex
     * @param clearNum 支持负数 ，0的话直接返回了
     */
    public static clearBitsByNum(bitState: number, startIndex: number, clearNum: number): number {
        if (clearNum === 0) {
            return bitState;
        }
        // 防止倒叙
        const tmp: number = startIndex;
        let endIndex: number = startIndex + clearNum;
        startIndex = Math.min(startIndex, endIndex);
        endIndex = Math.max(tmp, endIndex);
        // 防止越界
        startIndex = Math.max(0, startIndex);
        endIndex = Math.min(endIndex, BitUtil.MAX_BIT_FOR_NUM);
        return BitUtil.clearBitsByIndexs(bitState, startIndex, endIndex);
    }

    /**
     * 批量清除位,按照索引去清除的
     * @param bitState
     * @param startIndex
     * @param endIndex  一般endIndex必须大于startInex ，如果endIndex == startIndex直接返回
     */
    public static clearBitsByIndexs(bitState: number, startIndex: number, endIndex: number = BitUtil.MAX_BIT_FOR_NUM): number {
        if (endIndex < startIndex) {
            throw new Error(`endIndex ， startIndex:${endIndex}<${startIndex}`);
        } else if (startIndex === endIndex) {
            return bitState;
        }
        const bitNum: number = endIndex - startIndex;
        const bitOneValue: number = BitUtil.createBitSetValue(bitNum, startIndex);
        return bitState & (~bitOneValue);
    }

    /**
     * @param bitState
     * @param startIndex
     * @param endIndex 默认32
     */
    public static getBitCount(bitState: number, startIndex: number = 0, endIndex: number = BitUtil.MAX_BIT_FOR_NUM): number {
        let bitNum: number = 0;
        for (let i: number = startIndex; i < endIndex; ++i) {
            if (BitUtil.isBitSet(bitState, i)) {
                ++bitNum;
            }
        }
        return bitNum;
    }

    /**
     *
     * 将新值value，压缩后存放到bitState中
     * @param bitState 源来的数值
     * @param value 要压缩的值
     * @param index 要放入的下标
     * @param zipBitNum 每个value占用多少位
     * 例子，
     * zipBit( 0 , 1 , 1, 4)
     * zipBitNum 4
     * bitState 0000 0000 0000 0000
     * value    0000 0000 0000 0001
     * index    3    2    1    0
     * final    0000 0000 0001 0000
     */
    public static zipBit(bitState: number, value: number, index: number, zipBitNum: number): number {
        value = value << (index * zipBitNum);
        return bitState | value;
    }

    /**
     *
     * @param bitState 源数据
     * @param index 解压缩的开始索引(第几个数)，用于计算偏移 offset = index * zipBitNum
     * @param zipBitNum 数字占据了多少位
     */
    public static unZipBit(bitState: number, index: number, zipBitNum: number): number {
        const offset: number = index * zipBitNum;
        const bitOneValue: number = BitUtil.createBitSetValue(zipBitNum, offset);
        return (bitState & bitOneValue) >> offset;
    }

    /**
     *  将bitState [startIndex,endIndex)的位转换成数组1,0模式
     * @param bitState
     * @param startIndex
     * @param endIndex
     */
    public static bitToArr(bitState: number, startIndex: number = 0, endIndex: number = 64): number[] {
        const bitArr: number[] = [];
        for (let i: number = startIndex; i < endIndex; ++i) {
            bitArr.push(BitUtil.isBitSet(bitState, i) ? 1 : 0);
        }
        return bitArr;
    }

    /**
     * 将数组转换成按位模式，注意最多不能超过number的位数
     * @param arr
     * @param startIndex
     * @param endIndex
     */
    public static arrToBit(arr: number[], startIndex: number = 0, endIndex: number = BitUtil.MAX_BIT_FOR_NUM): number {
        let value: number = 0;
        // 防御编程
        if (arr == null) {// 防空
            return value;
        }
        endIndex = Math.min(arr.length, endIndex); // 防越界

        for (let i: number = startIndex; i < endIndex; ++i) {
            if (arr[i] !== 0) {
                value = BitUtil.setBit(value, i);
            }
        }
        return value;
    }

    /**
     * 从offset开始，创建连续bitSetNum个1
     * @param bitSetNum  设置1的数量
     * @param offset 设置1的偏移 offset > 0
     * 例子
     * createBitSetValue(1 ,0) =>0000 0000 0000 0001;
     * createBitSetValue(1 ,1) =>0000 0000 0000 0010;
     * createBitSetValue(2 ,1) =>0000 0000 0000 0110;
     */
    public static createBitSetValue(bitSetNum: number, offset: number = 0): number {
        let value: number = 0;
        for (let i: number = 0; i < bitSetNum; ++i) {
            value = BitUtil.setBit(value, i + offset);
        }
        return value;
    }
}
