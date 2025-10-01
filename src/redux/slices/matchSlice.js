import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commentary: [],
  battingTeam: null,
  bowlingTeam: null,
  strikerIndex: 0,
  nonStrikerIndex: 1,
  nextBatsmanIndex: 2,
  currentBowlerIndex: 0,
  score: { runs: 0, wickets: 0, balls: 0 },
  status: 'Live',
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    initMatch: (state, action) => ({ ...initialState, ...action.payload }),
    setMatchState: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const { initMatch, setMatchState } = matchSlice.actions;
export default matchSlice.reducer;
