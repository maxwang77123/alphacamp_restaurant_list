const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

//setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting stactic files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { shops: restaurantList.results })
})


//直接在畫面上點選圖片
app.get('/restaurants/:shopID', (req, res) => {
  const shop = restaurantList.results.find
    (shop => shop.id.toString() === req.params.shopID)
  res.render('show', { shop: shop })
})


//search功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const shops = restaurantList.results.filter(shop => {
    return shop.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { shops: shops })
})



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})