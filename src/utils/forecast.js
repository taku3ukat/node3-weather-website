const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = `https://api.weatherstack.com/current?access_key=705463d499bd931ee614eceae7951a56&query=${latitude},${longitude}&units=f`
    request({ url, json: true }, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location', undefined)
        } else {
            const massage_degree = `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.feelslike} feelslike.Humidity is ${body.current.humidity}`
            callback(undefined, massage_degree)
        }
    })
}

module.exports = forecast