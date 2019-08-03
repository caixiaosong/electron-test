import { assert } from 'chai';
import * as RDS from 'ioredis';


/**
 * edis 测试的需要开启redis后才能进行测试，所以这里采用skip过滤掉mocha的测试
 */

describe.skip('ioredis', function () {
    let redis: RDS.Redis = null;
    before(function () {
        redis = new RDS(6379, '127.0.0.1');
    });

    after(function () {
        if (redis !== null) {
            redis.disconnect();
        }
        redis = null;
    });


    it('get null num', async function () {
        try {
            const value = await redis.get('any_null_key');
            assert.equal(value, null);
        } catch (reson) {
            this.skip();
        }
    });

});


