import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { initMatch, setMatchState } from '../redux/slices/matchSlice';
import { teamA, teamB } from '../constants/Teams';
import useMatchSimulation from '../hooks/useMatchSimulation';
import EventCard from '../components/EventCard';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CommentaryScreen = () => {
  const dispatch = useDispatch();
  const match = useMatchSimulation(teamA, teamB);

  useEffect(() => {
    dispatch(initMatch({ battingTeam: teamA, bowlingTeam: teamB }));
  }, []);
  useEffect(() => {
    dispatch(setMatchState(match));
  }, [match]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scoreboard}>
        <Text style={styles.team}>
          {teamA.name} vs {teamB.name}
        </Text>
        <Text style={styles.score}>
          {match.score.runs}/{match.score.wickets} (
          {Math.floor(match.score.balls / 6)}.{match.score.balls % 6})
        </Text>
        <Text style={styles.status}>{match.status}</Text>
      </View>
      <FlatList
        data={match.commentary}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  scoreboard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  team: { fontWeight: 'bold', fontSize: 18 },
  score: { fontSize: 16, marginTop: 4 },
  status: { fontSize: 14, color: '#555', marginTop: 2 },
});
