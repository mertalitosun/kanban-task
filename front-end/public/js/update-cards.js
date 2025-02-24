document.addEventListener("DOMContentLoaded", function() {
    const pathParts = window.location.pathname.split('/');
    const boardId = pathParts[3]; // Board ID'sini al
    const listId = pathParts[5]; // Liste ID'sini al
    const cardId = pathParts[7]; // Kart ID'sini al

    // Kart bilgilerini al ve inputlara yükle
    fetch(`/api/v1/boards/${boardId}/lists/${listId}/cards/${cardId}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            console.log('API yanıtı:', data);
            const card = data.card; // Kart bilgilerini al
            const nameInput = document.getElementById("name");
            const descriptionInput = document.getElementById("description");

            // Inputlara kart bilgilerini yerleştir
            nameInput.value = card.name;
            descriptionInput.value = card.description;
        } else {
            alert("Kart bilgileri yüklenemedi: " + data.message);
        }
    })
    .catch(error => console.error('Hata:', error));

    // Form gönderim olayını dinle
    document.getElementById('updateCards').addEventListener('submit', function(event) {
        event.preventDefault(); 

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const formData = {
            name: name,
            description: description,
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
                alert(data.message);
                window.location.href = `/boards/${boardId}`;
            } else {
                alert('Güncelleme İşlemi Başarısız: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
