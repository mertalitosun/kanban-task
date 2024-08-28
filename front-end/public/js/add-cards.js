document.getElementById('addCardForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const pathParts = window.location.pathname.split('/');

    const boardId = pathParts[2]; 
    const listId = pathParts[4]; 

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const color = document.getElementById('color').value;

    const formData = {
        name: name,
        description:description,
        color:color
    };

    fetch(`/api/v1/boards/${boardId}/lists/${listId}/cards`, {
        method: 'POST',
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
            alert('Kayıt başarısız: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});