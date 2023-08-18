export const getBase64ToBLob = (data: string, mime: string): Blob => {
    const atobData = window.atob(data); //atob(base64解码) btoa(编码成base64的方式)
    const len = atobData.length;
    const unit8List = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        unit8List[i] = atobData.charCodeAt(i); //charCodeAt返回字符在Unicode字符集当中的编码值
    }
    console.log('unit8List', unit8List);
    return new Blob([unit8List], {
        type: mime
    });
};