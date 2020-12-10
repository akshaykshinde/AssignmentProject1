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
import HeaderCart from '../component/HeaderCart';
import { Button, Card, Container, Toast, Item, Input } from 'native-base';
import {
    Colors
  } from 'react-native/Libraries/NewAppScreen';
import { addthecity } from '../action/Act_AddTheCity';
import { event } from 'react-native-reanimated';

class AddCity extends React.Component {
  constructor(props){
    super(props);
    this.state={
        cityname:''
    }
  }

  handleSubmit = () => {
    if(this.props.citydata.length > 0){
      var flag = false ;
      this.props.citydata.find( item => {
        if(item.name === this.state.cityname){
          flag = true;
        }
      });
      if(flag) {
        Toast.show({
          text: "City is Already present",
          textStyle: { color: "white", paddingTop: -5 },
          type: "danger",
          position: "bottom",
          duration: 3000,
          style: { height: 40 }
        })
      } else {
        this.props.addcity({ name: this.state.cityname, data: null});
        this.props.navigation.navigate('HomeScreen');
      }
    } else {
      this.props.addcity({ name: this.state.cityname, data: null});
      this.props.navigation.navigate('HomeScreen');
    }
  }

  storeToLocalStorage = () => {
    this.props.addcity({ name: this.state.cityname, data: null});
    this.props.navigation.navigate('HomeScreen');
  }

    render() {
        return (
          <Container>
            <HeaderCart 
              title="Add City"
            navigation={this.props.navigation}/>
            <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={{  margin:'5%'}}>
          <Item rounded>
            <Input 
                placeholder='Enter City'
                value={this.state.cityname}
                onChangeText={(cityname) => {
                    console.log("city",cityname);
                    this.setState({ cityname: cityname})}}/>
          </Item>
          <View style={{ alignSelf:'center', margin:'5%'}}>
          <Button 
            onPress={this.handleSubmit}>
              <Text style={{ alignSelf:'center', margin:'5%'}}>Submit</Text>
            </Button>
          </View>
          
          </View>
        </ScrollView>
        </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addcity: data => {
        dispatch(addthecity(data))
      }
    }
}

const mapStateToProps = (state) => {
    const { citydata, cartdata } = state;
    return {
        citydata,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCity);