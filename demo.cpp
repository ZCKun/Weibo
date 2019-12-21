#include <iostream>
#include "sha512.h"

using namespace std;
using namespace sw;

const string UID = "5715174600";
const string FROM = "109C295010";
const string KEY = "5l0WXnhiY4pJ794KIJ7Rw5F45VXg9sjo" + UID + FROM;


int converByte2Int(int b) {
    if (b - 48 <= 9) return b - 48;
    if (b - 64 > 5) return b - 87;
    return b - 55;
}

int main() {
    const string k_s = sha512::calculate(KEY);
    const string f_s = sha512::calculate(FROM);
    int i = 0;
    int j = 0;
    int k = 0;
    do {
        k = converByte2Int(int(f_s[i]));
        i += k;
        j += 4;
        cout << k_s[i];
    } while(j != 32);

    cout << "\n";
    return 0;
}
