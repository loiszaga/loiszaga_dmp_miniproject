import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from 'react-native-safe-area-context';

import RootNavigation from './src/routers/RootNavigation';
import './src/languages/Localize/IMLocalize';

class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
      return(
        <RootSiblingParent>
            <SafeAreaView style={styles.container}>
                <RootNavigation />
            </SafeAreaView>
        </RootSiblingParent>
      )
    }
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});