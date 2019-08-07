
import { BitUtil } from '../BitUtil';
import { MathUtil } from '../../math/MathUtil';
import { BitCryptType, CryptBitArray, BitCryptRegister } from './BitCryptDefine';



/**
 * 位加密管理,负责位加密/解密.
 * 添加加解密类型,
 */
export class BitCryptMgr {
    public static readonly INSTANCE: BitCryptMgr = new BitCryptMgr();
    private readonly CRYPT_MAP: CryptBitArray[] = new Array<CryptBitArray>();

    /**
     * 构造函数,注册所有加密类型
     */
    constructor() {
        BitCryptRegister.regist(this.CRYPT_MAP);
    }

    /**
     * 随机生成一个指定数量的加密类型数组.
     * @param needNum
     */
    public randCryptTypeArr(needNum: number): BitCryptType[] {
        const cryptTypeArr: BitCryptType[] = [];
        let cryptType: number;
        for (let i: number = 0; i < needNum; ++i) {
            // 依赖于BitCryptType.LENGTH的正确性
            cryptType = MathUtil.random(0, BitCryptMgr.INSTANCE.CRYPT_MAP.length);
            cryptTypeArr.push(cryptType);
        }
        return cryptTypeArr;
    }


    /**
     * 加解密,实例方法
     * @param value 加密的值
     * @param startIndex  开始索引
     * @param endIndex 结束索引
     * @param isEncrypt 加密还是解密
     * @param cryptType 加密类型
     */
    public cryptValue(value: number, startIndex: number, endIndex: number, isEncrypt: boolean, cryptType: BitCryptType): number {
        const bitArr: number[] = BitUtil.bitToArr(value, startIndex, endIndex); // 转换成数组模式
        this.CRYPT_MAP[cryptType].crypt(bitArr, isEncrypt); // 加解密
        const newValue: number = BitUtil.arrToBit(bitArr);
        // tslint:disable-next-line: no-bitwise
        return BitUtil.clearBitsByIndexs(value, startIndex, endIndex) | (newValue << startIndex);
    }

}
