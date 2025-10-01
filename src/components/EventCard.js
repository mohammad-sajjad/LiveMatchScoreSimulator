import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EVENT_TYPES } from '../constants/Constants';

const EventCard = ({ event }) => {
  const { type, payload } = event;

  let bgColor = '#eee';
  let textColor = '#000';
  let fontWeight = 'normal';

  switch(type){
    case EVENT_TYPES.WICKET:
      bgColor = '#ffebee'; textColor = '#d32f2f'; fontWeight = 'bold';
      break;
    case EVENT_TYPES.BOUNDARY:
      bgColor = payload.runs===6?'#FFD700':'#e3f2fd'; textColor = '#1565c0'; fontWeight='bold';
      break;
    case EVENT_TYPES.MATCH_STATUS:
      bgColor='#c8e6c9'; textColor='#2e7d32'; fontWeight='bold';
      break;
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {payload.batsman && payload.bowler && (
        <Text style={[styles.meta,{color:textColor}]}>
          {payload.ballNumber} • {payload.batsman} vs {payload.bowler} • Runs: {payload.runs}
        </Text>
      )}
      <Text style={[styles.commentary,{color:textColor,fontWeight}]}>{payload.commentary || payload.summary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ padding:8, marginVertical:2, borderRadius:6 },
  meta:{ fontSize:12, marginBottom:2 },
  commentary:{ fontSize:14 },
});

export default EventCard;
