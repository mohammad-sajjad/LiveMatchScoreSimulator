import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EVENT_TYPES } from '../constants/Constants';

const EventCard = ({ event }) => {
  const { type, payload } = event;

  // Default styles
  let bgColor = '#eee';
  let textColor = '#000';
  let fontWeight = 'normal';
  let fontStyle = 'normal';

  switch (type) {
    case EVENT_TYPES.WICKET:
      bgColor = '#ffebee';
      textColor = '#d32f2f';
      fontWeight = 'bold';
      break;

    case EVENT_TYPES.BOUNDARY:
      bgColor = payload.runs === 6 ? '#FFD700' : '#e3f2fd';
      textColor = '#1565c0';
      fontWeight = 'bold';
      break;

    case EVENT_TYPES.MATCH_STATUS:
      bgColor = '#c8e6c9';
      textColor = '#2e7d32';
      fontWeight = 'bold';
      break;

    case EVENT_TYPES.UNKNOWN: // Explicit unknown event handling
      bgColor = '#fff3cd';
      textColor = '#856404';
      fontWeight = 'normal';
      fontStyle = 'italic';
      break;

    default: // Safety fallback for any unexpected event types
      bgColor = '#f5f5f5';
      textColor = '#555';
      fontWeight = 'normal';
      fontStyle = 'normal';
      break;
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {payload.batsman && payload.bowler && (
        <Text style={[styles.meta, { color: textColor }]}>
          {payload.ballNumber} • {payload.batsman} vs {payload.bowler}
          {payload.runs !== undefined ? ` • Runs: ${payload.runs}` : ''}
        </Text>
      )}

      <Text
        style={[styles.commentary, { color: textColor, fontWeight, fontStyle }]}
      >
        {payload.commentary || payload.summary}
      </Text>

      {/* Show original event type if UNKNOWN */}
      {type === EVENT_TYPES.UNKNOWN && payload.originalType && (
        <Text style={[styles.meta, { color: textColor, fontStyle: 'italic' }]}>
          Original Type: {payload.originalType}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 8, marginVertical: 2, borderRadius: 6 },
  meta: { fontSize: 12, marginBottom: 2 },
  commentary: { fontSize: 14 },
});

export default EventCard;
