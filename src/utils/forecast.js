const request=require('request')
const forecast=(lat,lon,callback)=>{
const url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&appid=62b9ecc128a80954aa661b2384654e9a'
request({url,json:true},(error,{body}) => {
    if(error){
        callback('cheak your Internet connection!',undefined)
    }else{
    callback(undefined,{
     name:body.name,
     temperature:body.main.temp,
     humidity:body.main.humidity,
     wind_speed:body.wind,
     description:body.weather[0].description,
     
        })
    }
  })
}
module.exports=forecast