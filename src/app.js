const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Andrew'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew'
    })
})

app.get('/products', (req, res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    return res.send({
        products: []
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must enter a address'
        })
    } else {
        geocode(req.query.address, (error, {latitude,longitude,location}={})=>{
            if(error){
                return res.send({
                    error: error
                })
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error: error
                    })
                }
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })
            })
        })

    }
  
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        errortext: 'Help article not found.',
        title: '404 Error',
        name: 'Andrew'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        errortext: 'Page not found.',
        title: '404 Error',
        name: 'Andrew'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})