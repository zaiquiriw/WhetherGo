/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Button, ScrollView, Text, Alert, StyleSheet} from 'react-native';
import RainDayIcon from './static/showers-day.svg';
import ProfileIcon from './static/profile.svg';

const submitMood = () => {
  Alert.alert('hi');
};

type TemperatureProps = {
  desc: string;
  temp: number;
};

const TemperatureBlock = (props: TemperatureProps) => {
  return (
    <View style={styles.tempBox}>
      <Text>{props.desc}</Text>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.tempText}>{props.temp}</Text>
        <Text style={{fontSize: 18}}>°F</Text>
      </View>
    </View>
  );
};

function App(): JSX.Element {
  return (
    <ScrollView style={styles.base}>
      <View style={styles.topBar}>
        <Text style={{fontSize: 32}}>Good evening!</Text>
        <ProfileIcon width={48} height={48} />
      </View>
      <View style={styles.weatherSection}>
        <View style={{width: '50%', height: '50%'}}>
          <RainDayIcon width={175} height={175} />
        </View>
        <View
          style={{
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TemperatureBlock temp={45} desc="Currently" />
          <TemperatureBlock temp={34} desc="Feels Like" />
        </View>
      </View>
      <View>
        <Text>How does the weather make you feel?</Text>
        <View style={styles.buttonView}>
          <Button title="Bad" onPress={submitMood} style={styles.flexButton} />
          <Button title="Meh" onPress={submitMood} />
          <Button title="Neutral" onPress={submitMood} />
          <Button title="Good" onPress={submitMood} />
          <Button title="Great" onPress={submitMood} />
        </View>
      </View>
      <View>
        <Text>What's the style?</Text>
        <View style={styles.buttonView}>
          <Button title="Beach Outfit" onPress={submitMood} />
          <Button title="Warm" onPress={submitMood} />
          <Button title="Whatever" onPress={submitMood} />
          <Button title="Sweater Weather" onPress={submitMood} />
          <Button title="Bundled Up" onPress={submitMood} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  base: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 24,
    padding: 8,
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    width: 100,
  },
  flexButton: {
    flexGrow: 1,
  },
  tempText: {
    fontSize: 68,
  },
  tempBox: {
    width: '50%',
    padding: 4,
  },
  weatherSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default App;
