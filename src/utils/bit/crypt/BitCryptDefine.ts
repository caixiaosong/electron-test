import { MoveBitCrypt } from "./MoveBitCrypt";

/**
* 位数据加解密接口
*/
export interface CryptBitArray {
    /**
     * 加密/解密
     * @param bitArr 要加密的位数据,需要转换成的位数组
     * @param isEncrypt 加密还是解密
     */
    crypt(bitArr: Array<number>, isEncrypt: boolean): void;
}

/**
  * 类加密类型定义,这里定义类型,
  */
export enum BitCryptType {
    None = 0,
    MOVE_BIT_1,
    MOVE_BIT_2,
    MOVE_BIT_3,
    MOVE_BIT_4,
    MOVE_BIT_5,
    MOVE_BIT_6,
    MOVE_BIT_7,
    MOVE_BIT_8,
    MOVE_BIT_9
}

export class BitCryptRegister {
    /**
     * 将加解密的类型定义和加解密的处理方法进行绑定,并注册到指定的加密配置中
     * @param cryptConfigArr 注册加密数组
     */
    public static regist(cryptConfigArr: Array<CryptBitArray>): void {
        cryptConfigArr[BitCryptType.None] = new MoveBitCrypt(0)
        cryptConfigArr[BitCryptType.MOVE_BIT_1] = new MoveBitCrypt(1)
        cryptConfigArr[BitCryptType.MOVE_BIT_2] = new MoveBitCrypt(2)
        cryptConfigArr[BitCryptType.MOVE_BIT_3] = new MoveBitCrypt(3)
        cryptConfigArr[BitCryptType.MOVE_BIT_4] = new MoveBitCrypt(4)
        cryptConfigArr[BitCryptType.MOVE_BIT_5] = new MoveBitCrypt(5)
        cryptConfigArr[BitCryptType.MOVE_BIT_6] = new MoveBitCrypt(6)
        cryptConfigArr[BitCryptType.MOVE_BIT_7] = new MoveBitCrypt(7)
        cryptConfigArr[BitCryptType.MOVE_BIT_8] = new MoveBitCrypt(8)
        cryptConfigArr[BitCryptType.MOVE_BIT_9] = new MoveBitCrypt(9)
    }
}









