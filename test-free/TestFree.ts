import { IRunable } from "../src/ifaces/IComFaces";

/**
 * 用于自定义测试的入口了。不同于mocha的自动测试，这边希望的是基于vscode可以断点的测试。
 */
class TestFree implements IRunable {

    public run() {
        console.log("welcome to test free");
    }

}

new TestFree().run();


