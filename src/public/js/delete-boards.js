document.addEventListener("DOMContentLoaded", () => {
    const deleteBoard = document.getElementById("delete");
    const boardId = window.location.pathname.split('/').pop(); 
    deleteBoard.addEventListener("click",()=>{
        fetch(`/api/v1/boards/${boardId}`,{
            method:"DELETE"
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
        .catch(error => console.error('Hata:', error));
    })
});
