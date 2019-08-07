import { CryptBitArray } from './BitCryptDefine';


/**
 *  移动位数加密
 */
export class MoveBitCrypt implements CryptBitArray {
    constructor(public moveTime: number) { }
    public crypt(bitArr: number[], isEncrypt: boolean): void {
        if (isEncrypt) {// 加密
            for (let i: number = 0; i < this.moveTime; ++i) {
                bitArr.push(bitArr.shift());
            }
        } else {// 解密
            for (let i: number = 0; i < this.moveTime; ++i) {
                bitArr.unshift(bitArr.pop());
            }
        }
    }
}
