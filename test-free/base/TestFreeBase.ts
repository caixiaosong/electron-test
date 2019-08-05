import { ITestFreeBase } from "./ITestFreeBase";
import * as colors from "colors";


export class TestFreeBase implements ITestFreeBase {
    public handle() {
        throw new Error("Method not implemented.");
    }

    public run(isRun: boolean) {
        if (!isRun) {
            return;
        }
        console.log(colors.green(this.constructor.name + " begin:"));
        this.handle();
        console.log(colors.green(this.constructor.name + " end! \n"));
    }
}