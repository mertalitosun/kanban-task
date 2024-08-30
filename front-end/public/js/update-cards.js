document.getElementById('updateCards').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const pathParts = window.location.pathname.split('/');

    const boardId = pathParts[3]; 
    const listId = pathParts[5]; 
    const cardId = pathParts[7]; 

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const formData = {
        name: name,
        description:description,
    };

    fetch(`/api/v1/boards/${boardId}/lists/${listId}/cards/${cardId}`, {
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