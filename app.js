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
  res.render('index', { shopList: restaurantList.results })
})


//直接在畫面上點選圖片
app.get('/restaurants/:shopList', (req, res) => {
  const SoleRestaurant = restaurantList.results.filter(
    function (item) {
      return item.id == req.params.shopList
    })
  res.render('show', { shopList: SoleRestaurant })
})




app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})