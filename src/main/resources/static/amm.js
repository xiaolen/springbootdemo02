var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
    + "wxyz0123456789+/" + "=";

function decode64(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        alert("There were invalid base64 characters in the input text.\n"
            + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n"
            + "Expect errors in decoding.");
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    output = new Array();
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output.push(chr1);
        if (enc3 != 64) {
            output.push(chr2);
        }
        if (enc4 != 64) {
            output.push(chr3);
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return bytesToUnicode(output);
}

function bytesToUnicode(bs) {
    var result = "";
    var offset = 0;
    if (bs.length >= 2 && bs[0] == 255 && bs[1] == 254)
        offset = 2; // delete "FE"
    for ( var i = offset; i < bs.length; i += 2) {
        var code = bs[i] + (bs[i + 1] << 8);
        result += String.fromCharCode(code);
    }
    return result;
}