Java.perform(function() {
	var dlm = Java.use("dlm");
	dlm['O00000Oo'].overload('java.util.Map', 'java.lang.String', 'java.lang.String').implementation = function(map, str, str2) {
		Java.perform(function() {
            var jal = Java.use("android.util.Log"), jexce = Java.use("java.lang.Exception");
            console.log(jal.getStackTraceString(jexce.$new()));
	    })
    }
})
