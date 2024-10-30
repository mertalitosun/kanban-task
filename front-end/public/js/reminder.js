document.getElementById('reminderForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const pathParts = window.location.pathname.split('/');

    const boardId = pathParts[3]; 
    const listId = pathParts[5]; 
    const cardId = pathParts[7]; 

    const email = document.getElementById('email').value;
    const datetime = document.getElementById('datetime').value;
    const cardName = document.getElementById('cardName').value;
    const cardDescription = document.getElementById('cardDescription').value;
    const formData = {
        email: email,
        datetime:datetime,
        cardName,
        cardDescription
    };

    fetch(`/api/v1/reminder/boards/${boardId}/lists/${listId}/cards/${cardId}`, {
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
            alert('Hatırlatma İşlemi Başarısız: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});