module.exports = function () {
    /*  Create a 8 byte unique id made by:
        4 byte seconds since Unix time
        2 byte pid
        2 byte random value
        */
    var date = (((Date.now() / 1000) & 0xffffffff) >>> 0).toString(16);
    var pid = (process.pid & 0xffff).toString(16);
    var random = (Math.floor(Math.random() * 0x10000)).toString(16);
    return ("00000000" + date).substr(-8) +
        ("0000" + pid).substr(-4) +
        ("0000" + random).substr(-4);
}
