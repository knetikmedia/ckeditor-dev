(function (document, window) {
    CKEDITOR.plugins.add( 'KnFileUpload', {
        icons: 'KnFileUpload',
        init: function( editor ) {
            //Plugin logic goes here.
            editor.addCommand ('KnInsertUploadedImage', new CKEDITOR.dialogCommand('KnFileUploadDialog'));

            editor.ui.addButton( 'KnFileUpload', {
                label: 'Upload an Image',
                command: 'KnInsertUploadedImage',
                toolbar: 'insert'
            });

            CKEDITOR.dialog.add( 'KnFileUploadDialog', this.path + 'dialogs/KnFileUpload.js' );

        }
    });
})(document, window);
