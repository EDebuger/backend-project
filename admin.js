class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static async fetchUser(name) {
    try {
      const eName = encodeURIComponent(name);
      const response = await fetch(`http://localhost:3009/getUserByName/${eName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
      if (!response.ok) throw new Error(`Fetch failed ${response.status}`);
      const usersData = await response.json();
      const users = usersData.map(u => new User(u.ID, u.userName, u.userEmail));
      this.displayUsers(users);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      this.displayUsers([]); // show empty / error state
    }
  }

  static async fetchUsers() {
    try {
      const response = await fetch('http://localhost:3009/getUsers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
      if (!response.ok) throw new Error(`Fetch failed ${response.status}`);
      const usersData = await response.json();
      const users = usersData.map(u => new User(u.ID, u.userName, u.userEmail));
      this.displayUsers(users);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      this.displayUsers([]);
    }
  }


  // Render into the existing #usersResults element (no modal)
  static displayUsers(users) {
    const out = document.getElementById('usersResults');
    out.innerHTML = '';
    if (!users || users.length === 0) { // if it got nothing
      out.textContent = 'No users found.';
      return;
    }

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';

    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    ['ID', 'Name', 'Email'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      th.style.border = '1px solid #ccc';
      th.style.padding = '8px';
      th.style.textAlign = 'left';
      headerRow.appendChild(th);
    });

    const tbody = table.createTBody(); // everything to be displayed inside the table
    users.forEach(user => {
      const row = tbody.insertRow();
      const idCell = row.insertCell();
      const nameCell = row.insertCell();
      const emailCell = row.insertCell();

      idCell.textContent = user.id ?? ''; // expect any
      nameCell.textContent = user.name ?? '';
      emailCell.textContent = user.email ?? '';

      [idCell, nameCell, emailCell].forEach(cell => {
        cell.style.border = '1px solid #ccc';
        cell.style.padding = '8px'; // simple styling
      });
    });

    out.appendChild(table);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Hook the existing buttons/inputs
  const allUsersBtn = document.getElementById('viewUsersButton'); // shows all of them
  const searchBar = document.getElementById('searchUser'); // search for one
  const searchUserBtn = document.getElementById('searchUserBtn'); // can press this button,alternatively press Enter

  // Show users section and fetch users
const openUsersBtn = document.getElementById('openUsersBtn');
const usersSection = document.getElementById('usersSection');

function hideAllSections() {
  document.getElementById('usersSection').classList.add('hidden');
  document.getElementById('addProductSection').classList.add('hidden');
  document.getElementById('deleteProductSection').classList.add('hidden');
}

openUsersBtn.addEventListener('click', async () => {// when the users button is pressed
  hideAllSections();
  usersSection.classList.remove('hidden');
  // use the fetch to get all the users immediatly
  await User.fetchUsers();
});

  allUsersBtn.addEventListener('click', () => { User.fetchUsers(); });

  searchUserBtn.addEventListener('click', () => {
    const param = (searchBar.value || '').trim();
    if (param) {
      User.fetchUser(param);
      searchBar.value = ''; // reset input
    } else {
      alert('Nothing typed');
    }
  });

  searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchUserBtn.click(); // Enter is pressed and fires off the fucntion
  });
});