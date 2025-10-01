
import { useEffect, useState, useRef } from 'react';
import { generateEvent, generateMatchStatusEvent } from '../utils/MatchEventService';
import { MAX_BALLS, MAX_WICKETS } from '../constants/Constants';

const useMatchSimulation = (battingTeam, bowlingTeam, interval=1500) => {
  const [matchState,setMatchState] = useState({
    commentary: [],
    strikerIndex:0,
    nonStrikerIndex:1,
    nextBatsmanIndex:2,
    currentBowlerIndex:0,
    score:{ runs:0, wickets:0, balls:0 },
    status:'Live',
  });
  const stateRef = useRef(matchState);
  stateRef.current = matchState;

  useEffect(()=>{
    const timer = setInterval(()=>{
      const state = stateRef.current;
      if(state.status==='Innings Break') return;

      const striker = battingTeam.players[state.strikerIndex];
      const bowler = bowlingTeam.bowlers[state.currentBowlerIndex];
      const event = generateEvent(striker);

      let newScore={...state.score};
      let newIndexes={...state};
      
      switch(event.type){
        case 'BALL': 
          newScore.runs+=event.payload.runs; 
          newScore.balls+=1; 
          if(event.payload.runs%2===1){ 
            newIndexes.strikerIndex=state.nonStrikerIndex; 
            newIndexes.nonStrikerIndex=state.strikerIndex; 
          }
          break;
        case 'BOUNDARY': 
          newScore.runs+=event.payload.runs; 
          newScore.balls+=1; 
          break;
        case 'WICKET': 
          newScore.balls+=1; 
          newScore.wickets+=1;
          if(state.nextBatsmanIndex<battingTeam.players.length){ 
            newIndexes.strikerIndex=state.nextBatsmanIndex; 
            newIndexes.nextBatsmanIndex=state.nextBatsmanIndex+1; 
          }
          break;
      }

      // Rotate bowler every 6 balls
      if(newScore.balls%6===0){ 
        newIndexes.currentBowlerIndex=(state.currentBowlerIndex+1)%bowlingTeam.bowlers.length; 
        [newIndexes.strikerIndex,newIndexes.nonStrikerIndex]=[state.nonStrikerIndex,state.strikerIndex]; 
      }

      let newStatus = state.status;

      const over = Math.floor(newScore.balls/6);
      const ballInOver = newScore.balls%6===0?6:newScore.balls%6;
      const ballNumber = `${over}.${ballInOver}`;

      let newCommentary = [ 
        {...event, payload:{...event.payload, batsman:striker, bowler, ballNumber }}, 
        ...state.commentary 
      ];

      if(newScore.balls>=MAX_BALLS || newScore.wickets>=MAX_WICKETS){ 
        newStatus='Innings Break'; 
        newCommentary=[ 
          generateMatchStatusEvent(newStatus,newScore.runs,newScore.wickets,newScore.balls), 
          ...newCommentary 
        ]; 
      }

      setMatchState({ ...state, ...newIndexes, score:newScore, commentary:newCommentary, status:newStatus });
    }, interval);

    return ()=>clearInterval(timer);
  },[battingTeam,bowlingTeam,interval]);

  return matchState;
};

export default useMatchSimulation;

