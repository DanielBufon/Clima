const search = document.getElementById("search")
const button = document.getElementById("button-confirm")
const image = document.getElementById("image")
const temp = document.getElementById("temperatura")
const desc = document.getElementById("descricao")
const local = document.getElementById("local")
const apikey = ""

button.addEventListener("click", ()=>{  
  getAPI (search.value)
})

search.addEventListener("keydown", (event)=>{
  //veriica se a tecla pressionada é o enter
  console.log(event)
  if(event.key== "Enter"){
    getAPI (search.value)
  }
})

function getAPI(cidade){
  fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apikey}&lang=pt_br`).then (response=>{
    return response.json()
}).then(data=>{
  console.log(data)
  if (data.cod === "404"){ 
    image.src = "assets/no-results.png"
    temp.innerText=""
    desc.innerText=""
    local.innerText = "digite novamente,local não encontrado"
    search.value = ""
  }
  else{
    switch(data.weather[0].main){
        case "Clear": image.src = "assets/sun.png"
        break;
        case "Rain":image.src = "assets/rain.png"
        break;
        case "Snow":image.src = "assets/snow.png"
        break;
        case "Clouds": image.src = "assets/clouds.png"
        break;
        default: image.src = "assets/clouds.png"
        break;
    }
    local.innerText = "Local: " + data.name
    temp.innerHTML = "Temperatura máxima: " + data.main.temp_max + "°C" + "<br> Temperatura mínima: " + data.main.temp_min + "°C"
    desc.innerText = "Descrição: " + data.weather[0].description
    search.value = ""
  }
})
}