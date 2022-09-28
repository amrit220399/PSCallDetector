import React from 'react'
import {
  Button,
  Linking,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'

import { useTheme } from '@/Hooks'
import { useRef } from 'react'
import { useState } from 'react'
import CallDetectorManager from 'react-native-call-detection'

const ExampleContainer = () => {
  const { Gutters, Layout } = useTheme()
  const callDetector = useRef()
  const ds = []
  const [callStates, setCallStates] = useState([])

  const [dsState, setDsState] = useState(ds)

  const startListenerTapped = () => {
    console.log('Start Listener Called')
    callDetector.current = new CallDetectorManager(
      (event, number) => {
        var updatedCallStates = callStates
        updatedCallStates.push(event + ' - ' + number)
        var previousDS = dsState
        setCallStates(updatedCallStates)
        setDsState(previousDS.cloneWithRows(updatedCallStates))
      },
      true,
      () => {},
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      },
    )
  }

  const callFriendTapped = () => {
    Linking.openURL('tel:9217721412').catch(err => {
      console.log(err)
    })
  }

  const stopListenerTapped = () => {
    callDetector.current && callDetector.current.dispose()
  }

  return (
    <FlatList
      data={dsState}
      renderItem={({ item }) => <Text style={styles.callLogs}>{item}</Text>}
      ListHeaderComponent={
        <View style={Layout.fill}>
          <TouchableOpacity onPress={startListenerTapped}>
            <Text
              title="Start Listener"
              color="#841584"
              style={styles.bottomMargin}
            >
              Start Listener
            </Text>
          </TouchableOpacity>

          <Text
            onPress={callFriendTapped}
            title="Call your Friend"
            style={styles.bottomMargin}
          >
            Call your Friend
          </Text>

          <Text
            onPress={stopListenerTapped}
            title="Stop Listener"
            color="#841584"
            style={styles.bottomMargin}
          >
            Stop Listener
          </Text>

          <Text style={styles.text}>Call State Logs</Text>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  bottomMargin: {
    color: '#ffffff',
    backgroundColor: '#841584',
    textAlign: 'center',
    paddingVertical: 15,
    borderBottomWidth: 0.6,
    borderBottomColor: '#ffffff',
  },
  text: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    color: '#341584',
  },
  callLogs: {
    textAlign: 'center',
    fontSize: 15,
    color: '#333333',
    marginBottom: 5,
  },
})

export default ExampleContainer
