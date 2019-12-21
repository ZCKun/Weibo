push    {r4-r7,lr}
ldr     r3, [r0]                                                ;r0是env指针，这里是取env
sub     sp, sp,#0x34                                            ;分配栈空间，0x34/4=13
movs    r1, r2                                                  ;jstring对象复制到r1寄存器
ldr     r3, [r3,#0x7c]                                          ;加载jni方法GetObjectClass
movs    r4, r0                                                  ;env指针复制到r4
movs    r5, r2                                                  ;将jobject对象复制到r5
blx     r3                                                      ;调用GetObjectClass，参数是jstring对象和env指针
ldr     r2, =(aGetBytes - 0x57ce)                               ;加载字符串GetBytes到r2
ldr     r3, =(aLjavaLangStrin_9 - 0x57d0)                       ;加载字符串(Ljava/lang/String;)[B到r3
movs    r1, r0                                                  ;将GetObjectClass的返回值复制到r1
add     r2, pc                                                  ;r2 = r2 + pc。取字符串getbytes
add     r3, pc                                                  ;r3 = r3 + pc。取字符串(Ljava/lang/String;)[B
movs    r0, r4                                                  ;将env指针放到r0
bl      _ZN7_JNIEnv11GetMethodIDEP7_jclassPKcS3_                ;调用GetMethodID，参数r0,r1,r2,r3
ldr     r1, =(aUsAscii - 0x57de)                                ;加载字符串US-ASCII
movs    r6, r0                                                  ;GetMethodID 返回值复制到r6
movs    r0, r4                                                  ;复制env指针到r0
add     r1, pc                                                  ;取字符串US-ASCII
bl      _ZN7_JNIEnv12NewStringUTFEPKc                           ;调用NewStringUTF，参数r0,r1
movs    r7, r0                                                  ;返回值复制到r7
movs    r1, r5                                                  ;jobject复制到r1
movs    r2, r6                                                  ;methodid
movs    r3, r7                                                  ;NewStringUTF返回的jstring对象
movs    r0, r4                                                  ;env指针
bl      _ZN7_JNIEnv16CallObjectMethodEP8_jobjectP10_jmethodIDz  ;调用CallObjectMethod。参数r0,r1,r2,r3
ldr     r2, [r4]                                                ;取JNIEnv对象到r2
movs    r3, #0x2e0                                              ;r3 = 0x2e0
movs    r1, r0                                                  ;CallObjectMethod返回值复制到r1
ldr     r3, [r2,r3]                                             ;JNIEnv对象地址+0x2e0，对应GetByteArrayElements方法
movs    r0, r4                                                  ;env指针
movs    r2, #0                                                  ;
blx     r3                                                      ;调用GetByteArrayElements。参数r0,r1,r2
movs    r5, #0
str     r0, [sp,#0x8]                                           ;将GetByteArrayElements返回值放到栈里
adds    r6, r5, #0                                              ;r6 = r5 + 0。//r5 = 0

; 然后是while循环
loc_5804
ldr     r3, [sp,#0x8]                                           ;取在栈里的GetByteArrayElements返回值
ldrsb   r0, [r3,r6]                                             ;从r3+r6地址处读取带符号的字节数据
bl      _Z14converByte2Inta                                     ;调用converByte2Int方法。参数r0
add     r2, sp, #0x10                                           ;将栈sp+0x10处数据地址放到r2
movs    r3, #0x10
adds    r3, r3, r5                                              ;r3 = r3 + r5
adds    r6, r6, r0                                              ;r6 = r6 + r0。r0是converByte2Int返回值
str     r2, [sp,#0xc]                                           ;r2存到栈sp+0xc处
adds    r5, #4                                                  ;r5 = r5 + 4
mov     r2, sp                                                  ;将栈指针地址复制到r2
str     r6, [r3,r2]                                             ;将r6存放到栈r3+r2处
cmp     r5, #0x20                                               ;r5内容与0x20比较
bne     loc_5804                                                ;如果不等于，跳转回上面接着执行

