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
})
