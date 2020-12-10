import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions
} from 'react-native';
import { Icon, View, Button, Input, Item, Thumbnail, Text } from "native-base";
import { Title } from "react-native-paper";

export default class HeaderCart extends Component {
  constructor(props){
    super(props);
  }
    render() {
        return (
            <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignSelf: "stretch",
            paddingBottom: 5

          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center",backgroundColor:"#5EAD19" }}>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon
                name="arrow-back-outline"
                style={{ color:"#fff" }}
              />
            </Button>
            <Title allowFontScaling={false} style={{color:"#fff"}}>
              {this.props.title}
              </Title>

          </View>
          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          </View>
        </View>

      </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: Dimensions.get("window").width,
        marginLeft: Platform.OS === "ios" ? undefined : undefined,
        backgroundColor:"#5EAD19"
      },
      sidebarIconView: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
        paddingTop: Platform.OS === "android" ? 4 : 0,
        zIndex: 1,
          marginTop: "-9%",
         alignSelf: "flex-start",
         marginLeft: "-4%"
      },
});