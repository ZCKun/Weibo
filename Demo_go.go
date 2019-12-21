package main

import (
    "fmt"
    "crypto/sha512"
    "strconv"
    )


var KEY = "5l0WXnhiY4pJ794KIJ7Rw5F45VXg9sjo"
var UID = "1014653719052"
var KEY2 = "109A395010"
var KEY1 = KEY + UID + KEY2

func enSha512(text string) string {
    return fmt.Sprintf("%x", sha512.Sum512([]byte(text)))
}

func getIndex(text string) string {
    var ret string
    var j int
    bytes := []byte(text)
    for i := 0; i < 8; i++ {
        k := converByte2Int(int(bytes[j]))
        j += k
        ret += fmt.Sprintf("%x", k)
    }
    return ret
}

func converByte2Int(b int) int {
    if b - 48 <= 9 { return b - 48 }
    if b - 65 > 5 { return b - 87 }
    return b - 55
}

func main() {
    key1_s := enSha512(KEY1)
    key2_s := enSha512(KEY2)
    fmt.Printf("key1: %s(%s)\n", key1_s, KEY1)
    fmt.Printf("key2: %s(%s)\n", key2_s, KEY2)
    // key2_s byte array
    k2si_ba := getIndex(key2_s)
    var result string
    var j uint64 = 0
    for i := range k2si_ba {
        index, _ := strconv.ParseUint(string(k2si_ba[i]), 16, 32)
        j += index
        result += string(key1_s[j])
    }
    fmt.Println("s: ", result)
}
