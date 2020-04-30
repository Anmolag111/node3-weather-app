const express = require('express')
const request=require('request')
const path=require('path')
const hbs=require('hbs')
const app = express()
const port=process.env.PORT || 3000
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//Defining path for express config
const dirName=path.join(__dirname,'../public')
const views=path.join(__dirname,'../templates/views')
const partials=path.join(__dirname,'../templates/partials')

//Set up handlebars engine and views location(for dynamic pages)
app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partials)

//Set up static dir to serve
app.use(express.static(dirName))

app.get('', (req, res) => {
 res.render('index',{
        title:"Weather",
        name:"Anmol"
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        message:"Can I help u?",
        title:"Help",
        name:"Anmol"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:"About me",
        name:"Anmol"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Please provide address"
        })
       }

       geocode(req.query.address, (error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({error})
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
            console.log(location)
            console.log(forecastData)
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:"Help",
        name:"Anmol",
        errormsg:"Help page does not found"
    })
    
})

app.get('*', (req, res) => {
    res.render('404',{
        title:"About me",
        name:"Anmol",
        errormsg:"404 page"
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})