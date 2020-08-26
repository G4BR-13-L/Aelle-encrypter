$(function () {
    //Coded by Mohammad Shahid
    var _encrypted = null;
    var _decrypted = null;
    var _newFile;
    var _encodeType = "AES";

    var body = $('body'),
		stage = $('#stage'),
		back = $('a.back');

    /* Check encryption type */
    $('input[type="checkbox"]').click(function () {
        if ($(this).prop("checked") == true && $(this).val() == "AES") {
            _encodeType = "AES";
            $('input.selection').not(this).prop('checked', false);
        }
        if ($(this).prop("checked") == true && $(this).val() == "Sh1") {
            _encodeType = "SH1";
            $('input.selection').not(this).prop('checked', false);
        }
        if ($(this).prop("checked") == true && $(this).val() == "Serpent") {
            _encodeType = "Serpent";
            $('input.selection').not(this).prop('checked', false);
        }
    });

    /* Step 1 */

    $('.button.encrypt.green').click(function () {
        body.attr('class', 'encrypt');

        // Go to step 2
        step(2);
    });

    $('.button.decrypt.magenta').click(function () {
        body.attr('class', 'decrypt');
        step(2);
    });

    $('#Shahid').click(function () {
        debugger
        $('#downloadLoader').css('display', 'block');
        setTimeout(function () {
            DownloadFile("KUZDP78549==");
        }, 100);
    });

    $('#HomeButton').click(function () {
        step(2);
        window.location.reload();
    });

    /* Step 2 */


    $('#step2 .button').click(function () {
        // Trigger the file browser dialog
        $(this).parent().find('input').click();
    });


    // Set up events for the file inputs

    var file = null;

    $('#step2').on('change', '#encrypt-input', function (e) {

        // Has a file been selected?
        // Also check .dry extenstion to encrypt again

        if (e.target.files.length != 1) {
            alert('Please select a file to encrypt!');
            return false;
        }
        $('#encryptFileLoader').css('display', 'block');
        file = e.target.files[0];

        //if(file.size > 1024*1024){
        //alert('Please choose files smaller than 1mb, otherwise you may crash your browser. \nThis is a known issue. See the tutorial.');
        //return;
        //}

        step(3);
    });

    $('#step2').on('change', '#decrypt-input', function (e) {

        if (e.target.files.length != 1) {
            alert('Please select a file to decrypt!');
            return false;
        }
        $('#decryptFileLoader').css('display', 'block');
        file = e.target.files[0];
        if (checkFile(file)) {
            step(3);
        }
        else {
            step(1);
        }
    });


    /* Step 3 */


    $('a.button.process').click(function () {

        var input = $(this).parent().find('input[type=password]'),
			a = $('#step4 a.download'),
			password = input.val();

        input.val('');

        if (password.length < 5) {
            alert('Please choose a longer password!');
            return;
        }
        else {
            $('#encryptLoader').css('display', 'block');
            $('#decryptLoader').css('display', 'block');
        }

        // The HTML5 FileReader object will allow us to read the 
        // contents of the	selected file.

        var reader = new FileReader();

        if (body.hasClass('encrypt')) {

            // Encrypt the file!

            reader.onload = function (e) {

                // Use the CryptoJS library and the AES cypher to encrypt the 
                // contents of the file, held in e.target.result, with the password
                debugger

                switch (_encodeType) {
                    case "AES":
                        _encrypted = CryptoJS.AES.encrypt(e.target.result, password);
                        _newFile = makeid() + "." + file.name.substr((file.name.lastIndexOf('.') + 1)) + ".fry";
                        break;
                    case "SH1":
                        debugger;
                        var passwordBytes = CryptoJS.enc.Utf16LE.parse(password);

                        var sha1Hash = CryptoJS.SHA1(passwordBytes);

                        var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);

                        // we are getting only the first 8 chars for actual key generation
                        sha1HashToBase64Short = sha1HashToBase64.substring(0, 8);

                        var aesKey = CryptoJS.enc.Utf16.parse(sha1HashToBase64Short);
                        var aesIv = aesKey;

                        //Note that we are being lazy and the encryption key itself
                        //is used as the initialization vector for AES
                        var x = CryptoJS.AES.encrypt(e.target.result, aesKey, {
                            iv: aesIv,
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Pkcs7
                        });

                        // cryptHex will contain the cipher text in base64

                        _encrypted = x.toString();
                        _newFile = makeid() + "." + file.name.substr((file.name.lastIndexOf('.') + 1)) + ".dry";
                        break;
                    case "Serpent":
                        debugger
                        _encrypted = CryptoJS.DES.encrypt(e.target.result, password);
                        _newFile = makeid() + "." + file.name.substr((file.name.lastIndexOf('.') + 1)) + ".wry";
                        break;
                }
                debugger

                step(4);
            };

            // This will encode the contents of the file into a data-uri.
            // It will trigger the onload handler above, with the result

            reader.readAsDataURL(file);
        }
        else {

            // Decrypt it!

            reader.onload = function (e) {
                debugger
                var _replacable = ".fry";
                switch (_encodeType) {
                    case "AES":
                        _decrypted = CryptoJS.AES.decrypt(e.target.result, password)
										        .toString(CryptoJS.enc.Latin1);
                        _replacable = ".fry";
                        break;
                    case "SH1":
                        debugger
                        var passwordBytes = CryptoJS.enc.Utf16LE.parse(password);

                        var sha1Hash = CryptoJS.SHA1(passwordBytes);

                        var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);

                        // we are getting only the first 8 chars for actual key generation
                        sha1HashToBase64Short = sha1HashToBase64.substring(0, 8);

                        var aesKey = CryptoJS.enc.Utf16.parse(sha1HashToBase64Short);
                        var aesIv = aesKey;

                        var y = CryptoJS.AES.decrypt(e.target.result, aesKey, {
                            iv: aesIv
                        });

                        _decrypted = y.toString(CryptoJS.enc.Utf8);
                        _replacable = ".dry";
                        break;
                    case "Serpent":
                        debugger
                        _decrypted = CryptoJS.DES.decrypt(e.target.result, password).toString(CryptoJS.enc.Latin1);
                        _replacable = ".wry";
                        break;
                }

                if (!/^data:/.test(_decrypted)) {
                    alert("Invalid pass phrase or file! Please try again.");
                    $('#encryptLoader').css('display', 'none');
                    $('#decryptLoader').css('display', 'none');
                    return false;
                }

                _newFile = file.name.replace(_replacable, '');

                step(4);
            };

            reader.readAsText(file);
        }
    });


    /* The back button */


    back.click(function () {

        // Reinitialize the hidden file inputs,
        // so that they don't hold the selection 
        // from last time

        $('#step2 input[type=file]').replaceWith(function () {
            return $(this).clone();
        });

        $('#step2 input[type=file]').val('');

        _encrypted = null;
        _decrypted = null;
        _newFile = null;

        $('#downloadLoader').css('display', 'none');
        $('#encryptLoader').css('display', 'none');
        $('#decryptLoader').css('display', 'none');
        $('#encryptFileLoader').css('display', 'none');
        $('#decryptFileLoader').css('display', 'none');
        
        step(1);
    });


    // Helper function that moves the viewport to the correct step div

    function step(i) {

        if (i == 1) {
            back.fadeOut();
        }
        else {
            back.fadeIn();
        }

        // Move the #stage div. Changing the top property will trigger
        // a css transition on the element. i-1 because we want the
        // steps to start from 1:

        stage.css('top', (-(i - 1) * 100) + '%');
    }

    function DownloadFile(e) {
        debugger
        if (_encrypted) {
            var BB = get_blob();
            saveAs(
                  new BB(
                      [_encrypted || Base64Decode(_decrypted)]
                )
                , _newFile
            );
        }
        if (_decrypted) {
            debugger;
            var result = _decrypted.split(',')[1];
            var type = _decrypted.split(',')[0];
            var bb = b64toBlob(result, type);

            var blobUrl = window.URL.createObjectURL(new Blob([bb], { type: bb.type }));

            var a = document.createElement("a");            
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = blobUrl;
            a.download = _newFile;
            a.click();            
        }
        $('#downloadLoader').css('display', 'none');
    }

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    function Base64Encode(str) {
        var bytes = new (TextEncoder || TextEncoderLite)('utf-8').encode(str);
        return base64js.fromByteArray(bytes);
    }

    function Base64Decode(str) {
        debugger
        str = str.replace('data:text/plain;base64,', '');
        str = str.replace(str.substring(0, parseInt(str.indexOf(",")) + 1), '');
        var bytes = base64js.toByteArray(str);
        return new (TextDecoder || TextDecoderLite)('utf-8').decode(bytes);
    }

    var get_blob = function () {
        return Blob;
    }

    function checkFile(file) {
        debugger
        var extension = file.name.substr((file.name.lastIndexOf('.') + 1));
        if (!/(dry|fry|wry)$/ig.test(extension)) {
            alert("Invalid file type: " + extension + ".  Please use .dry | .fry | .wry extensions for Decryption.");
            $("#decrypt-input").val("");
            return false;
        }
        switch (extension) {
            case "dry":
                _encodeType = "SH1";
                break;
            case "wry":
                _encodeType = "Serpent";
                break;
            case "fry":
                _encodeType = "AES";
                break;
        }
        return true;
    }

    function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 18; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
});
