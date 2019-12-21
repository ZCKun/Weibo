import hashlib


KEY2 = "109A395010"
UID = "1014653719052"
KEY1 = "5l0WXnhiY4pJ794KIJ7Rw5F45VXg9sjo%s%s" % (UID, KEY2)

def converByte2Int(b):
    if b - 48 <= 9: return b - 48
    if b - 65 > 5: return b - 87
    return a - 55


def main():
    key1_s = hashlib.sha512(KEY1.encode('utf-8')).hexdigest()
    key2_s = hashlib.sha512(KEY2.encode('utf-8')).hexdigest()
    print(f"KEY1: {key1_s} ({KEY1})")
    print(f"KEY2: {key2_s} ({KEY2})")
    ret = ""
    j = 0
    for _ in range(8):
        k = converByte2Int(ord(key2_s[j]))
        j += k
        ret += key1_s[j]
    print(ret)


if __name__ == "__main__":
    main()



