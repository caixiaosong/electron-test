import * as FS from 'fs';

export class JsonUtil {


    /**
     * 读取指定路径的json文件并返回一个json的结构obj对象
     * @param configPath configPath json路径
     */
    public static loadJsonConfig(configPath: string): any {
        const data: string = FS.readFileSync(configPath, { encoding: 'utf8' });
        return JsonUtil.toNormalJsonObj(JSON.parse(data));
    }

    /**
     * 使用 如果destJson中的与beOverrideJson不同，则会采用destJson的覆盖beOverrideJson里面的内容
     * @param beOverrideJson javascript的对象
     * @param destJson javascript的对象
     */
    public static mergeJson(beOverrideJson: any, destJson: any): void {
        // tslint:disable-next-line: forin
        for (const key in destJson) {
            const value: any = destJson[key];
            const valueType: string = typeof value;
            if (valueType === 'object') {
                if (beOverrideJson[key] === null) {
                    beOverrideJson[key] = value; // 直接引用过去，而不是拷贝一份
                } else {
                    JsonUtil.mergeJson(beOverrideJson[key], value);
                }
            } else {
                if (destJson[key] !== beOverrideJson[key]) {
                    beOverrideJson[key] = destJson[key];
                }
            }
        }
    }


    /**
     * 将平面化的json对象解析成javascript对象
     * @param inputJson 这是一个key以.分割的平面化json对象
     * 原来：{reids.host = "127.0.0.1"}
     * 解析：{redis:{host:"127.0.0.1"}}
     */
    public static toNormalJsonObj(inputJson: any): any {
        const targetJson = {};
        // tslint:disable-next-line: forin
        for (const key in inputJson) {
            const keys: string[] = key.split('.');
            let tmpObj: any = targetJson;
            for (let i: number = 0; i < keys.length; ++i) {
                const keyTmp: string = keys[i];
                if (i === keys.length - 1) {
                    JsonUtil.trySaveObj(tmpObj, keyTmp, inputJson[key]);
                } else {
                    tmpObj[keyTmp] = tmpObj[keyTmp] || {};
                    tmpObj = tmpObj[keyTmp];
                }
            }
        }
        return targetJson;
    }

    private static trySaveObj(destObj: object, key: string, value: string | any[] | object): void {
        const valType: string = typeof value;
        if (valType !== 'object') {
            destObj[key] = value;
        } else {
            if (value instanceof Array) {
                destObj[key] = destObj[key] == null ? [] : destObj[key];
                const destArr: any[] = destObj[key];
                // tslint:disable-next-line: forin
                for (const keyTmp in value) {
                    let valTmp: any;
                    if (typeof value[keyTmp] !== 'object') {
                        valTmp = value[keyTmp];
                    } else {
                        valTmp = JsonUtil.toNormalJsonObj(value[keyTmp]);
                    }
                    destArr.push(valTmp);
                }
            } else {
                destObj[key] = destObj[key] === null ?
                    JsonUtil.toNormalJsonObj(value) :
                    { ...destObj[key], ...JsonUtil.toNormalJsonObj(value) };
            }
        }
    }
}
