
export interface ITestFreeBase {

    /**
     * 重写处理自己的逻辑
     */
    handle(): void;

    /**
     * 根据isRun决定是否调用handle和一些必要的操作
     * @param isRun 是否运行
     */
    run(isRun: boolean): void;
}