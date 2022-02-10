$(() => {
    $('.logout').click(() => {
        fetch('http://localhost:3000/admin/logout', {
            method: 'POST'
        })
        .then(res => {
            if (res.status === 401) {
                location.href = '/';
            }
        });
    });

    $('#Image').on('change', function(e) {
        const reader = new FileReader();
        reader.readAsDataURL(this.files[0])
        reader.onload = function() {
            $('.bookImage').remove();
            const img = new Image();
            img.src = reader.result;
            img.height = 200;
            img.classList.add('bookImage', 'mt-3');
            $('.custom-file-button').append(img);
        }
    })
})
