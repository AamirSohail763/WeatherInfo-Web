
//URL https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const api_key = "be1f19db9323a8159a3dbcc1b08df4c1";

async function getData(){
    let city = document.getElementById("city").value;
    
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    let res = await fetch(url);
    
    let data = await res.json();
    display(data);

    console.log(data)
}

function display(data){

    let container = document.getElementById('info-box')
    container.innerHTML = null;

    let h2 = document.createElement('h2')
    h2.innerText= data.name;

    let h4 = document.createElement("h4")
    h4.innerText="Weather Today"

    let p1 = document.createElement('h2')
    p1.innerText= `${Math.floor(data.main.temp-273)}°C`

    let p4 = document.createElement('p')
    p4.innerText= `Feels Like:  ${Math.floor(data.main.feels_like-273)}°C`

    let p5 = document.createElement('p')
    p5.innerText = data.weather[0].main;

    let p6 = document.createElement('p')
    p6.innerText = `Humidity: ${data.main.humidity}%`;

    let p7 = document.createElement('p')
    p7.innerText = `Wind: ${data.wind.speed}km/hr`;

    let p2 = document.createElement('p')
    p2.innerText= `Max: ${Math.floor(data.main.temp_max-273)}°C`
    p2.style.fontSize="20px"

    let p3 = document.createElement('p')
    p3.innerText= `Min: ${Math.floor(data.main.temp_min-275)}°C`

    let btn2 = document.createElement("button")
    btn2.setAttribute("id","btn-2")
    btn2.innerText= "Next 6-Days Forecast"
    btn2.addEventListener("click",getForecast)

    container.style.boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px";

    container.append(h2,h4,p1,p5,p4,p2,p3,p6,p7,btn2)

    let iframe = document.getElementById("gmap_canvas")
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}

//src="https://maps.google.com/maps?q=Patna&t=&z=13&ie=UTF8&iwloc=&output=embed"

async function getForecast(){
    let city = document.getElementById("city").value;
    // const api_key = "be1f19db9323a8159a3dbcc1b08df4c1";

    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`

    let res = await fetch(url);
    
    let data = await res.json();
    showForecast(data.list);

    console.log(data.list)

} 

function showForecast(data)
{
    let forecastBox = document.getElementById("forecast-box")
    forecastBox.style.boxShadow ="rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px";
    forecastBox.innerHTML= null;
    for(var i=0;i<40;i+=7)
    {
        var card = document.createElement("div")
        card.setAttribute("class","card")

        var date = document.createElement("h3")
        let d = new Date(data[i].dt_txt)
        let day = d.getDay();
        switch(day)
        {
            case 0 : date.innerText="Sun";
            break;
            case 1 : date.innerText="Mon";
            break;
            case 2 : date.innerText="Tue";
            break;
            case 3 : date.innerText="Wed";
            break;
            case 4 : date.innerText="Thu";
            break;
            case 5 : date.innerText="Fri";
            break;
            case 6 : date.innerText="Sat";
            break;
        }

        var max = document.createElement('p')
        max.innerText=`${Math.floor(data[i].main.temp_max-273)}°C`

        var min = document.createElement('p')
        min.innerText=`${Math.floor(data[i].main.temp_min-275)}°C`

        card.append(date,max,min);

        forecastBox.append(card)
    }
}

