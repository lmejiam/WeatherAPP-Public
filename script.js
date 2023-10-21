
const KEY = "fad014c1173ac1371591b4166d63b2f4"
var units = "imperial"
let place = "San Pedro Sula"
let latitude = 0
let longitude = 0


async function getTemps(lat,lon){
    
    let current = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`)
    let jcurrent = await current.json()

    let forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}`)
    let jforecast = await forecast.json(); 

    console.log(jcurrent)

    let cityname = jcurrent.name

    let todayMin = await jcurrent.main.temp_min
    let todayMax = await jcurrent.main.temp_max

    let tomorrowMin = await jforecast.list[4].main.temp_min
    let tomorrowMax = await jforecast.list[4].main.temp_max
    
    el = document.querySelector("#todayhigh")
    el.innerHTML= await `${todayMax}°`

    el = document.querySelector("#todaylow")
    el.innerHTML= await `${todayMin}°`

    el = document.querySelector("#tomorrowhigh")
    el.innerHTML= await `${tomorrowMax}°`

    el = document.querySelector("#tomorrowlow")
    el.innerHTML= await `${tomorrowMin}°`

    el = document.querySelector(".city")
    el.innerHTML = await `${cityname}`

    el = document.querySelector("#todayweather")
    el.innerHTML = await `${jcurrent.weather[0].description}`

    el = document.querySelector("#tomorrowweather")
    el.innerHTML = await `${jforecast.list[4].weather[0].description}`

    todaydescription = jcurrent.weather[0].main
    getImages(todaydescription, "today")

    tomorrowdescription = jforecast.list[4].weather[0].main
    getImages(tomorrowdescription, "tomorrow")
}

function changeUnits(element){
    unit = element.value;

    if(unit=="f"){
        units = "imperial"
    }
    else if(unit =="c"){
        units = "metric"
    }

    getTemps(latitude,longitude)
}

function getCity(){
    let el = document.querySelector("#citysearch")
    let citysearch = el.value

    if(citysearch == ""){
        findCoordinates(place)
    }else{
        place = citysearch
        findCoordinates(citysearch)
    }
}

function getImages(description, day){
    let source = ""
    if(description == 'Clouds'){
        source ="assets/some_clouds.png"
    }else if(description == 'Clear'){
        source = "assets/some_sun.png"
    }else{
        // Need more images for other conditions like snow, or ice
        source = "assets/some_rain.png"
    }
    el = document.querySelector(`.pic${day}`)
    el.innerHTML = `<img src ="${source}" alt="weatherrepresentation" class="weatherpic">`

}


async function findCoordinates(city){
    
    let coord = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=fad014c1173ac1371591b4166d63b2f4`)
    let jcoord = await coord.json()
    longitude = jcoord[0].lon
    latitude = jcoord[0].lat;

    getTemps(latitude,longitude)
}

function changeColor(element, color){
    element.style.color = color;

}

findCoordinates(place)