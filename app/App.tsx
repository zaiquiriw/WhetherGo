/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  ScrollView,
  Text,
  Alert,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import RainDayIcon from './static/showers-day.svg';
import ProfileIcon from './static/profile.svg';

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
};

const Button = (props: ButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
};

const submitMood = (mood: string) => {
  Alert.alert("You're feeling " + mood);
};

type TemperatureBlockProps = {
  desc: string;
  temp: number | undefined;
};

const TemperatureBlock = (props: TemperatureBlockProps) => {
  if (props.temp === undefined) {
    props.temp = -1;
  }

  return (
    <View style={styles.tempBox}>
      <Text>{props.desc}</Text>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.tempText}>{Math.round(props.temp)}</Text>
        <Text style={{fontSize: 18}}>°F</Text>
      </View>
    </View>
  );
};

type MoodButtonProps = {
  mood: string;
};

const MoodButton = (props: MoodButtonProps) => {
  let submit = () => submitMood(props.mood);
  return <Button title={props.mood} onPress={submit} />;
};

const submitOutfit = (outfit: string) => {
  Alert.alert('Your outfit is ' + outfit);
};

type OutfitButtonProps = {
  outfit: string;
};

const OutfitButton = (props: OutfitButtonProps) => {
  let submit = () => submitOutfit(props.outfit);
  return <Button title={props.outfit} onPress={submit} />;
};

type Weather = {
  queryCost: number;
  latitude: number;
  longitude: number;
  resolvedAddress: string;
  address: string;
  timezone: string;
  tzoffset: number;
  days: [
    {
      datetime: string;
      tempmax: number;
      tempmin: number;
      temp: number;
      feelslike: number;
      icon: string;
    },
  ];
  currentConditions: {
    datetime: string;
    temp: number;
    feelslike: number;
    icon: string;
  };
};

const App = () => {
  const [weatherData, setWeatherData] = useState<Weather>();

  const getWeatherData = async () => {
    try {
      let location = 'seattle WA';
      const response = await fetch(
        'http://whethergo.lizwigg.com/api/crossing?location=' + location,
      );
      const json = await response.json();
      console.log(json);
      console.log('logged weather json');
      setWeatherData(json);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getWeatherData();
  }, []);

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
          <TemperatureBlock
            temp={weatherData?.currentConditions.temp}
            desc="Currently"
          />
          <TemperatureBlock
            temp={weatherData?.currentConditions.feelslike}
            desc="Feels Like"
          />
        </View>
      </View>
      <View style={{width: '100%'}}>
        <Text>How does the weather make you feel?</Text>
        <View style={styles.buttonView}>
          <MoodButton mood="Bad" />
          <MoodButton mood="Meh" />
          <MoodButton mood="Neutral" />
          <MoodButton mood="Good" />
          <MoodButton mood="Great" />
        </View>
      </View>
      <View style={{width: '100%'}}>
        <Text>What's the style?</Text>
        <View style={styles.buttonView}>
          <OutfitButton outfit="Beach Outfit" />
          <OutfitButton outfit="Warm" />
          <OutfitButton outfit="Whatever" />
          <OutfitButton outfit="Sweater Weather" />
          <OutfitButton outfit="Bundled Up" />
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
    width: '100%',
  },
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
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
  button: {
    flexShrink: 1,
    flexGrow: 1,
    borderRadius: 8,
    padding: 8,
    margin: 2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    backgroundColor: 'black',
    textAlign: 'center',
    maxWidth: '20%',
  },
  buttonText: {
    color: 'white',
  },
});

export default App;
