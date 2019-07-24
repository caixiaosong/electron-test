import { assert } from "chai";
import * as RDS from "ioredis";


describe("ioredis", function () {
    var redis: RDS.Redis;
    before(function () {
        redis = new RDS(6379, "127.0.0.1");
    })

    it("get null num", function () {
        return redis.get("any_null_key").then(
            function (value: string) {
                assert.equal(value, null)
            }
        )
    })

})