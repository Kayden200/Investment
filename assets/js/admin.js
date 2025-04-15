

document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
  fetchTransactions();
});

// Fetch users for admin to manage
async function fetchUsers() {
  try {
    const response = await fetch('https://your-backend.onrender.com/api/admin/users', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    });
    
    const data = await response.json();
    
    if (data.success) {
      displayUsers(data.users);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Display users in the admin dashboard
function displayUsers(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = ''; // Clear current list

  users.forEach(user => {
    const userItem = document.createElement('div');
    userItem.classList.add('user-item');
    userItem.innerHTML = `
      <p>Username: ${user.username}</p>
      <p>Email: ${user.email}</p>
      <p>Status: ${user.status}</p>
      <button onclick="toggleUserStatus('${user._id}')">${user.status === 'active' ? 'Deactivate' : 'Activate'}</button>
    `;
    userList.appendChild(userItem);
  });
}

// Toggle user status between active/inactive
async function toggleUserStatus(userId) {
  try {
    const response = await fetch(`https://your-backend.onrender.com/api/admin/toggleUserStatus/${userId}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        'Content-Type': 'application/json' 
      }
    });
    
    const data = await response.json();
    
    if (data.success) {
      fetchUsers(); // Re-fetch user list after updating
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error toggling user status:', error);
  }
}

// Fetch transactions for admin to review
async function fetchTransactions() {
  try {
    const response = await fetch('https://your-backend.onrender.com/api/admin/transactions', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
    });
    
    const data = await response.json();
    
    if (data.success) {
      displayTransactions(data.transactions);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

// Display transactions in the admin dashboard
function displayTransactions(transactions) {
  const transactionList = document.getElementById('transactionList');
  transactionList.innerHTML = ''; // Clear current list

  transactions.forEach(transaction => {
    const transactionItem = document.createElement('div');
    transactionItem.classList.add('transaction-item');
    transactionItem.innerHTML = `
      <p>Transaction ID: ${transaction._id}</p>
      <p>User: ${transaction.user.username}</p>
      <p>Amount: $${transaction.amount}</p>
      <p>Status: ${transaction.status}</p>
    `;
    transactionList.appendChild(transactionItem);
  });
}
