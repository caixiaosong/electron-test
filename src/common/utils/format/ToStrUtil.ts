export class ToStrUtil {
    private static readonly NORMAL_TYPES: string[] = [
        'number', 'string'
    ];
    /**
     *
     * @param obj
     * @param sp 默认",\n"
     */
    public static toStr(obj: object, sp = ',\n'): string {
        let finalStr: string = '';
        if (obj instanceof Array) {
            finalStr = finalStr + ToStrUtil.arrToStr(obj) + sp;
        } else if (typeof obj === 'object') {
            finalStr = ToStrUtil.objToStr(obj, sp) + sp;
        } else {
            finalStr += obj + sp;
        }

        return ToStrUtil.tryRemoveLastSp(finalStr, sp);
    }

    /**
     * 确定 obj的类型是object 可以直接使用这个,不然还是使用toStr
     * @param obj
     * @param sp
     */
    public static objToStr(obj: object, sp = ',\n'): string {
        let finalStr: string = '';
        // tslint:disable-next-line: forin
        for (const key in obj) {
            const objValue = obj[key];
            const type: string = typeof objValue;
            if (objValue instanceof Array) {
                finalStr = finalStr + ToStrUtil.arrToStr(objValue) + sp;
            } else if (type === 'object') {
                finalStr += `${key}:\n{\n${ToStrUtil.tryRemoveLastSp(ToStrUtil.toStr(objValue), ',')}\n}` + sp;
            } else {
                finalStr += key + ':' + objValue + sp;
            }
        }
        return ToStrUtil.tryRemoveLastSp(finalStr, sp);
    }

    public static arrToStr(arr: any[], sp: string = ','): string {
        let str: string = 'Array:\n[';
        for (const value of arr) {
            const valueType: string = typeof value;
            if (ToStrUtil.isNormalType(value)) {
                str = str + value + sp;
            } else if (valueType === 'function') {
                str = str + 'function:' + value + sp;
            } else if (value instanceof Array) {
                str = str + ToStrUtil.arrToStr(value) + sp;
            } else if (value instanceof Object) {
                str = str + ToStrUtil.objToStr(value) + sp;
            }
        }
        // 移除最后的，
        str = ToStrUtil.tryRemoveLastSp(str, sp) + ']';
        return str;
    }


    /**
     * 是否是常规类型，具体参考：NORMAL_TYPES配置
     * @param value 传入的值
     */
    public static isNormalType(value: any): boolean {
        const valueType: string = typeof value;
        return ToStrUtil.NORMAL_TYPES.indexOf(valueType) >= 0;
    }

    /**
     * 尝试移除字符串最后的分隔符sp
     * @param str 字符串
     * @param sp 分隔符
     * @param isJustRemoveOne 是否只移除一个sp，否则移除全部结尾sp
     */
    public static tryRemoveLastSp(str: string, sp: string, isJustRemoveOne: boolean = true): string {
        let lastPos: number = str.length - sp.length;
        while (str.lastIndexOf(sp) === lastPos) {
            str = str.substring(0, lastPos);
            if (isJustRemoveOne) {
                break;
            }
            lastPos = str.length - sp.length;
        }
        return str;
    }

}


