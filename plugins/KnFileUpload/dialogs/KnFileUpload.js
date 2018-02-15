(function (document, window) {
    'use strict';

    CKEDITOR.dialog.add( 'KnFileUploadDialog', function (editor) {
        return {
            title: 'Upload an Image',
            minWidth: 400,
            minheight: 100,

            contents: [
                {
                    id: 'tab-basic',
                    label: 'Upload Image',
                    elements: [
                        {
                            type: 'file',
                            id: 'KnFileUpload',
                            label: 'Image'
                        }
                    ]
                }
            ],
            onOk: function () {
                var dialog = this;
                var file = dialog.getContentElement('tab-basic', 'KnFileUpload').getInputElement().$.files;
                file = file[0];

                function uploadFile(url) {
                    console.log(url);
                    var uploadHttp = new XMLHttpRequest();

                    uploadHttp.onreadystatechange = function() {
                        if(uploadHttp.readyState === 4 && uploadHttp.status === 200) {
                            console.log(url.substring(0, url.indexOf('?')));

                            var element =
                                CKEDITOR.dom.element.createFromHtml( '<img src="'+ url.substring(0, url.indexOf('?')) +'" border="0" title="Hello" />' );
                                //@TODO Add Support for video and audio.
                            editor.insertElement(element);
                        }
                    };

                    uploadHttp.open('PUT', url);
                    uploadHttp.setRequestHeader('Content-Type', file.type);
                    uploadHttp.send(file);
                }

                if(file) {

                    var OAUTH_CONFIG = window.OAUTH_CONFIG;
                    var xhttp = new XMLHttpRequest();

                    xhttp.onreadystatechange = function() {
                        if (xhttp.readyState === 4 && xhttp.status === 200) {
                            var result = JSON.parse(xhttp.responseText);
                            uploadFile(result.url);
                        }
                    };

                    var cookie = document.cookie;
                    var oauth_cookie = cookie.substring(cookie.indexOf('OAuthToken'), cookie.length);
                    var oauth_token = oauth_cookie.substring(0, oauth_cookie.indexOf(';'))
                        .replace('%22%3A%22', '=')
                        .replace('%22%2C%22', ';');
                    var access_token = oauth_token.substring(oauth_token.indexOf('access_token='), oauth_token.length);
                    var AuthorizationToken = access_token.substring(0, access_token.indexOf(';')).replace('access_token=', '');

                    xhttp.open('GET', window.OAUTH_CONFIG.baseUrl + 'amazon/s3/signedposturl?filename='+file.name+'&content_type='+file.type);
                    xhttp.setRequestHeader('Authorization', 'Bearer ' + AuthorizationToken);

                    xhttp.send();

                }





            }
        }

    });


})(document, window);
