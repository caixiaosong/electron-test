export class ToStrUtil {

    /**
     *
     * @param obj
     * @param sp 默认",\n"
     */
    public static toStr(obj: object, sp = ',\n'): string {
        let finalStr: string = '';
        if (obj instanceof Array) {
            finalStr += '\nArray:\n[';
            // tslint:disable-next-line: forin
            for (const key in obj) {
                finalStr = finalStr + ToStrUtil.toStr(obj[key], ',');
            }
            finalStr = ToStrUtil.tryRemoveLastSp(finalStr, ',') + ']';

        } else if (typeof obj === 'object') {
            finalStr = ToStrUtil.objToStr(obj, sp);
        } else {
            finalStr += obj + sp;
        }

        return finalStr;
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
                const str: string = ToStrUtil.toStr(objValue, ',');
                ToStrUtil.tryRemoveLastSp(str, ',');
                finalStr += '\nArray:\n[' + str + ']\n';
            } else if (type === 'object') {
                finalStr += `${key}:\n{\n${ToStrUtil.tryRemoveLastSp(ToStrUtil.toStr(objValue), ',')}\n}`;
            } else {
                finalStr += key + ':' + objValue + sp;
            }
        }
        return finalStr;
    }
    /**
     * 尝试移除字符串最后的分隔符sp
     * @param str 字符串
     * @param sp 分隔符
     * @param isJustRemoveOne 是否只移除一个sp，否则移除全部结尾sp
     */
    public static tryRemoveLastSp(str: string, sp: string, isJustRemoveOne: boolean = false): string {
        str = str.trim();
        while (str.lastIndexOf(sp) === str.length - 1) {
            str = str.substring(0, str.length - 1);
            if (isJustRemoveOne) {
                break;
            }
        }
        return str;
    }
}
