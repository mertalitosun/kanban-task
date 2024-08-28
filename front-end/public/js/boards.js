document.addEventListener("DOMContentLoaded", function() {
    
    fetch('/api/v1/boards', {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const boardsContainer = document.getElementById("boardsContainer");
            data.data.forEach(board => {
                const boardElement = document.createElement("div");
                boardElement.classList.add("board","card")
                boardElement.innerHTML = `
                <a href="/boards/${board._id}">${board.name}</a>
            `;
            boardsContainer.appendChild(boardElement);
            });
        } else {
            alert("Boardlar yüklenemedi: " + data.message);
        }
    })
    .catch(error => console.error('Hata:', error));
});
