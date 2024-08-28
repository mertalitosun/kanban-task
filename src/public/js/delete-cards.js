document.addEventListener("DOMContentLoaded", () => {
    const deleteCard = document.getElementById("delete-card");
    const pathParts = window.location.pathname.split('/');

    const boardId = pathParts[3]; 
    const listId = pathParts[5]; 
    const cardId = pathParts[7]; 
    deleteCard.addEventListener("click",()=>{
        fetch(`/api/v1/boards/${boardId}/lists/${listId}/cards/${cardId}`,{
            method:"DELETE",
        })
        .then(response =>response.json())
        .then(data => {
            console.log(data)
            if (data.success) {
                alert(data.message)
                window.location.href = `/boards/${boardId}`;
            } else {
                alert('Silme İşlemi başarısız: ' + data.message);
            }
        })
        .catch(error => console.error('Hata:', error));
    })
});
