document.addEventListener("DOMContentLoaded", () => {
    const deleteMember = document.getElementById("delete-member");
    const pathParts = window.location.pathname.split('/');

    const boardId = pathParts[2]; 
    const memberId = pathParts[4]; 
    deleteMember.addEventListener("click",()=>{
        fetch(`/api/v1/boards/${boardId}/members/${memberId}`,{
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
