
var lib = "libwbutil.so"

var env;
Java.perform(function(){
    env = Java.vm.getEnv();
})


// getOriginalString
Interceptor.attach(ptr("0xd1213639"), {
    onEnter: function(args) {
        // console.log("param 3:", s2c(args[2]));
    },
    onLeave: function(retval) {
        console.log(s2c(retval));
    }
});


// sha512
Interceptor.attach(ptr("0xd4c06535"), {
    onEnter: function(args) {
        console.log("param 3:", s2c(args[2]));
    },
    onLeave: function(retval) {
        console.log(s2c(retval));
    }
});


function s2c(sa) {
    var promt;
    Java.perform(function() {
        var String = Java.use("java.lang.String");
        promt = Java.cast(ptr(sa), String);
    });
    return promt;
}


//////////////////
//5l0WXnhiY4pJ794KIJ7Rw5F45VXg9sjo
key1 = "5l0WXnhiY4pJ794KIJ7Rw5F45VXg9sjo5715174600109C095010"
key2 = "109C095010"



key1 = "5l0WXnhiY4pJ794KIJ7Rw5F45VXg9sjozckund@163.comzlz403620109C095010"
key2 = "109C095010"
key1 = "5l0WXnhiY4pJ794KIJ7Rw5F45VXg9sjo7358619194109C095010"
key2 = "109C095010"


//5l0WXnhiY4pJ794KIJ7Rw5F45VXg9sjo 7358619194 109C095010

var com = 0x0;
var fs = Module.enumerateExportsSync(lib);
for (var i = 0; i < fs.length; i++) {
    if (fs[i].name.indexOf("app_setPin") != -1) {
        com = fs[i].address;
        break;
    }
}

// app_setPin
Interceptor.attach(Module.findExportByName("libwbutil.so", "app_setPin"), {
    onEnter: function(args) {
        console.log("app_setPin(\"" + s2c(args[1]) + "\")");
    }
});



//mbedtls_decode
Interceptor.attach(Module.findExportByName("libwbutil.so", "mbedtls_decode"), {
    onEnter: function(args) {
        console.log('\n');
        
    },
    onLeave: function(retval) {
        // console.warn("retval: ", retval);
    }
});

//mbedtls_des_crypt_ecb
Interceptor.attach(Module.findExportByName("libwbutil.so", "mbedtls_des_crypt_ecb"), {
        onEnter: function(args) {
            console.log("\n")
            console.warn("mbedtls_des_crypt_ecb(".concat(args[0]) 
                        + ",".concat(args[1])
                        + ",".concat(args[2]).concat(")"));
        }
});

//mbedtls_des_setkey_dec
Interceptor.attach(Module.findExportByName("libwbutil.so", "mbedtls_des_setkey_dec"), {
    onEnter: function(args) {
        console.log("\n")
        console.warn("mbedtls_des_setkey_dec(".concat(args[0]) 
                    + ", ".concat(args[1]).concat(")"));
    }
});



// sub_4142 获取des 解密 key
var base = Module.getBaseAddress("libwbutil.so");
Interceptor.attach(ptr(base.add(0x4124+1)), {
    onEnter: function(args) {

    },
    onLeave: function(retval) {
        console.log('\n');
        sh(retval, 64);
    }
});


// show hexdump
function sh(a, s){console.error(hexdump(ptr(String(a)),{offset:0,length:s,header:true,ansi:false}))}
// jstring to string
function s2c(r){var n;return Java.perform(function(){var a=Java.use("java.lang.String");n=Java.cast(ptr(r),a)}),n}
// sha512
for(var com=0,fs=Module.enumerateExportsSync(lib),i=0;i<fs.length;i++)if(-1!=fs[i].name.indexOf("sha512")){com=fs[i].address;break}function s2c(n){var r;return Java.perform(function(){var a=Java.use("java.lang.String");r=Java.cast(ptr(n),a)}),r}Interceptor.attach(ptr(com),{onEnter:function(a){console.log('sha512(,"'+s2c(a[2])+'")')}});


var base = Module.getBaseAddress("libwbutil.so")
Interceptor.attach(ptr(base.add(0x4738), {
    onLeave: function(retval) {
        console.warn(retval);
    }
});