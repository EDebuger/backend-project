class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static async fetchUsers() {
        try {
            const response = await fetch('http://localhost:3009/getUsers');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const usersData = await response.json();
            const users = usersData.map(user => new User(user.userID, user.userName, user.userEmail));
            this.displayUsers(users);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    static displayUsers(users) {
        const modal = document.createElement("div");
        modal.id = 'userModal';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.backgroundColor = 'white';
        modal.style.padding = '20px';
        modal.style.borderRadius = '10px';
        modal.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        modal.style.zIndex = '1000';

        const closeButton = document.createElement("button");
        closeButton.innerHTML = 'Close';
        closeButton.onclick = () => modal.remove();
        modal.appendChild(closeButton);

        // Create table to display user data
        const table = document.createElement("table");
        table.style.width = "100%";  // Full width
        table.style.borderCollapse = "collapse";

        // Create table header
        const header = table.createTHead();
        const headerRow = header.insertRow();
        const headers = ["ID", "Name", "Email"];
        headers.forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            th.style.border = "1px solid #ccc"; // Border for header
            th.style.padding = "10px";          // Padding for header
            th.style.textAlign = "left";         // Align text to left
            headerRow.appendChild(th);
        });

        // Create table body
        const body = table.createTBody();
        users.forEach(user => {
            const row = body.insertRow();
            const cellId = row.insertCell();
            const cellName = row.insertCell();
            const cellEmail = row.insertCell();

            cellId.textContent = user.id;
            cellName.textContent = user.name;
            cellEmail.textContent = user.email;

            // Apply basic styles
            cellId.style.border = "1px solid #ccc";   // Border for cells
            cellName.style.border = "1px solid #ccc"; // Border for cells
            cellEmail.style.border = "1px solid #ccc"; // Border for cells
            cellId.style.padding = "10px";             // Padding for cells
            cellName.style.padding = "10px";           // Padding for cells
            cellEmail.style.padding = "10px";          // Padding for cells
        });

        modal.appendChild(table);
        document.body.appendChild(modal);
    }
}

// Kör denna när knappen trycks
const usersBtn = document.getElementById("viewUsersButton");
usersBtn.addEventListener('click', () => {User.fetchUsers();});