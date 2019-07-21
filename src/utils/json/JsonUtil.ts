import * as FS from "fs";

export class JsonUtil {

    /**
    * 读取指定路径的json文件并返回一个json的结构obj对象
    * @param configPath json路径
    */
    public static loadJsonConfig(configPath: string): any {
        var data: string = FS.readFileSync(configPath, { encoding: "utf8" });
        return JsonUtil.toNormalJsonObj(JSON.parse(data));
    }

    /**
     * 使用 如果destJson中的与beOverrideJson不同，则会采用destJson的覆盖beOverrideJson里面的内容
     * @param beOverrideJson javascript的对象
     * @param destJson javascript的对象
     */
    public static mergeJson(beOverrideJson: any, destJson: any): void {
        for (var key in destJson) {
            var value: any = destJson[key];
            var valType: string = typeof value;
            if (valType === "object") {
                if (beOverrideJson[key] == null) {
                    beOverrideJson[key] = value;//直接引用过去，而不是拷贝一份
                } else {
                    JsonUtil.mergeJson(beOverrideJson[key], value)
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
        var targetJson = {}
        for (var key in inputJson) {
            var keys: Array<string> = key.split(".");
            var tmpObj: any = targetJson
            for (var i: number = 0; i < keys.length; ++i) {
                var keyTmp: string = keys[i]
                if (i == keys.length - 1) {
                    JsonUtil.trySaveObj(tmpObj, keyTmp, inputJson[key]);
                } else {
                    tmpObj[keyTmp] = tmpObj[keyTmp] || {};
                    tmpObj = tmpObj[keyTmp];
                }
            }
        }
        return targetJson;
    }

    private static trySaveObj(destObj: object, key: string, value: string | Array<any> | object): void {
        const valType: string = typeof value;
        if (valType !== "object") {
            destObj[key] = value;
        } else {
            if (value instanceof Array) {
                destObj[key] = destObj[key] == null ? [] : destObj[key];
                var destArr: Array<any> = destObj[key];
                for (var keyTmp in value) {
                    var valTmp: any
                    if (typeof value[keyTmp] !== "object") {
                        valTmp = value[keyTmp];
                    } else {
                        valTmp = JsonUtil.toNormalJsonObj(value[keyTmp])
                    }
                    destArr.push(valTmp)
                }
            } else {
                destObj[key] = destObj[key] === null ?
                    JsonUtil.toNormalJsonObj(value) :
                    { ...destObj[key], ...JsonUtil.toNormalJsonObj(value) };
            }
        }
    }
}