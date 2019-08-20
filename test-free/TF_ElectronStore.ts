import { TestFreeBase } from './base/TestFreeBase';
import * as ElectronStore from 'electron-store';
import * as Electron from 'electron';



export class TF_ElectronStore extends TestFreeBase {
    private store: ElectronStore<{}>;

    public handle(): void {
        this.testValue();
    }

    private testValue(): void {


        const testKey: string = 'testValue';
        this.store = new ElectronStore({})
        var value: number = this.store.get(testKey, 0) as number;
        console.log(`${value}`.red);
        this.store.set(testKey, value + 1);
    }
}