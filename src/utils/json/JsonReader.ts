import * as FS from 'fs';
import { JsonUtil } from './JsonUtil';
export class JsonBootReader {
    private jsonConfigPath: string;
    private jsonObj: any = null;

    public constructor() {

    }

    /**
     * 同步加载方式加载默认配置，
     * @param jsonConfigPath
     */
    public loadDefaultConfig(jsonConfigPath: string = 'start-config.json'): JsonBootReader {
        this.jsonConfigPath = jsonConfigPath;
        const data: string = FS.readFileSync(this.jsonConfigPath, { encoding: 'utf8' });
        this.jsonObj = JsonUtil.toNormalJsonObj(JSON.parse(data));
        return this;
    }

    /**
     *  如果没有初始化过，则会调用进行初始化，负责合并两个json,这个用于自定义配置
     * @param jsonConfigPath 玩家自定义配置路径
     */
    public mergeJson(jsonConfigPath: string): void {
        if (this.jsonConfigPath == null || this.jsonObj == null) {
            this.loadDefaultConfig(jsonConfigPath);
            return;
        }
        try {
            const jsonObjTmp: any = JsonUtil.loadJsonConfig(jsonConfigPath);
            JsonUtil.mergeJson(this.jsonObj, jsonObjTmp);
        } catch (e) {

        }
    }

    /**
     * json 的javascriptd对象
     */
    public getJson(): any {
        return this.jsonObj;
    }

}
