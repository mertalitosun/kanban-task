document.getElementById('addboardForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;

    const formData = {
        name: name,
    };
    fetch('/api/v1/boards', {
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
            window.location.href = '/boards';
        } else {
            alert('Kayıt başarısız: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});