class Msg {
    constructor(ok, msg, data = null) {
        this.ok = ok;
        this.msg = msg;
        this.data = data;
    }
}

module.exports = Msg;
