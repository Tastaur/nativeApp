import React, {Component} from 'react'
import './api/fetch'
import {Text, View, Image, StyleSheet} from 'react-native'

class Weather extends Component {

  constructor(props) {
    super(props)

    this.state = {
      weatherList: props.response,
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.response !== this.props.response) {
      this.setState({
        weatherList: this.props.response,
      })
    }
  }

  windDerection = (direction) => {
    if (direction > 1 && direction <= 89) {
      return 'Северо-восточный'
    } else if (direction >= 91 && direction <= 179) {
      return 'Юго-восточный'
    } else if (direction >= 181 && direction <= 269) {
      return 'Юго-Западный'
    } else if (direction >= 271 && direction <= 359) {
      return 'Северо-Западный'
    } else if (direction === 0) {
      return 'Северный'
    } else if (direction === 90) {
      return 'Восточный'
    } else if (direction === 180) {
      return 'Южный'
    } else if (direction === 270) {
      return 'Западный'
    }
  }

  renderWeather(city) {
    let print = <Text>Loading...</Text>
    if (city !== null) {
      print = <View style={{width: '100%', marginBottom: 10, flex: 1, flexDirection: 'column'}}>
        <Text style={styles.text}>Город: {this.state.weatherList.name}</Text>
        <Image style={{height: '100px'}}
               source={`http://openweathermap.org/img/wn/${this.state.weatherList.weather[0].icon}@2x.png`}
        />
        <Text style={styles.text}>{this.state.weatherList.weather[0].description}</Text>
        <Text style={styles.text}>Температура : {Number(this.state.weatherList.main.temp - 273.15).toFixed()}&ordm;</Text>
        <Text style={styles.text}>Ветер
          : {this.windDerection(this.state.weatherList.wind.deg)} {this.state.weatherList.wind.speed} м/c </Text>

      </View>
    }

    return print
  }

  render() {
    return (
        <div>
          {this.renderWeather(this.state.weatherList)}
        </div>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    justifyContent: 'center',
    fontSize: '15px',
    marginTop: '10px'
  },
})
export default Weather
