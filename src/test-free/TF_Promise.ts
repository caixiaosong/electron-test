import { TestFreeBase } from './base/TestFreeBase';
export class TF_PromiseTest extends TestFreeBase {

    public handle() {
        this.testPromiseExeOrder();
    }

    /**
     * 测试Promise的执行顺序：1定义，2当前脚本所有同步任务执行完才会执行，3then
     */
    private testPromiseExeOrder(): void {
        console.log("promise0 一旦调用就会执行");

        const promise0: Promise<Object> = new Promise(
            function (resolve0: Function, reject0: Function) {
                console.log("promise0 start");
                resolve0("promise0");
                console.log("promise0 end");
            }
        );
        console.log("执行完所有脚本后才会调用then, 代码位置在then前");
        promise0.then(function (value: any) {
            console.log(value + " then");
        });

        console.log("执行完所有脚本后才会调用then, 代码位置在then后");
    }

}