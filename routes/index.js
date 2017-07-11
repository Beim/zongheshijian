const router = require('koa-router')()

const middleware = require('../util/middleware.js');
const db = require('../db/db.js');
const Msg = require('../util/msg.js');

router.post('/post', 
    middleware.require_param('username', 'password', 'data'),
    async (ctx, next) => {
        const {username, password, data} = ctx.request.body;
        try {
            // 判断用户是否存在
            let res = await db.query_escape(`select * from user where username = ?`, [username]);
            // 不存在则新建
            if (res.length === 0) {
                await db.query_escape(`insert into user (username, password) values (?, ?)`, [username, password]);
            }
            res = await db.query_escape(`select id from user where username = ? and password = ?`, 
                [username, password]);
            if (res.length === 0) 
                throw 'username or password error';
            const userId = res[0].id;
            res = await db.query_escape(`insert into resource (userId, data) values (?, ?) on duplicate key update data=?`,
                [userId, data, data]);
            ctx.body = new Msg(0, 'success');
        }
        catch (e) {
            ctx.body = new Msg(-1, e);
        }
        await next();
    });

router.post('/pull',
    middleware.require_param('username', 'password'),
    async (ctx, next) => {
        const {username, password} = ctx.request.body;
        try {
            let res = await db.query_escape(`select id from user where username = ? and password = ?`,
                [username, password]);
            if (res.length === 0) 
                throw 'username or password error';
            const userId = res[0].id;
            res = await db.query_escape(`select data from resource where userId = ?`, [userId]);
            ctx.body = new Msg(0, 'success', res[0].data);
        }
        catch (e) {
            ctx.body = new Msg(-1, e);
        }
        await next();
    });

module.exports = router
