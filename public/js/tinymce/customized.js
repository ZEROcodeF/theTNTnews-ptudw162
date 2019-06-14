tinymce.init({
    language: 'vi_VN',
    selector: '#mytiny',
    menubar: false,
    plugins: 'autoresize paste image link media wordcount',
    toolbar: 'undo redo | bold italic underline strikethrough | link image media',
    max_height: 720,
    content_css: '/css/editor-style.css',
    skin: 'lightgray',
    mobile: { theme: 'mobile' },
    media_poster: false,
    media_url_resolver: function (data, resolve, reject) {
        if ((data.url.indexOf('youtube.com') !== -1) || (data.url.indexOf('youtu.be') !== -1)) {
            resolve({ html: '' });
        } else {
            reject({ msg: 'Chỉ chấp nhận link youtube!' });
        }
    }
});

