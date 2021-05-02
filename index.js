const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

//app.set
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use(methodOverride('_method'));

//fake DB
let coffees = [
    {
        id: uuid(),
        type: 'Iced Macchiato',
        size: 'L',
        drinker: 'Pam Beesley',
        price: 4.99
    },
    {
        id: uuid(),
        type: 'Cappucino',
        size: 'M',
        drinker: 'Michael Scott',
        price: 5.25
        
    },
    {
        id: uuid(),
        type: 'Mocha Latte',
        size: 'S',
        drinker: 'Jim Halpert',
        price: 4
    },
    {
        id: uuid(),
        type: 'Pink Drink',
        size: 'L',
        drinker: 'Kathy',
        price: 6.25
    }

]

//routes

app.get('/', (req, res) => {
    res.render('home', { coffees });
})

app.get('/coffees', (req, res) => {
    res.render('index', { coffees });
})

app.get('/coffees/new', (req, res) => {
    res.render('new');
})

app.post('/coffees', (req, res) => {
    const { type, drinker, size, price } = req.body
    coffees.push({ id: uuid(), type, drinker, size, price });
    res.redirect('/coffees')
})

app.get('/coffees/:id', (req, res) => {
    const { id } = req.params;
    const coffee = coffees.find( c => c.id === id);
    res.render('show', { coffee })
})

app.get('/coffees/:id/edit', (req, res) => {
    const { id } = req.params;
    const coffee = coffees.find( c => c.id === id);
    res.render('edit', {coffee} )
})

app.patch('/coffees/:id', (req, res) => {
    const { id } = req.params;
    const foundCoffee = coffees.find( c => c.id === id);
    foundCoffee.type = req.body.type;
    foundCoffee.size = req.body.size;
    foundCoffee.drinker = req.body.drinker;
    foundCoffee.price = req.body.price;
    res.redirect('/coffees')

})

app.delete('/coffees/:id', (req, res) => {
    const { id } = req.params;
    coffees = coffees.filter( c => c.id !== id);
    res.redirect('/coffees')
})


//server
app.listen(3000, () => {
    console.log('I love you 3000');
})