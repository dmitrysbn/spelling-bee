import axios from 'axios';
import { SetStateAction } from 'react';

export const getCurrentPuzzleId = async (setPuzzleId: {
  (value: SetStateAction<string>): void;
  (arg0: any): void;
}) => {
  const { data } = await axios.get(
    'http://localhost:1337/puzzles/current_puzzle'
  );

  setPuzzleId(data.puzzleId);
};
