
import { BitUtil } from './BitUtil';
import { BitCryptMgr } from './crypt/BitCryptMgr';
import { BitCryptType } from './crypt/BitCryptDefine';
/**
 * 业务类:位工具
 * 逻辑位，部分功能只适合正数，比如压缩位,加密,
 * 如果指定加密,但是没有指定加密的方式,则对每个分割为采用的是随机的,
 * 最终只有这个实例知道自己的机密方式,外部是不知道的
 */
export class BitState {
    private valueEncrypt: number = 0;
    // tslint:disable-next-line: variable-name
    private _isEncrypt: boolean = false;

    /**
     * @param value  初始化值
     * @param isEncrypt  是否采用加密，默认false
     * @param zipBitNum  每个数字占用多少位，建议是BitUtil.MAX_BIT_FOR_NUM的因子（能被BitUtil.MAX_BIT_FOR_NUM整除,不然个数就太少了）
     * @param cryptTypeArr  异或逻辑
     * @param useBitNum 最大BitUtil.MAX_BIT_FOR_NUM，建议不要修改
     */
    public constructor(value: number = 0, isEncrypt: boolean = false, public zipBitNum: number = BitUtil.MAX_BIT_FOR_NUM, public cryptTypeArr: BitCryptType[] = null, public useBitNum = BitUtil.MAX_BIT_FOR_NUM) {
        this.reset(value, isEncrypt, zipBitNum, cryptTypeArr);
    }

    /**
     * @param value  初始化值
     * @param isEncrypt  是否采用加密，默认false
     * @param zipBitNum  每个数字占用多少位，建议是BitUtil.MAX_BIT_FOR_NUM的因子（能被BitUtil.MAX_BIT_FOR_NUM整除,不然个数就太少了）
     * @param cryptTypeArr  异或逻辑
     * @param useBitNum 最大BitUtil.MAX_BIT_FOR_NUM，建议不要修改
     */
    public reset(value?: number, isEncrypt?: boolean, zipBitNum?: number, cryptTypeArr?: BitCryptType[]): BitState {
        // 暂存解析结果，避免配置更新后污染了旧值,必须最先
        const oldValue: number = this.value;

        // 配置更新
        if (isEncrypt != null) {
            this._isEncrypt = isEncrypt; // 直接设置数据，绕过setter
        }
        if (zipBitNum != null) {
            this.zipBitNum = zipBitNum;
        }
        if (cryptTypeArr != null) {
            this.cryptTypeArr = cryptTypeArr;
        }
        if (this.cryptTypeArr == null) {// 没有指定加密数组,则采用随机的
            this.cryptTypeArr = BitCryptMgr.INSTANCE.randCryptTypeArr(Math.ceil(BitUtil.MAX_BIT_FOR_NUM / zipBitNum));
        }

        // 根据更新的配置重新，必须最后，确保配置最新
        this.value = value != null ? value : oldValue; // 根据是否加密重新解析数据
        return this;
    }

    public isBitSet(index: number): boolean {
        return BitUtil.isBitSet(this.value, index);
    }

    public setBit(index: number): BitState {
        this.value = BitUtil.setBit(this.value, index);
        return this;
    }

    public setBits(index: number, num: number): BitState {
        this.value = BitUtil.setBits(this.value, index, num);
        return this;
    }

    public clearBit(index: number): BitState {
        this.value = BitUtil.clearBit(this.value, index);
        return this;
    }


    /**
     * 批量清除位，
     * @param startIndex  开始的位数
     * @param clearNum 清除的数量
     */
    public clearBitsByNum(startIndex: number, clearNum: number): BitState {
        this.value = BitUtil.clearBitsByNum(this.value, startIndex, clearNum);
        return this;
    }

    public clearBitsByIndexs(startIndex: number, endIndex: number = BitUtil.MAX_BIT_FOR_NUM): BitState {
        this.value = BitUtil.clearBitsByIndexs(this.value, startIndex, endIndex);
        return this;
    }

    public getBitCount(startIndex: number = 0, endIndex: number = BitUtil.MAX_BIT_FOR_NUM): number {
        return BitUtil.getBitCount(this.value, startIndex, endIndex);
    }

    /**
     * @param newValue 非负数
     * @param index
     */
    public zipBit(newValue: number, index: number): BitState {
        this.value = BitUtil.zipBit(this.value, newValue, index, this.zipBitNum);
        return this;
    }

    public unZipBit(index: number): number {
        return BitUtil.unZipBit(this.value, index, this.zipBitNum);
    }


    /**
     * 只读属性，不应该提供setter 因为如果是中途修改了这个标志位
     */
    public get isEncrypt() {
        return this._isEncrypt;
    }

    public set isEncrypt(isEncrypet: boolean) {
        if (isEncrypet === this.isEncrypt) {// 已经开启加密就不再重复了，因为需要进行一次操作 ：解密->isEncrypet->加密
            return;
        }

        this.valueEncrypt = this.value; // 重新赋值成解密后的
        this._isEncrypt = isEncrypet;
        this.value = this.valueEncrypt; // 如果有开启加密则进行加密
    }

    /**
     * 解密后的值
     */
    public get value() {
        return this.decrypt();
    }

    /**
     * 如果加密的话，保存的是加密后的值
     */
    public set value(value: number) {
        this.valueEncrypt = value;
        if (this._isEncrypt) {
            this.valueEncrypt = this.encrypt();
        }
    }

    public get valueEncrpt(): number {
        return this.valueEncrypt;
    }

    /**
     * 加密，使用cryptTypeArr进行加密
     */
    private encrypt(): number {
        return this.cryptCode(true);
    }

    /**
     * 解密
     */
    private decrypt(): number {
        return this.cryptCode(false);
    }

    /**
     * 加解密代码
     * @param isEncrypt  是加密吗？否则是解密
     */
    private cryptCode(isEncrypt: boolean): number {
        let value: number = this.valueEncrypt; // 原生数据
        if (!this._isEncrypt || this.cryptTypeArr == null) {// 没有字段加密逻辑
            return value;
        }

        const splitNum: number = BitUtil.MAX_BIT_FOR_NUM / this.zipBitNum;
        const bitOne: number = BitUtil.createBitSetValue(this.zipBitNum, 0);
        let splitValue: number;

        for (let i: number = 0; i < splitNum; ++i) {
            // tslint:disable-next-line: no-bitwise
            splitValue = value & bitOne;
            if (i < this.cryptTypeArr.length && this.cryptTypeArr[i] != 0) {
                // tslint:disable-next-line: no-bitwise
                splitValue = BitCryptMgr.INSTANCE.cryptValue(splitValue, this.zipBitNum * i, this.zipBitNum * (i + 1), isEncrypt, this.cryptTypeArr[i]) << (i * this.zipBitNum);
                // tslint:disable-next-line: no-bitwise
                value = (value & ~bitOne) | splitValue; // (清除数据)|合并数据
            }
            bitOne << this.zipBitNum;
        }
        return value;
    }

}
