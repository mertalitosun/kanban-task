document.getElementById('updateList').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const boardId = window.location.pathname.split('/').pop();

    const name = document.getElementById('name').value;
    const formData = {
        name: name,
    };

    fetch(`/api/v1/boards/${boardId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message)
            window.location.href = `/boards/${boardId}`;
        } else {
            alert('Güncelleme İşlemi Başarısız: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});