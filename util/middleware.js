const Msg = require('./msg.js');

const require_param = (...params) => {
    return async (ctx, next) => {
        const body = ctx.request.body;
        for (let i of params) {
            if (body[i] === undefined) {
                return ctx.body = new Msg(-1, 'missing param');
            }
        }
        await next();
    };
};

module.exports = {
    require_param,
};
