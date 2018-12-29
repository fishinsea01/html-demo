//加密数据
function encryptData(appKey, key, data) {
    //加密
    var encrypt = CryptoJS.DES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(key),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
    //计算签名
    var signStr = hex_md5(key + encrypt);
    //结果
    var result = appKey + signStr + encrypt;
    return result;
}
//解密数据
function decryptData(key, data) {
    var result = {};
    if (data.length < 64) {
        return data;
    } else {
        try {
            var s1 = data.substr(32);
            console.log(s1);
            var m1 = s1.substr(0, 32);
            var s2 = s1.substr(32);
            var s3 = key + s2;
            var m2 = hex_md5(s3);
            if (m1 == m2) {
                result = CryptoJS.DES.decrypt(s2, CryptoJS.enc.Utf8.parse(key), {
                    iv: CryptoJS.enc.Utf8.parse(key),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(CryptoJS.enc.Utf8);
            } else {
                return "验证签名失败";
            }
        } catch (error) {
            return "解密出错"
        }

    }

    return result;
}