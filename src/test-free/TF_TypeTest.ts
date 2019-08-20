import * as colors from "colors";
import { log } from "util";
import { TestFreeBase } from "./base/TestFreeBase";

export class TF_TypeTest extends TestFreeBase {


    public handle(): void {
        this.testTypeOf();
        this.testInstanceOf();
    }

    private testTypeOf(): void {

        console.log("testTypeOf begin:");
        console.log(`num:${this.typeOfValue(1)}`);
        console.log(`str:${this.typeOfValue("str")}`);
        console.log(`array:${this.typeOfValue([1, 2, 3])}`);
        console.log(`object:${this.typeOfValue({})}`);
        console.log(`function:${this.typeOfValue(this.run)}`);
        console.log(`class:${this.typeOfValue(TF_TypeTest)}`);
        console.log("testTypeOf end!");
    }

    private testInstanceOf(): void {

        console.log("testInstanceOf begin:");
        var num: any = 1;
        var str: any = "str";
        var arr: number[] = [1, 2, 3];
        log(`num instanceof Number:${num instanceof Number}`);

        console.log(colors.red(`num instanceof Number: ${num instanceof Number}`));
        console.log(colors.red(`str instanceof String: ${str instanceof String}`));

        console.log(`arr instanceof array: ${arr instanceof Array}`);
        console.log(`arr instanceof Object: ${arr instanceof Object}`);
        console.log(`new TF_TypeTest()) instanceof Object: ${(new TF_TypeTest()) instanceof Object} `);
        console.log(`new TF_TypeTest()) instanceof Function: ${(new TF_TypeTest()) instanceof Function} `);
        console.log(`new TF_TypeTest()) instanceof TF_TypeTest: ${(new TF_TypeTest()) instanceof TF_TypeTest} `);
        console.log("testInstanceOf end!")
    }

    private typeOfValue(value: any): string {
        return typeof value;
    }
}