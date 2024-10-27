const request = require('request')

const geocode = (address, callback) => {
    const api_key = 'pk.eyJ1IjoidGFrdW1pMDc5IiwiYSI6ImNtMjlxZHRoZzA4aDEyaXB6YjZhdW1nNHIifQ._irzT8flAwfYJqWmgevSIQ'
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=${api_key}&limit=1`
    request({ url, json: true }, (error, {body}) => {
            if(error){
                callback('Unable to connect to location service!', undefined)
            } else if(body.features.length === 0){
                callback('Unable to find location. Try another search.', undefined)
            } else {
                callback(undefined,{
                    latitude: body.features[0].properties.coordinates.latitude,
                    longitude: body.features[0].properties.coordinates.longitude,
                    name: body.features[0].properties.name 
                })
            }
        })
}

module.exports = geocode