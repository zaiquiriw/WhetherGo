import React from 'react';
import {View, Button, ScrollView, Text, Alert, StyleSheet} from 'react-native';

const submitMood = () => {
  Alert.alert('hi');
};

function App(): JSX.Element {
  return (
    <ScrollView style={styles}>
      <View>
        <Text>Profile</Text>
        <Text>Sunny</Text>
        <Text>Currently</Text>
        <Text style={styles.tempText}>58</Text>
        <Text>Feels Like</Text>
        <Text style={styles.tempText}>47</Text>
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
  baseText: {
    color: 'black',
    backgroundColor: 'white',
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
    fontSize: 36,
  },
});

export default App;
