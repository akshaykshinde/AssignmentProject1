import { combineReducers } from 'redux';
import { ADD_CITY, ADD_CITY_DATA, START_LOADER, STOP_LOADER } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
    citydata:[],
    loader: false
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('citydata', jsonValue)
  } catch (e) {
    console.log("Async Storage", e);
  }
}

export const myReducer = (state = INITIAL_STATE, action) => {
  const {
    citydata,
    loader
  } = state;
    switch (action.type) {
        case ADD_CITY:
            {
              var newdata = citydata;
              newdata.push(action.data);
                const newState = { 
                  citydata: newdata
                };
                storeData(newState);
                return newState;
            }
        case ADD_CITY_DATA:
            {
              var newdata = citydata;
              var ind;
              newdata.map((item,indx) =>{
                if(item.name === action.data.name) {
                  ind = indx;
                }
              });
              newdata.splice(ind,1,action.data);
            const newState = { 
              citydata: newdata };
              storeData(newState);
            return newState;
            }
        case START_LOADER:
          {
            const newState = { 
              citydata,
              loader: true };
            return newState;
          }
        case STOP_LOADER:
          {
            const newState = { 
              citydata,
              loader: false };
            return newState;
          }
        default:
          return state
      }
}


export default combineReducers({
    citydata: myReducer
});
