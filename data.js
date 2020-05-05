const fetch = require("cross-fetch")
let andijon = "http://api.openweathermap.org/data/2.5/weather?q=andijan&appid=84ad127d203f67cc8f866b381f896903"
let tashkent = "http://api.openweathermap.org/data/2.5/weather?q=tashkent&appid=84ad127d203f67cc8f866b381f896903"

let calendar = (() => {
   let n = new Date()
   let day = (()=> {
   let weekday = new Array(7)
   weekday[0] = "Yakshanba"
   weekday[1] = "Dushanba"
   weekday[2] = "Seshanba"
   weekday[3] = "Chorshanba"
   weekday[4] = "Payshanba"
   weekday[5] = "Juma"
   weekday[6] = "Shanba"
   return weekday[new Date().getDay()]
})()
   let time = (()=> {
      let raw = new Date().toTimeString()
      let h = raw.split(" ")[0].split(":")[0]
      let m = raw.split(" ")[0].split(":")[1]
      return h + ":" + m
   })()
   return {
      Yil: n.getFullYear().toString(),
      Sana: n.toDateString().split(" ")[1] + " " + n.toDateString().split(" ")[2] ,
      Hafta: day,
      Vaqt: time,
   }
})()


let andObj = {}
let toshObj = {}
fetch(andijon)
   .then(response => response.json())
   .then(data => {
      let temp = parseInt(data.main.temp - 273.15) + "°C"
      let weat = `${data.weather[0].main} (${data.weather[0].description})`
      let humidity = data.main.humidity + "%"
      let pressure = data.main.pressure + " mm sim. ust."
      andObj.time = `Bugun ${calendar.Sana}, ${calendar.Hafta} `
      andObj.temp = temp
      andObj.weat = weat
      andObj.humidity = humidity
      andObj.pressure = pressure
})
fetch(tashkent)
   .then(response => response.json())
   .then(data => {
      let temp = parseInt(data.main.temp - 273.15) + "°C"
      let weat = `${data.weather[0].main} (${data.weather[0].description})`
      let humidity = data.main.humidity + "%"
      let pressure = data.main.pressure + " mm sim. ust."
      toshObj.time = `Bugun ${calendar.Sana}, ${calendar.Hafta} `
      toshObj.temp = temp
      toshObj.weat = weat
      toshObj.humidity = humidity
      toshObj.pressure = pressure
})
module.exports = { andObj, toshObj, calendar }