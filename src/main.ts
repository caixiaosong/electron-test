import * as IORedis from "ioredis"
class Main {
    public run(): void {
        console.log("main is runing !");
        this.onTestIORedis();
    }

    private onTestIORedis() {

        var redis = new IORedis()
        redis.get('num', function (err, res) {
            console.log(err + ":" + res);
        })
    }
}

new Main().run();