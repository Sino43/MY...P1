document.addEventListener('DOMContentLoaded', function() {
    var stripe = Stripe('your-stripe-public-key');
    var donateButton = document.getElementById('donateButton');
  
    donateButton.addEventListener('click', async function() {
      var amount = document.getElementById('amount').value;
      var { error, token } = await stripe.createToken('card');
  
      if (error) {
        console.error('Error:', error);
        alert('Failed to create token');
        return;
      }
  
      var response = await fetch('http://localhost:5000/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount, token })
      });
  
      var result = await response.json();
  
      if (result.success) {
        alert('Donation successful');
      } else {
        alert('Donation failed');
      }
    });
  });
  