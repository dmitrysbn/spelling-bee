export const validateTerm = ({
  term,
  puzzle,
  legalWords,
  mainLetter,
  foundWords,
}: {
  term: string;
  puzzle: string;
  legalWords: string[];
  mainLetter: string;
  foundWords: string[];
}): string => {
  const containsLegalLetters = term
    .split('')
    .every(letter => puzzle.includes(letter));

  if (term && term.length < 4) {
    return 'Too short';
  }

  if (!containsLegalLetters) {
    return 'Bad letters';
  }

  if (!term.includes(mainLetter)) {
    return 'Missing center letter';
  }

  if (!legalWords.includes(term.toLowerCase())) {
    return 'Not in word list';
  }

  if (foundWords.includes(term)) {
    return 'Already found';
  }

  return '';
};
