document.getElementById('addListForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    let boardId = window.location.pathname.split('/'); 
    boardId = boardId[2]

    const name = document.getElementById('name').value;

    const formData = {
        name: name,
       
    };

    fetch(`/api/v1/boards/${boardId}/lists/`, {
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