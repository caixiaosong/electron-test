import { ToStrUtil } from "../src/utils/format/ToStrUtil";
import { JsonReader } from "../src/utils/json/JsonReader";
import { TestFreeBase } from "../test-free/base/TestFreeBase";

export class TF_JsonReader extends TestFreeBase {

    public handle(): void {
        this.readJoson();
    }

    private readJoson(): void {
        var jsonReader: JsonReader = new JsonReader();
        jsonReader.loadDefaultConfig('start-config-test.json');
        console.log(ToStrUtil.toStr(jsonReader.getJson()).yellow);
    }
}