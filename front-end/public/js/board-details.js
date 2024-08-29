document.addEventListener("DOMContentLoaded", function() {
    const boardId = window.location.pathname.split('/').pop(); 
    fetch(`/api/v1/boards/${boardId}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const boardNameElement = document.getElementById("boardName");
            const deleteBoard = document.getElementById("delete-board");//board sil
            const addList = document.getElementById("add-list");//liste ekle
            const members = document.getElementById("members");//üyeler
            boardNameElement.textContent = data.board.name;
            
            const listsContainer = document.getElementById("listsContainer");
            
            data.listsWithCards.forEach(list => {
                const listElement = document.createElement("div");
                listElement.classList.add("list", "card");
                deleteBoard.href=`/delete/boards/${boardId}`//board sil
                addList.href=`/boards/${boardId}/lists` //liste ekle
                members.href=`/boards/${boardId}/members` //üyeler
                listElement.innerHTML = `
                    <div class="d-flex justify-content-between"> 
                        <h3 id="name">${list.name} <a href="/update/boards/${boardId}/lists/${list._id}" id="edit"><i class="bi bi-pencil-square"></i></a></h3>
                        <div class="d-flex justify-content-between">
                            <a href="/boards/${boardId}/lists/${list._id}" class="m-1"> <i class="bi bi-trash"></i></a>
                        </div>
                    </div>
                    <hr>
                    <a href="/boards/${boardId}/lists/${list._id}/cards" class="ms-auto">Kart Ekle +</a>
                    <div class="tasks">
                        ${list.cards.map(card => `
                        <div class="task" style="background-color:${card.color}; margin-top:5px;">
                            <div class="d-flex justify-content-between">
                                <h6>${card.name}</h6> 
                                <a href="/delete/boards/${boardId}/lists/${list._id}/cards/${card._id}">
                                    <i class="bi bi-trash"></i>
                                </a>
                            </div>
                            <p>${card.description}</p>
                        </div>`).join('')}
                    </div>
                `;
                listsContainer.appendChild(listElement);
            });
        } else {
            alert("Board detayları yüklenemedi: " + data.message);
            window.location.href = `/login`;

        }
    })
    .catch(error => console.error('Hata:', error));
});
