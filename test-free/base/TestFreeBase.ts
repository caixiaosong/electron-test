import { ITestFreeBase } from "./ITestFreeBase";
import * as colors from "colors";


/**
 *  public handle(): void 
 * 重写handle方法实现子类的逻辑
 */

export class TestFreeBase implements ITestFreeBase {

    public handle(): void {
        throw new Error("Method not implemented.");
    }

    public run(isRun: boolean): void {
        if (!isRun) {
            return;
        }
        console.log(colors.green(this.constructor.name + " begin:"));
        this.handle();
        console.log(colors.green(this.constructor.name + " end! \n"));
    }
}