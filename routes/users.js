const router = require('koa-router')()

const db = require('../db/db.js');
const Msg = require('../util/msg.js');
const middleware = require('../util/middleware.js');
const pool = require('../db/init.js');

// router.prefix('/users')

router.post('/register', 
    middleware.require_param('username', 'password'),
    async (ctx, next) => {
        const {username, password} = ctx.request.body;
        try {
            let res = await db.query_escape(`select * from user where username = ?`, [username]);
            if (res.length !== 0)
                throw 'username already exists';
            res = await db.query_escape(`insert into user (username, password) values (?, ?)`, [username, password]);
            ctx.body = new Msg(0, 'success');
        }
        catch (e) {
            ctx.body = new Msg(-1, e);
        }
        await next();
    });

module.exports = router
