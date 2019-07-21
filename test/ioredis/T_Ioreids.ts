import * as RDS from "ioredis";
import { finished } from "stream";

describe("ioredis", function () {
    var redis = new RDS();
    redis.disconnect();
    redis.connect().then(
        function (result) {
            console.log("connect" + result)
            describe("ioredis is connect", function () {
                redis.get("num").then(
                    function (value) {
                        chai.assert.equal(value, "abc")
                    }
                )
            })
        }
    );


})