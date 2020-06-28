import Config from '../config/Config'

const Service = {
  API(q) {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${Config.apiId}&lang=ru`)
        .then((res) => res.json())
        .catch((e) => e)
  },
}



export default Service
