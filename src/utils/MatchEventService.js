import { EVENT_TYPES } from '../constants/Constants';

const commentaryTexts = {
  [EVENT_TYPES.BALL]: [
    'Defended back to the bowler.',
    'Played to mid-off, no run.',
    'Quick single to point!',
    'Backfoot punch for one.',
    'Flicked through square leg.',
    'Tapped to deep point, good running.',
    'Nice defensive shot, no run.',
    'Driven towards midwicket, no run.',
    'Edged to slip, but safe.',
  ],
  [EVENT_TYPES.BOUNDARY]: [
    'Cracked through covers!',
    'Pulled hard for four!',
    'Lofted into the stands!',
    'Straight drive – four!',
    'Whipped to the fence!',
    'Classic cover drive, races to the boundary!',
    'Cracks it through the off side for four!',
    'Pulled it hard, it goes to the fence!',
  ],
  [EVENT_TYPES.WICKET]: [
    'Clean bowled!',
    'Caught behind!',
    'LBW! Umpire raises the finger!',
    'Big appeal and gone!',
    'Stumped brilliantly!',
    "Big appeal... and he's out!",
    "Clean bowled! Can't believe it!",
    'Caught behind! What a catch!',
    'LBW! Dead plumb in front!',
  ],
};

const randomChoice = arr => arr[Math.floor(Math.random() * arr.length)];

export const generateBallEvent = () => {
  const runOptions = [0, 1, 2, 3];
  const runs = randomChoice(runOptions);

  return {
    type: EVENT_TYPES.BALL,
    payload: {
      runs,
      commentary: randomChoice(commentaryTexts[EVENT_TYPES.BALL]),
    },
  };
};

export const generateBoundaryEvent = () => {
  const run = randomChoice([4, 6]);
  return {
    type: EVENT_TYPES.BOUNDARY,
    payload: {
      runs: run,
      commentary: randomChoice(commentaryTexts[EVENT_TYPES.BOUNDARY]),
    },
  };
};

export const generateWicketEvent = (playerOut = 'Unknown Batsman') => {
  return {
    type: EVENT_TYPES.WICKET,
    payload: {
      playerOut,
      dismissal: 'LBW',
      commentary: randomChoice(commentaryTexts[EVENT_TYPES.WICKET]),
    },
  };
};

export const generateMatchStatusEvent = (status, score, wickets, balls) => {
  const overs = `${Math.floor(balls / 6)}.${balls % 6}`;
  return {
    type: EVENT_TYPES.MATCH_STATUS,
    payload: {
      status,
      summary: `Team finishes on ${score}/${wickets} after ${overs} overs.`,
    },
  };
};

export const generateUnknownEvent = () => {
  return {
    type: EVENT_TYPES.UNKNOWN,
    payload: {
      raw: '',
      commentary: '⚠️ Unknown event type received: N/A',
    },
  };
};

export const generateEvent = playerName => {
  const r = Math.random();
  if (r < 0.1) return generateWicketEvent(playerName);
  else if (r < 0.3) return generateBoundaryEvent();
  else if (r < 0.32) return generateUnknownEvent();
  return generateBallEvent();
};
