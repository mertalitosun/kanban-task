document.addEventListener("DOMContentLoaded", function() {
    const boardId = window.location.pathname.split('/').pop(); 
    fetch(`/api/v1/boards/${boardId}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const boardNameElement = document.getElementById("boardName");
            boardNameElement.textContent = data.board.name;
            
            const listsContainer = document.getElementById("listsContainer");
            
            data.listsWithCards.forEach(list => {
                const listElement = document.createElement("div");
                listElement.classList.add("list", "card");
                listElement.innerHTML = `
                    <div class="d-flex justify-content-between"> 
                        <h3>${list.name}</h3>
                        <a href="/boards/${boardId}/lists/${list._id}/cards">+</a>
                    </div>
                    <div>
                        ${list.cards.map(card => `<div class="task" style="background-color:${card.color} ;"><h6>${card.name}</h6> <p>${card.description}</p></div>`).join('')}
                    </div>
                `;
                listsContainer.appendChild(listElement);
            });
        } else {
            alert("Board detayları yüklenemedi: " + data.message);
        }
    })
    .catch(error => console.error('Hata:', error));
});
