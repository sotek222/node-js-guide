// Database
const sequelize = require('./util/db');

// Models
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');

// Node Core Modules:
const path = require('path');

// Routes:
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const resourceNotFound = require('./controllers/error');
const rootDir = require('./util/path');

// Express Modules:
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Allows for serving static files
app.use(express.static(path.join(rootDir, 'public')));
// Parses all incoming requests with a body, and returns a parsed request.
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, resp, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.error("ERROR: ", err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(resourceNotFound);


// Associations:
// Sets up the association between Products and Users
// onDelete tells Sequelize that when a User is deleted
// also delete the associated Products

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });



// This look at any models in the program
// that use the define method and checks to see if the 
// corresponding table exists and if it doesnt creates it
// force: true drops tables everytime and rebuilds them 
// but should not be used in prodution
sequelize
// .sync({ force: true })
  .sync()
  .then(result => User.findByPk(1))
  .then(user => {
    if(!user){
      return User.create({name: "Matt", email: "matt@test.com"})
    };

    return user;
  })
  .then(user => {
    console.log(user);
    app.listen(3000);
  })
  .catch(err => console.error("ERROR: ", err));


