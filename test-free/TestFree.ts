import { IRunable } from "../src/common/ifaces/IComFaces";
import { TF_TypeTest } from "./TF_TypeTest";
import { TF_JsonReader } from "./TF_JsonReader";

/**
 * 用于自定义测试的入口了。不同于mocha的自动测试，这边希望的是基于vscode可以断点的测试。
 */
class TestFree implements IRunable {

    public run() {
        console.log("welcome to test free");
        new TF_TypeTest().run(false);
        new TF_JsonReader().run(true);

        console.log(new TestFree().convertStrVersion("12399-23-4-9"));
    }


    private convertStrVersion(v: string) {
        let a = v.match(/\d+/g)
        return a.map(i => parseInt(i))
    }
}

new TestFree().run();


