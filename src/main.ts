import * as IORedis from 'ioredis';
import { IRunable } from './common/ifaces/IComFaces';
import { ElectronMain } from './ElectronMain';
class Main implements IRunable {
    public run(): void {
        new ElectronMain().run();
    }
}

new Main().run();
