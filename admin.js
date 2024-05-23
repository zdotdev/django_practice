async function getAllOrders () {
  try {
    const response = await fetch(
      'https://dreamy-cheesecake-3ef878.netlify.app/.netlify/functions/API/'
    )
    const data = await response.json()
    let array = []
    let businessNameSet = new Set()

    Object.keys(data).forEach(key => {
      array.push(data[key].orderPrices.reduce((a, b) => a + b, 0))
      businessNameSet.add(data[key].businessId)
    })

    let businessName = Array.from(businessNameSet)

    businessName.forEach(async bName => {
      const businessNames = await fetch(
        `https://dreamy-cheesecake-3ef878.netlify.app/.netlify/functions/API/${bName}`
      )
      const businessData = await businessNames.json()
      const ordersByBusiness = businessData.map(item =>
        item.orderPrices.reduce((a, b) => a + b, 0)
      )
      const reducedOrders = ordersByBusiness.map(order => order)
      document.getElementById(
        'main'
      ).innerHTML += `<p>Business Name: ${bName}, Total Sales: ₱${reducedOrders.reduce(
        (a, b) => a + b,
        0
      )}</p>`
    })
  } catch (err) {
    console.log(err)
  }
}
getAllOrders()
