document.addEventListener("DOMContentLoaded", () => {
    const deleteList = document.getElementById("delete-list");
    const pathParts = window.location.pathname.split('/');

    const boardId = pathParts[3]; 
    const listId = pathParts[5]; 
    deleteList.addEventListener("click",(e)=>{
        e.preventDefault()
        fetch(`/api/v1/boards/${boardId}/lists/${listId}`,{
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
