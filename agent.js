var fs = Module.enumerateExportsSync("libwbutil.so");
for (var i = 0; i < fs.length; i++) {
    if (fs[i].name.indexOf("hexStr") != -1) {
        var com = fs[i].address;
        console.log(com)
        Interceptor.attach(ptr(com), {
            onEnter: function(args) {
                console.log("hexStrToByte(" + Memory.readCString(args[0]) + "," + args[1] + "," + args[2] + ")");
            }
        });
    }
}
