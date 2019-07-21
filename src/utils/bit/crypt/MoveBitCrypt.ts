import { CryptBitArray } from "./BitCryptDefine";


/**
 *  移动位数加密
 */
export class MoveBitCrypt implements CryptBitArray {
    constructor(public moveTime: number) { }
    public crypt(bitArr: Array<number>, isEncrypt: boolean): void {
        if (isEncrypt) {//加密
            for (var i: number = 0; i < this.moveTime; ++i) {
                bitArr.push(bitArr.shift())
            }
        } else {//解密
            for (var i: number = 0; i < this.moveTime; ++i) {
                bitArr.unshift(bitArr.pop())
            }
        }
    }
}