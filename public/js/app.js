console.log('client side javascript file is loaded')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#location')
const messageTwo=document.querySelector('#forecast')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    messageOne.textContent='Loading...'
    
    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            const forecast="It is currently "+ data.forecast.temperature +" degree out and "+ data.forecast.description +" in "+ data.forecast.name +" with humidity "+ data.forecast.humidity+" and wind speed is "+data.forecast.wind_speed.speed+" km/hr at "+data.forecast.wind_speed.deg+" degree"; 
            if(data.error){
             messageOne.textContent=data.error
             messageTwo.textContent=''
             document.getElementById('img-icon').src='/img/clouds.png'
            }else{
             messageOne.textContent=data.location
             messageTwo.textContent=forecast
             if(data.forecast.description=='clear sky'|| data.forecast.description=='sunny'){
                 document.getElementById('img-icon').src='/img/sun-moon.jpg'
            }else if(data.forecast.description=='scattered clouds'|| data.forecast.description=='overcast clouds'||data.forecast.description=='few clouds'||data.forecast.description=='clouds'||data.forecast.description=='broken clouds'){
                document.getElementById('img-icon').src='/img/cld.png'
            }else if(data.forecast.description=='light rain'|| data.forecast.description=='heavy rain'||data.forecast.description=='rain'){
                document.getElementById('img-icon').src='/img/rain.jpg'
            }else {
                document.getElementById('img-icon').src='/img/haze.jpg'
            }
                
            }
        })
    })
})