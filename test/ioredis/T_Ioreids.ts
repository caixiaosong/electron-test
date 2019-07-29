import { assert } from 'chai';
import * as RDS from 'ioredis';


describe('ioredis', function () {
    let redis: RDS.Redis;
    before(function () {
        redis = new RDS(6379, '127.0.0.1');
    });

    it('get null num', async function () {
        try {
            const value = await redis.get('any_null_key');
            assert.equal(value, null);
        } catch (reson) {

        }
    });

});
