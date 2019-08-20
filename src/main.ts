import * as Electron from 'electron';
import * as path from 'path';
import { IDispose, IRunable } from './common/ifaces/IComFaces';

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
            this.createWindow();

        });
    }



    public run(): void {
        this.initApp();
    }

    private createWindow() {
        if (this.mainWindow) {
            if (this.mainWindow.isMinimizable()) {
                this.mainWindow.restore();
                this.mainWindow.focus();
            }
            return;
        }

        const windowOptions: Electron.BrowserWindowConstructorOptions = this.getWindowOption();
        if (process.platform === 'linux') {
            windowOptions.icon = path.join(__dirname, 'assets/app-icon/png/512.png');
        }

        this.mainWindow = new Electron.BrowserWindow(windowOptions);
        const url: string = path.join(__dirname, '../index.html');
        this.mainWindow.loadURL(url);
        this.mainWindow.on('closed', () => {
            this.dispose();
        });

        this.makeSingleInstance();
        const option: Electron.MessageBoxOptions = {
            title: '弹窗标题',
            message: this.app.getAppPath() + '\r' + 'url:' + url + '\r' + __dirname
        };
        Electron.dialog.showMessageBox(this.mainWindow, option);
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
}

new Main().run();
