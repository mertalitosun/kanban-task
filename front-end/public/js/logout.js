document.addEventListener("DOMContentLoaded", () => {
    const logout = document.getElementById("logout");

    logout.addEventListener("click",()=>{
        fetch(`/api/v1/logout`,{
            method:"GET"
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            window.location.href = '/login';

        })
        .catch(error => console.error('Hata:', error));

    })
});
