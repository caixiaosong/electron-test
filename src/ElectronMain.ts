import * as Electron from 'electron';
import { IRunable } from './common/ifaces/IComFaces';

export class ElectronMain implements IRunable {
    private app: Electron.App;

    constructor() {
        this.app = Electron.app;
    }

    public run(): void {

    }
}






