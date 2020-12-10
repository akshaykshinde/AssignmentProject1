import React from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    ActivityIndicator
  } from 'react-native';
import { Button, Card, Container } from 'native-base';
import { connect } from 'react-redux';
import HeaderCart from '../component/HeaderCart';
import {
    Colors
  } from 'react-native/Libraries/NewAppScreen';

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          citydata:[],
          loader: false
        }
      }

    componentDidMount(){
      const city = this.props.route.params.city;
      var data = this.props.citydata.find( item => {
        if(item.name === city){
          return item;
        }
      })
      var loader = this.props.loader;
        this.setState({
          citydata: [data],
          loader: loader 
        });
    }

    render() {
      if(this.state.loader){
        return(
          <Container>
            <HeaderCart navigation={this.props.navigation}/>
          <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" />
        </View>
        </Container>
        )
      }
        return(
            <Container>
                <HeaderCart navigation={this.props.navigation}/>
                <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
              { this.state.citydata.length > 0 ?
                <View style={{ alignSelf:'center', margin:'5%'}}>
                    <Text style={{textAlign: "center", fontSize:25}}> Wheather Data </Text>
                </View> :
                <View style={{ alignSelf:'center', margin:'5%'}}>
                    <Text style={{textAlign: "center", fontSize:25}}> Wheather Data not Found.</Text>
                </View>
                }
          <View>
            {this.state.citydata.map( item => {
              return (item.data ? 
              <View>
                <Card style={styles.card}>
                <View style={{ alignSelf:'center', margin:'5%'}}>
                    <Text style={{textAlign: "center", fontSize:25}}> City: {item.name}</Text>
                    <Text>{"weather: "}{item.data.weather[0].description}</Text>
                </View>
                    <View style={{ margin: '2%', display: 'flex', flexDirection: 'row' }}>
                      <View style={styles.marginside, { width: '50%' }}>
                        <Text>{"humidity: "}{item.data.main.humidity}</Text>
                        <Text>{"pressure: "}{item.data.main.pressure}</Text>
                        <Text>{"sea level: "}{item.data.main.sea_level}</Text>
                        <Text>{"ground level: "}{item.data.main.grnd_level}</Text>
                        <Text>{"Wind Speed: "}{item.data.wind.speed}</Text>
                      </View>
                      <View style={{ alignSelf:"flex-end"}}>
                        <Text>{"Lattitude: "}{item.data.coord.lat}</Text>
                        <Text>{"Longitude: "}{item.data.coord.lon}</Text>
                        <Text>{"sunrise: "}{item.data.sys.sunrise}</Text>
                        <Text>{"sunset: "}{item.data.sys.sunset}</Text>
                        <Text>{"Wind Degree: "}{item.data.wind.deg}</Text>
                      </View>
                    </View>
                </Card>
                </View> :
                null)
            })}
          </View>
        </ScrollView>
            </Container>
        )
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
}

const mapStateToProps = state => {
  const { citydata, loader } = state;
  var loaderflag = loader;
  var newdata = citydata.map(item => {return item});
  return {
    citydata: newdata ,
    loader: loaderflag 
  }
}

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    card: {
      width: '94%',
      marginLeft: '3%'
    },
    image: {
      width:110,
      height:160
    },
    marginside: {
      margin:'2%'
    },
    button: {
      margin:'3%',
      backgroundColor:'cyan'
    },
    container: {
      flex: 1,
      justifyContent: "center"
    },
    horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
    }
  });

export default connect(mapStateToProps,mapDispatchToProps)(Cart);