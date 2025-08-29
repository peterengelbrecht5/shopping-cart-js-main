/**
 * ! Used to calculate total amount of the selected Products
 * ! with specific quantity
 * ? When basket is blank, it will show nothing
 */
let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItemsData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button onclick="initiateYocoCheckout(${amount * 100})" class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `);
  } else return;
};

/**
 * ! Initiates Yoco payment popup with the total amount
 */
function initiateYocoCheckout(amountInCents) {
  const yoco = new window.YocoSDK({
    publicKey: 'pk_test_e68f32fe9AZKeP173754', // Your Yoco Test Public Key
  });
  yoco.showPopup({
    amountInCents: amountInCents, // Total in cents (e.g., $45 = 4500 cents)
    currency: 'ZAR',
    title: 'Clothing Store',
    description: 'Payment for your order',
    callback: function (result) {
      if (result.error) {
        alert('Payment failed: ' + result.error.message);
      } else {
        alert('Payment successful! Payment ID: ' + result.id);
        clearCart(); // Clear cart after successful payment
      }
    },
  });
}
