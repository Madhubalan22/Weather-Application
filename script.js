let lat;
let lon;
let locationName=document.getElementById("locationName")
let setIcon = document.getElementById("icon")
let description=document.getElementById("description")
let temperature=document.getElementById("temp")
let mintemp=document.getElementById("minTemp")
let maxtemp=document.getElementById("maxTemp")
let windspeed=document.getElementById("windSpeed")

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position => {
        lat  = position.coords.latitude;
        lon = position.coords.longitude;

        console.log("latitude"+lat+","+"longitude"+lon);
        let data=await getWeatherData(lat,lon);
        
        var map = L.map('map').setView([lat,lon], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([lat,lon]).addTo(map);
    marker.bindPopup(`<b>${data.name}</b>`).openPopup();
  
    
    map.on('click', async function(e){
        const data=await getWeatherData(e.latlng.lat,e.latlng.lng)
        marker.setLatLng([e.latlng.lat,e.latlng.lng])
        marker.bindPopup(`<b>${data.name}</b>`).openPopup();
    });

    return data;
    })

};
async function getWeatherData(lat,lon){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=2f76853a64696c48ccc8a21164781f02`
    let response=await fetch(api)
    let data=await response.json()
    console.log(data)
    dataHandler(data)
    return data
}
function dataHandler(data){
    const{description}=data.weather[0]
    const{name}=data.name
    const{temp,temp_min,temp_max}=data.main
    const{speed}=data.wind
    const{icon}=data.weather[0]

    locationName.innerHTML=data.name
    description.innerHTML=description
    temperature.innerHTML=temp+"<sup>o</sup>c"
    mintemp.innerHTML="Min_Temp: "+temp_min+"<sup>o</sup>c"
    maxtemp.innerHTML="Max_Temp: "+temp_max+"<sup>o</sup>c"
    windspeed.innerHTML="windspeed: "+speed+"m/s"
    setIcon.style["background"]=`url(${setIconFunction(icon)})`


}

    function setIconFunction(icon) {
 
        const icons = {
            "01d": "./animated/day.svg",
            "02d": "./animated/cloudy-day-1.svg",
            "03d": "./animated/cloudy-day-2.svg",
            "04d": "./animated/cloudy-day-3.svg",
            "09d": "./animated/rainy-1.svg",
            "10d": "./animated/rainy-2.svg",
            "11d": "./animated/rainy-3.svg",
            "13d": "./animated/snowy-6.svg",
            "50d": "./animated/mist.svg",
            "01n": "./animated/night.svg",
            "02n": "./animated/cloudy-night-1.svg",
            "03n": "./animated/cloudy-night-2.svg",
            "04n": "./animated/cloudy-night-3.svg",
            "09n": "./animated/rainy-1.svg",
            "10n": "./animated/rainy-2.svg",
            "11n": "./animated/rainy-3.svg",
            "13n": "./animated/snowy-6.svg",
            "50n": "./animated/mist.svg"
        };
     
        return icons[icon];
    }


//let getWeatherData='https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}'

/*async function getData(){
    let res=await fetch('https://jsonplaceholder.typicode.com/users')
    let data=await res.json()
    console.log(data)

}
getData()
*/