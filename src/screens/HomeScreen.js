import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image
  } from 'react-native';
import { connect } from 'react-redux';
import * as Api from "./../apistore/index";
import HeaderHome from '../component/HeaderHome';
import { Button, Card, Container, Toast, Icon } from 'native-base';
import {
    Colors
  } from 'react-native/Libraries/NewAppScreen';
import { addcitydata } from '../action/Act_AddCityData';
import { startloader } from '../action/Act_StartLoader';
import { stoploader } from '../action/Act_StopLoader';


class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      citydata:[]
    }
  }

  static getDerivedStateFromProps = (props, state) => {
    const { citydata } = props ;
    return {
      citydata
    }
  }

  componentDidMount() {
    this.setState({
      citydata: this.props.citydata
    });
  }

  handleDetail = (name) => {
    var data = this.state.citydata;
    var flag = false;
    data.find( item => {
      if(item.name === name && item.data){
        flag = true;         
      }
    });
    if(!flag) {
      this.props.startloader(true);
      Api.fetchWeatherdetailApi(name).then(
        response =>{
          var data = response;
          this.props.addcitydata({ name: name, data: data});
          this.props.stoploader(false);
        },
        errorMessage => {
          console.log("error",errorMessage);
        }
      )
    }
    this.props.navigation.navigate('Cart',{ city: name });
  }

    render() {
        return (
          <Container>
            <HeaderHome 
              title="Home"
              navigation={this.props.navigation}/>
            <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            { this.props.citydata.length > 0 ?
                <View></View> :
                <View style={{ alignSelf:'center', margin:'5%'}}>
                    <Text style={{textAlign: "center", fontSize:25}}>No city Found.</Text>
                </View>
                }
          <View>
            {this.props.citydata.map( item => {
              return(
                <View>
                <Card style={styles.card}>
                  <View style={{ margin:'2%', display:'flex', flexDirection:'row'}}>
                    <View style={styles.marginside,{ width:'60%'}}>
                    <Text style={{ fontSize:20 }}>{"City: "}{item.name}</Text>
                    </View>
                    <View style={{ alignSelf:'flex-end'}}>
                    <Button 
                      style={styles.button}
                      onPress={() => this.handleDetail(item.name)}>
                      <Text style={{margin:'5%'}}>Wheather Detail</Text>
                    </Button>
                    </View>
                  </View>
                </Card>
                </View>
              )
            })}
          </View>
        </ScrollView>
            <View style={{
              zIndex: 1, marginTop: "-22%", marginBottom: "7%", alignSelf: "flex-end",
              marginRight: "5%", backgroundColor: "transparent", shadowOpacity: 0, borderBottomWidth: 0
            }}>
              <Button 
              onPress={() => this.props.navigation.navigate('AddCity')}
                style={{ borderRadius: 30, width: 60, height: 60, textAlign: "center", shadowOpacity: 0, borderBottomWidth: 0 }}>
                <Icon
                  //onPress={this.AddProductpage.bind(this)}
                  active name="plus" type="MaterialCommunityIcons"
                  style={{
                    color: "#fff", fontSize: 28,
                    alignSelf: "center", shadowOpacity: 0, borderBottomWidth: 0, justifyContent:"center"
                  }} />
              </Button>
            </View>
        </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      addcitydata: data => {
        dispatch(addcitydata(data))
      },
      startloader: data => {
        dispatch(startloader(data))
      },
      stoploader: data => {
        dispatch(stoploader(data))
      }
    }
}

const mapStateToProps = (state) => {
    const { citydata, cartdata } = state;
    var newdata = citydata.map(item => {return item});
    return {
      citydata: newdata ,
        cartdata
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
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);