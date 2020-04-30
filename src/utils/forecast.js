const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=bbb43972ead47f1ace7384ee21f34387&query='+latitude+','+longitude
    request({ url: url, json: true }, (error,{body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions+'. It is currently '+body.current.temperature+' degress out. It feels like '+body.current.feelslike+' degress out.')
        }
    })
}

module.exports = forecast