const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const path=require('path')
const express=require('express')
const app=express()
const hbs=require('hbs')

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Ashutosh'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Ashutosh'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'you can take help from this page',
        title:'help',
        name:'Ashutosh'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return console.log(error)
        }
        
        forecast(latitude,longitude,(error,forecastdata)=>{
          if(error){
            return console.log(error)
          }
          res.send({
              forecast:forecastdata,
              location:location,
              address:req.query.address
          })
          
        })
       })
})       
    
app.get('/products',(req,res)=>{
    if(!req.query.search){
     return res.send({
          error:'you must provide a search term'
      })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})   
app.get('/help/*',(req,res)=>{
    res.render('404',{
       title:'404',
       name:'Ashutosh',
       errorMessege:'Help article  not found'
    })
})
app.get('*',(req,res)=>{
   res.render('404',{
       title:'404',
       name:'Ashutosh',
       errorMessege:'Page not found'
   })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000.')

})
