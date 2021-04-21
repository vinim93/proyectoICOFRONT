import MD5 from "crypto-js/md5";

export const encryptData = (str) => {
    if(str.length > 0 && str.length <= 28){
        const shortedString = str.substring(3, str.length-3);
        const md5String = MD5(shortedString).toString();
        return md5String;
    } else {
        return MD5(str).toString();
    }
}