document.addEventListener("DOMContentLoaded", function() {
    
    let boardId = window.location.pathname.split("/");
    boardId = boardId[2]
    fetch(`/api/v1/boards/${boardId}/members`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const addMembers = document.getElementById("add-members");
            addMembers.href = `/boards/${boardId}/add/members`
            const tableBody = document.getElementById("tableBody");
            data.members.forEach(member => {
                const members = document.createElement("tr")
                members.innerHTML = `
                <tr>
                    <td>${member._id.toString() === data.board.createdBy.toString() ? `(admin)${member.firstName}`:member.firstName}</td>
                    <td>${member.lastName}</td>
                    <td>${member.email}</td>
                    <td><a href="/boards/${boardId}/members/${member._id}" class="m-1"> <i class="bi bi-trash"></i></a></td>
                </tr>
            `;
            tableBody.appendChild(members);
            });
        } else {
            alert("Üyeler yüklenemedi: " + data.message);
            window.location.href = `/boards/${boardId}`;
        }
    })
    .catch(error => console.error('Hata:', error));
});
