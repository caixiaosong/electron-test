import * as Electron from 'electron';
import * as ElectronStore from 'electron-store';
import * as path from 'path';
import { IDispose, IRunable } from './src/common/ifaces/IComFaces';

class Main implements IRunable, IDispose {
    private app: Electron.App;
    private mainWindow: Electron.BrowserWindow;

    constructor() {

    }

    public dispose(): void {
        this.app = null;
        this.mainWindow = null;
    }

    private initApp(): void {
        this.app = Electron.app;
        this.app.on('ready', () => {
            this.createWindow();
        });

        this.app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                this.app.quit();
            }
        });

        this.app.on('activate', () => {
            if (this.mainWindow === null) {
                this.createWindow();
            }
        });
    }

    public run(): void {
        this.initApp();
    }

    private createWindow() {
        const windowOptions: Electron.BrowserWindowConstructorOptions = this.getWindowOption();
        if (process.platform === 'linux') {
            windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png');
        }

        this.mainWindow = new Electron.BrowserWindow(windowOptions);
        this.mainWindow.loadURL(path.join('file://', __dirname, '/index.html'));
        this.mainWindow.on('closed', () => {
            this.dispose();
        });

        this.makeSingleInstance();
        this.testElectronStore();
    }

    /**
     * 创建主窗口参数
     */
    private getWindowOption(): Electron.BrowserWindowConstructorOptions {
        const windowOptions: Electron.BrowserWindowConstructorOptions = {
            width: 1080,
            minWidth: 680,
            height: 840,
            title: '标题',
            webPreferences: {
                nodeIntegration: true
            }
        };
        return windowOptions;
    }

    /**
     * 单例设计模式
     */
    private makeSingleInstance() {
        if (process.mas) {
            return;
        }
        this.app.requestSingleInstanceLock();
        this.app.on('second-instance', () => {
            if (this.mainWindow && this.mainWindow.isMinimizable()) {
                this.mainWindow.restore();
                this.mainWindow.focus();
            }
        });
    }

    private testElectronStore(): void {
        // 测试ElctronStore
        const testKey: string = 'testValue';
        const store = new ElectronStore({});
        const value: number = store.get(testKey, 0) as number;
        store.set(testKey, value + 1);

        const option: Electron.MessageBoxOptions = {
            title: '弹窗标题',
            message: '弹窗信息:' + value
        };
        Electron.dialog.showMessageBox(this.mainWindow, option);
    }
}

new Main().run();

