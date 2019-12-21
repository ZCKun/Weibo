import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.lang.StringBuilder;


class Demo {

    private static final char[] TEMP = "0123456789ABCDEF".toCharArray();
    private static final String KEY2 = "109C195010";
    private static final String UID = "7358119308";
    private static final String KEY1 = "5l0WXnhiY4pJ794KIJ7Rw5F45VXg9sjo" + UID + KEY2;

    public static void main(String args[]) {
        String key2_s = sha512(KEY2).toLowerCase();
        String key1_s = sha512(KEY1).toLowerCase();
        System.out.println("KEY1:" + key1_s + "(" + KEY1 + ")");
        System.out.println("KEY2:" + key2_s + "(" + KEY2 + ")");
        char bytes[] = key2_s.toCharArray();
        int i = 0, j = 0, k = 0;
        StringBuilder sb = new StringBuilder();
        do {
            k = converByte2Int(bytes[j]);
            System.out.println(k);
            j += k;
            sb.append(key1_s.charAt(j));
            i += 4;
        } while (i!=32);
        System.out.println(sb.toString());
    }

    public static int converByte2Int(int a) {
        if (a - 48 <= 9) return a - 48;
        if (a - 65 > 5) return a - 87;
        return a - 55;
    }

    public static void getIndex(String text) {
        byte[] t_bytes = text.getBytes();
        int i = 0;
        int j = 0;
        int k = 0;
        StringBuilder sb = new StringBuilder();
        do {
            k += t_bytes[j];
            sb.append(k);
            i += k;
        } while (i != 32);
    }

    public static String sha512(String text) {
        try {
            MessageDigest sha512 = MessageDigest.getInstance("SHA-512");
            sha512.update(text.getBytes());
            String ret = bytes2hex(sha512.digest());
            return ret;
        } catch (NoSuchAlgorithmException e) {
        }
        return null;
    }

    public static String bytes2hex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = TEMP[v>>4];
            hexChars[j * 2 + 1] = TEMP[v&0x0f];
        }
        return new String(hexChars);
    }
}
