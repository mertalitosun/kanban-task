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
            const boardEdit = document.getElementById("boardEdit");//board düzenle
            const addList = document.getElementById("add-list");//liste ekle
            const members = document.getElementById("members");//üyeler

            boardNameElement.textContent = data.board.name;
            
            const listsContainer = document.getElementById("listsContainer");
            
            let listsMap = {}; // Liste ID'lerini ve öğelerini saklayalım
            data.listsWithCards.forEach(list => {
                const listElement = document.createElement("div");
                listElement.classList.add("list", "card");
                listElement.setAttribute("data-list-id", list._id); // Liste ID'sini set ediyoruz
                deleteBoard.href = `/delete/boards/${boardId}`; // board sil
                addList.href = `/boards/${boardId}/lists`; // liste ekle
                members.href = `/boards/${boardId}/members`; // üyeler
                boardEdit.href = `/update/boards/${boardId}` //board düzenle
                listElement.innerHTML = `
                    <div class="d-flex justify-content-between" > 
                        <h3 id="name">${list.name} <a href="/update/boards/${boardId}/lists/${list._id}" id="edit"><i class="bi bi-pencil-square"></i></a></h3>
                        <div class="d-flex justify-content-between">
                            <a href="/delete/boards/${boardId}/lists/${list._id}" class="m-1"> <i class="bi bi-trash"></i></a>
                        </div>
                    </div>
                    <hr>
                    <a href="/boards/${boardId}/lists/${list._id}/cards" class="ms-auto">Kart Ekle +</a>
                    <div class="tasks">
                        ${list.cards.map(card => `
                        <div class="task" style="background-color:${card.color}; margin-top:5px;" draggable="true" id="${card._id}" data-old-list-id="${list._id}" cardColor="${card.color}">
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
                listsMap[list._id] = listElement; // Liste öğesini sakla
            });

            function dragStart(e) {
                e.dataTransfer.setData("text/plain", e.target.id);
                e.currentTarget.style.backgroundColor = "lightgrey";
            }

            function dragOver(e) {
                e.preventDefault();
            }

            function drop(e) {
                e.preventDefault();
                const cardId = e.dataTransfer.getData("text/plain");
                const card = document.getElementById(cardId);
                const listElement = e.target.closest('.list');
                if (listElement) {
                    const newListId = listElement.getAttribute("data-list-id");
                    const oldListId = card.getAttribute("data-old-list-id"); // Kartın eski liste ID'sini al
                    const cardColor = card.getAttribute("cardColor");
                    listElement.querySelector('.tasks').appendChild(card);
                    card.style.backgroundColor = cardColor;

                    // Kartın yeni liste ID'sini güncelle
                    card.setAttribute("data-old-list-id", newListId);

                    // Veritabanı güncellemesi
                    const formData = { listIdNumber: newListId };
                    fetch(`/api/v1/boards/${boardId}/lists/${oldListId}/cards/${cardId}`, {
                        method: "PATCH",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (!data.success) {
                            console.error("Kart güncellenirken hata oluştu:", data.message);
                        }
                    })
                    .catch(error => console.error('Hata:', error));
                }
            }

            document.querySelectorAll(".task").forEach((card) => {
                card.addEventListener("dragstart", dragStart);
            });

            document.querySelectorAll(".list").forEach((list) => {
                list.addEventListener("dragover", dragOver);
                list.addEventListener("drop", drop);
            });
        } else {
            alert("Board detayları yüklenemedi: " + data.message);
            window.location.href = `/login`;
        }
    })
    .catch(error => console.error('Hata:', error));
});
