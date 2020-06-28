import React, {Component} from 'react'
import {StyleSheet, View, Button, Text, Image} from 'react-native'
import TextInput from 'react-native-web/dist/exports/TextInput'
import Service from './component/wheather/api/fetch'
import Weather from './component/wheather/weather'
import sun from './assets/sun.png'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: null,
      text: null,
    }
  }


  getInfo(q) {
    if (!q) {
      return null
    } else {
      Service.API(q).then((json) => {
        if (json.cod === 200) {
          this.setState({city: json, error: null})
        } else {
          this.setState({city: null, error: 'Город не найден'})
          console.log(json)
        }
      })
    }
  }


  render() {


    return (
        <View style={styles.container}>
          <Image source={sun} style={styles.image}/>
          <Text style={styles.title}> Tastaur's weather App </Text>
          <Text style={styles.subtitle}> Введите название города, чтобы узнать
            погоду</Text>
          <TextInput style={styles.input}
                     onChangeText={(text) => this.setState({text: text})}
          />
          <Button title={'Узнать погоду'} onPress={() => this.getInfo(this.state.text)}/>
          {this.state.city ? <Weather response={this.state.city}/> : null}
          {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {height: '100px', width: '100px', marginBottom: '10px'},
  title: {fontFamily: 'Roboto', fontSize: '24px', fontWeight: 'bold', marginBottom: '10px'},
  subtitle: {fontFamily: 'Roboto', fontSize: '16px', marginBottom: '10px'},
  error: {fontFamily: 'Roboto', fontSize: '20px', marginTop: '10px', color: 'red'},
  input: {height: '40px', borderColor: 'black', borderWidth: '1px', padding: '3px', marginBottom: '10px', fontSize: '16px'},
})

export default App
