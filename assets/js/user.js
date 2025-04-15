

document.addEventListener('DOMContentLoaded', () => {
  fetchUserInvestments();
});

// Fetch user's investments from the backend
async function fetchUserInvestments() {
  try {
    const response = await fetch('https://your-backend.onrender.com/api/user/investments', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
    });
    
    const data = await response.json();
    
    if (data.success) {
      displayInvestments(data.investments);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error fetching investments:', error);
  }
}

// Display investments on the user's dashboard
function displayInvestments(investments) {
  const investmentList = document.getElementById('investmentList');
  investmentList.innerHTML = ''; // Clear current list

  investments.forEach(investment => {
    const investmentItem = document.createElement('div');
    investmentItem.classList.add('investment-item');
    investmentItem.innerHTML = `
      <p>Investment ID: ${investment._id}</p>
      <p>Amount: $${investment.amount}</p>
      <p>Status: ${investment.status}</p>
      <button onclick="viewInvestmentDetails('${investment._id}')">View Details</button>
    `;
    investmentList.appendChild(investmentItem);
  });
}

// View details of an investment (optional functionality)
async function viewInvestmentDetails(investmentId) {
  try {
    const response = await fetch(`https://your-backend.onrender.com/api/user/investments/${investmentId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert(`Investment Details:\nAmount: $${data.investment.amount}\nStatus: ${data.investment.status}`);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error viewing investment details:', error);
  }
}
