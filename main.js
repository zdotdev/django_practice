let orderArray = []
let orderPrices = []
const urlParams = new URLSearchParams(window.location.search)
const businessId = urlParams.get('businessId')

function updateDisplay () {
  const listElement = document.getElementById('list')
  listElement.innerHTML =
    orderArray
      .map((item, index) => `${item}: ₱${orderPrices[index]}`)
      .join(', ') + '<br/><button id="place-order">Place Order</button>'
}

document.getElementById('order-form').addEventListener('submit', function (e) {
  e.preventDefault()
  let orderItem = document.getElementById('orderItem').value
  let orderPrice = parseFloat(
    document.getElementById('orderPrice').value
  ).toFixed(2)
  document.getElementById('orderItem').value = ''
  document.getElementById('orderPrice').value = ''

  orderArray.push(orderItem)
  orderPrices.push(parseFloat(orderPrice))

  updateDisplay()
})

document.getElementById('list').addEventListener('click', function (e) {
  if (e.target.id === 'place-order') {
    let data = {
      businessId: businessId,
      orderItems: orderArray,
      orderPrices: orderPrices
    }
    addOrder(data)
    document.getElementById('list').innerHTML = 'Placing order... Please wait'
  }
})

async function addOrder (order) {
  try {
    const response = await fetch(
      'https://dreamy-cheesecake-3ef878.netlify.app/.netlify/functions/API/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      }
    )
    console.log(await response.json())
    document.getElementById('list').innerHTML = 'Order Palced!'
    setTimeout(() => {
      window.location.reload()
    })
  } catch (err) {
    console.log(err)
  }
}
