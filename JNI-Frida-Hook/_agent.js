(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var jni = require("./utils/jni_struct.js");

var library_name = "libwbutil.so"; // libsqlite.so

var function_name = "JNI_OnLoad"; //  JNI_OnLoad

var library_loaded = 0; // Function that will process the JNICall after calculating it from
// the jnienv pointer in args[0]

function hook_jni(library_name, function_name) {
  // To get the list of exports
  Module.enumerateExportsSync(library_name).forEach(function (symbol) {
    if (symbol.name == function_name) {
      console.log("[...] Hooking : " + library_name + " -> " + function_name + " at " + symbol.address);
      Interceptor.attach(symbol.address, {
        onEnter: function onEnter(args) {
          var jnienv_addr = 0x0;
          Java.perform(function () {
            jnienv_addr = Java.vm.getEnv().handle.readPointer();
          });
          console.log("[+] Hooked successfully, JNIEnv base adress :" + jnienv_addr);
          /*
           Here you can choose which function to hook
           Either you hook all to have an overview of the function called
          */

          jni.hook_all(jnienv_addr);
          /*
          Either you hook the one you want by precising what to do with it
          */

          Interceptor.attach(jni.getJNIFunctionAdress(jnienv_addr, "FindClass"), {
            onEnter: function onEnter(args) {
              console.log("env->FindClass(\"" + Memory.readCString(args[1]) + "\")");
            }
          });
          Interceptor.attach(jni.getJNIFunctionAdress(jnienv_addr, "CallObjectMethod"), {
            onEnter: function onEnter(args) {
              console.log("env->CallObjectMethod(\"" + Memory.readPointer(args[1]) + "," + Memory.readPointer(args[2]) + "," + Memory.readCString(args[3]) + "\")");
            }
          });
        },
        onLeave: function onLeave(args) {
          // Prevent from displaying junk from other functions
          Interceptor.detachAll();
          console.log("[-] Detaching all interceptors");
        }
      });
    }
  });
}

if (library_name == "" || function_name == "") {
  console.log("[-] You must provide a function name and a library name to hook");
} else {
  // First Step : waiting for the application to load the good library
  // https://android.googlesource.com/platform/system/core/+/master/libnativeloader/native_loader.cpp#746
  // 
  // OpenNativeLibrary is called when you loadLibrary from Java, it then call android_dlopen_ext
  Interceptor.attach(Module.findExportByName(null, 'android_dlopen_ext'), {
    onEnter: function onEnter(args) {
      // first arg is the path to the library loaded
      var library_path = Memory.readCString(args[0]);

      if (library_path.includes(library_name)) {
        console.log("[...] Loading library : " + library_path);
        library_loaded = 1;
      }
    },
    onLeave: function onLeave(args) {
      // if it's the library we want to hook, hooking it
      if (library_loaded == 1) {
        console.log("[+] Loaded");
        hook_jni(library_name, function_name);
        library_loaded = 0;
      }
    }
  });
}

},{"./utils/jni_struct.js":2}],2:[function(require,module,exports){
"use strict";

// class created from
// struct JNINativeInterface :
// https://android.googlesource.com/platform/libnativehelper/+/master/include_jni/jni.h#129
var jni_struct_array = ["reserved0", "reserved1", "reserved2", "reserved3", "GetVersion", "DefineClass", "FindClass", "FromReflectedMethod", "FromReflectedField", "ToReflectedMethod", "GetSuperclass", "IsAssignableFrom", "ToReflectedField", "Throw", "ThrowNew", "ExceptionOccurred", "ExceptionDescribe", "ExceptionClear", "FatalError", "PushLocalFrame", "PopLocalFrame", "NewGlobalRef", "DeleteGlobalRef", "DeleteLocalRef", "IsSameObject", "NewLocalRef", "EnsureLocalCapacity", "AllocObject", "NewObject", "NewObjectV", "NewObjectA", "GetObjectClass", "IsInstanceOf", "GetMethodID", "CallObjectMethod", "CallObjectMethodV", "CallObjectMethodA", "CallBooleanMethod", "CallBooleanMethodV", "CallBooleanMethodA", "CallByteMethod", "CallByteMethodV", "CallByteMethodA", "CallCharMethod", "CallCharMethodV", "CallCharMethodA", "CallShortMethod", "CallShortMethodV", "CallShortMethodA", "CallIntMethod", "CallIntMethodV", "CallIntMethodA", "CallLongMethod", "CallLongMethodV", "CallLongMethodA", "CallFloatMethod", "CallFloatMethodV", "CallFloatMethodA", "CallDoubleMethod", "CallDoubleMethodV", "CallDoubleMethodA", "CallVoidMethod", "CallVoidMethodV", "CallVoidMethodA", "CallNonvirtualObjectMethod", "CallNonvirtualObjectMethodV", "CallNonvirtualObjectMethodA", "CallNonvirtualBooleanMethod", "CallNonvirtualBooleanMethodV", "CallNonvirtualBooleanMethodA", "CallNonvirtualByteMethod", "CallNonvirtualByteMethodV", "CallNonvirtualByteMethodA", "CallNonvirtualCharMethod", "CallNonvirtualCharMethodV", "CallNonvirtualCharMethodA", "CallNonvirtualShortMethod", "CallNonvirtualShortMethodV", "CallNonvirtualShortMethodA", "CallNonvirtualIntMethod", "CallNonvirtualIntMethodV", "CallNonvirtualIntMethodA", "CallNonvirtualLongMethod", "CallNonvirtualLongMethodV", "CallNonvirtualLongMethodA", "CallNonvirtualFloatMethod", "CallNonvirtualFloatMethodV", "CallNonvirtualFloatMethodA", "CallNonvirtualDoubleMethod", "CallNonvirtualDoubleMethodV", "CallNonvirtualDoubleMethodA", "CallNonvirtualVoidMethod", "CallNonvirtualVoidMethodV", "CallNonvirtualVoidMethodA", "GetFieldID", "GetObjectField", "GetBooleanField", "GetByteField", "GetCharField", "GetShortField", "GetIntField", "GetLongField", "GetFloatField", "GetDoubleField", "SetObjectField", "SetBooleanField", "SetByteField", "SetCharField", "SetShortField", "SetIntField", "SetLongField", "SetFloatField", "SetDoubleField", "GetStaticMethodID", "CallStaticObjectMethod", "CallStaticObjectMethodV", "CallStaticObjectMethodA", "CallStaticBooleanMethod", "CallStaticBooleanMethodV", "CallStaticBooleanMethodA", "CallStaticByteMethod", "CallStaticByteMethodV", "CallStaticByteMethodA", "CallStaticCharMethod", "CallStaticCharMethodV", "CallStaticCharMethodA", "CallStaticShortMethod", "CallStaticShortMethodV", "CallStaticShortMethodA", "CallStaticIntMethod", "CallStaticIntMethodV", "CallStaticIntMethodA", "CallStaticLongMethod", "CallStaticLongMethodV", "CallStaticLongMethodA", "CallStaticFloatMethod", "CallStaticFloatMethodV", "CallStaticFloatMethodA", "CallStaticDoubleMethod", "CallStaticDoubleMethodV", "CallStaticDoubleMethodA", "CallStaticVoidMethod", "CallStaticVoidMethodV", "CallStaticVoidMethodA", "GetStaticFieldID", "GetStaticObjectField", "GetStaticBooleanField", "GetStaticByteField", "GetStaticCharField", "GetStaticShortField", "GetStaticIntField", "GetStaticLongField", "GetStaticFloatField", "GetStaticDoubleField", "SetStaticObjectField", "SetStaticBooleanField", "SetStaticByteField", "SetStaticCharField", "SetStaticShortField", "SetStaticIntField", "SetStaticLongField", "SetStaticFloatField", "SetStaticDoubleField", "NewString", "GetStringLength", "GetStringChars", "ReleaseStringChars", "NewStringUTF", "GetStringUTFLength", "GetStringUTFChars", "ReleaseStringUTFChars", "GetArrayLength", "NewObjectArray", "GetObjectArrayElement", "SetObjectArrayElement", "NewBooleanArray", "NewByteArray", "NewCharArray", "NewShortArray", "NewIntArray", "NewLongArray", "NewFloatArray", "NewDoubleArray", "GetBooleanArrayElements", "GetByteArrayElements", "GetCharArrayElements", "GetShortArrayElements", "GetIntArrayElements", "GetLongArrayElements", "GetFloatArrayElements", "GetDoubleArrayElements", "ReleaseBooleanArrayElements", "ReleaseByteArrayElements", "ReleaseCharArrayElements", "ReleaseShortArrayElements", "ReleaseIntArrayElements", "ReleaseLongArrayElements", "ReleaseFloatArrayElements", "ReleaseDoubleArrayElements", "GetBooleanArrayRegion", "GetByteArrayRegion", "GetCharArrayRegion", "GetShortArrayRegion", "GetIntArrayRegion", "GetLongArrayRegion", "GetFloatArrayRegion", "GetDoubleArrayRegion", "SetBooleanArrayRegion", "SetByteArrayRegion", "SetCharArrayRegion", "SetShortArrayRegion", "SetIntArrayRegion", "SetLongArrayRegion", "SetFloatArrayRegion", "SetDoubleArrayRegion", "RegisterNatives", "UnregisterNatives", "MonitorEnter", "MonitorExit", "GetJavaVM", "GetStringRegion", "GetStringUTFRegion", "GetPrimitiveArrayCritical", "ReleasePrimitiveArrayCritical", "GetStringCritical", "ReleaseStringCritical", "NewWeakGlobalRef", "DeleteWeakGlobalRef", "ExceptionCheck", "NewDirectByteBuffer", "GetDirectBufferAddress", "GetDirectBufferCapacity", "GetObjectRefType"];
/*
Calculate the given funcName address from the JNIEnv pointer
*/

function getJNIFunctionAdress(jnienv_addr, func_name) {
  var offset = jni_struct_array.indexOf(func_name) * Process.pointerSize; // console.log("offset : 0x" + offset.toString(16))

  return Memory.readPointer(jnienv_addr.add(offset));
} // Hook all function to have an overview of the function called


function hook_all(jnienv_addr) {
  jni_struct_array.forEach(function (func_name) {
    // Calculating the address of the function
    if (!func_name.includes("reserved")) {
      var func_addr = getJNIFunctionAdress(jnienv_addr, func_name);
      Interceptor.attach(func_addr, {
        onEnter: function onEnter(args) {
          console.log("[+] Entered : " + func_name);
        }
      });
    }
  });
}

exports.getJNIFunctionAdress = getJNIFunctionAdress;
exports.hook_all = hook_all;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2ZyaWRhLWNvbXBpbGUvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFnZW50LmpzIiwidXRpbHMvam5pX3N0cnVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLHVCQUFELENBQW5COztBQUVBLElBQUksWUFBWSxHQUFHLGNBQW5CLEMsQ0FBa0M7O0FBQ2xDLElBQUksYUFBYSxHQUFHLFlBQXBCLEMsQ0FBaUM7O0FBQ2pDLElBQUksY0FBYyxHQUFHLENBQXJCLEMsQ0FHQTtBQUNBOztBQUNBLFNBQVMsUUFBVCxDQUFrQixZQUFsQixFQUFnQyxhQUFoQyxFQUE4QztBQUUxQztBQUNBLEVBQUEsTUFBTSxDQUFDLG9CQUFQLENBQTRCLFlBQTVCLEVBQTBDLE9BQTFDLENBQWtELFVBQVMsTUFBVCxFQUFnQjtBQUM5RCxRQUFHLE1BQU0sQ0FBQyxJQUFQLElBQWUsYUFBbEIsRUFBZ0M7QUFDNUIsTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLHFCQUFxQixZQUFyQixHQUFvQyxNQUFwQyxHQUE2QyxhQUE3QyxHQUE2RCxNQUE3RCxHQUFzRSxNQUFNLENBQUMsT0FBekY7QUFFQSxNQUFBLFdBQVcsQ0FBQyxNQUFaLENBQW1CLE1BQU0sQ0FBQyxPQUExQixFQUFrQztBQUM5QixRQUFBLE9BQU8sRUFBRSxpQkFBUyxJQUFULEVBQWM7QUFFbkIsY0FBSSxXQUFXLEdBQUcsR0FBbEI7QUFDQSxVQUFBLElBQUksQ0FBQyxPQUFMLENBQWEsWUFBVTtBQUNuQixZQUFBLFdBQVcsR0FBRyxJQUFJLENBQUMsRUFBTCxDQUFRLE1BQVIsR0FBaUIsTUFBakIsQ0FBd0IsV0FBeEIsRUFBZDtBQUNILFdBRkQ7QUFLQSxVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksa0RBQWtELFdBQTlEO0FBRUE7Ozs7O0FB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LEVBOE1yQixxQkE5TXFCLEVBK01yQixzQkEvTXFCLEVBZ05yQix1QkFoTnFCLEVBaU5yQixvQkFqTnFCLEVBa05yQixvQkFsTnFCLEVBbU5yQixxQkFuTnFCLEVBb05yQixtQkFwTnFCLEVBcU5yQixvQkFyTnFCLEVBc05yQixxQkF0TnFCLEVBdU5yQixzQkF2TnFCLEVBd05yQixpQkF4TnFCLEVBeU5yQixtQkF6TnFCLEVBME5yQixjQTFOcUIsRUEyTnJCLGFBM05xQixFQTROckIsV0E1TnFCLEVBNk5yQixpQkE3TnFCLEVBOE5yQixvQkE5TnFCLEVBK05yQiwyQkEvTnFCLEVBZ09yQiwrQkFoT3FCLEVBaU9yQixtQkFqT3FCLEVBa09yQix1QkFsT3FCLEVBbU9yQixrQkFuT3FCLEVBb09yQixxQkFwT3FCLEVBcU9yQixnQkFyT3FCLEVBc09yQixxQkF0T3FCLEVBdU9yQix3QkF2T3FCLEVBd09yQix5QkF4T3FCLEVBeU9yQixrQkF6T3FCLENBQXpCO0FBNE9BOzs7O0FBR0EsU0FBUyxvQkFBVCxDQUE4QixXQUE5QixFQUEwQyxTQUExQyxFQUFvRDtBQUNoRCxNQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxPQUFqQixDQUF5QixTQUF6QixJQUFzQyxPQUFPLENBQUMsV0FBM0QsQ0FEZ0QsQ0FHaEQ7O0FBRUEsU0FBTyxNQUFNLENBQUMsV0FBUCxDQUFtQixXQUFXLENBQUMsR0FBWixDQUFnQixNQUFoQixDQUFuQixDQUFQO0FBQ0gsQyxDQUdEOzs7QUFDQSxTQUFTLFFBQVQsQ0FBa0IsV0FBbEIsRUFBOEI7QUFDMUIsRUFBQSxnQkFBZ0IsQ0FBQyxPQUFqQixDQUF5QixVQUFTLFNBQVQsRUFBbUI7QUFDeEM7QUFDQSxRQUFHLENBQUMsU0FBUyxDQUFDLFFBQVYsQ0FBbUIsVUFBbkIsQ0FBSixFQUNEO0FBQ0ssVUFBSSxTQUFTLEdBQUcsb0JBQW9CLENBQUMsV0FBRCxFQUFhLFNBQWIsQ0FBcEM7QUFDQSxNQUFBLFdBQVcsQ0FBQyxNQUFaLENBQW1CLFNBQW5CLEVBQTZCO0FBQ3pCLFFBQUEsT0FBTyxFQUFFLGlCQUFTLElBQVQsRUFBYztBQUNuQixVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksbUJBQW1CLFNBQS9CO0FBQ0g7QUFId0IsT0FBN0I7QUFLSDtBQUNKLEdBWEQ7QUFZSDs7QUFFRCxPQUFPLENBQUMsb0JBQVIsR0FBK0Isb0JBQS9CO0FBQ0EsT0FBTyxDQUFDLFFBQVIsR0FBbUIsUUFBbkIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiJ9
