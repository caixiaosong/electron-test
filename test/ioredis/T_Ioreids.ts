import * as RDS from "ioredis";
import { assert } from "chai";


describe("ioredis", function () {
    var redis;
    before(function () {
        redis = new RDS(6379, "127.0.0.1");
    })

    it("get num", function () {
        return redis.get("num").then(
            function (value: string) {
                assert.equal(value, "abc")
            }
        )
    })

})