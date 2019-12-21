Java.perform(function() {
    var WSUtils = Java.use("com.hengye.share.util.WSUtils");
    WSUtils["O000000o"].overload('java.lang.String').implementation = function(str) {
        console.log("参数1:", str);
        var retval = this.O000000o(str);
        console.log("返回值:", retval);
        return retval;
    }
});
