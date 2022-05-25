export const validateTerm = ({
  term,
  letters,
  mainLetter,
  foundWords,
}: {
  term: string;
  letters: string;
  mainLetter: string;
  foundWords: string[];
}): string => {
  const containsLegalLetters = term
    .split('')
    .every(letter => letters.includes(letter));

  if (term && term.length < 4) {
    return 'Too short';
  }

  if (!containsLegalLetters) {
    return 'Bad letters';
  }

  if (!term.includes(mainLetter)) {
    return 'Missing center letter';
  }

  if (foundWords.includes(term)) {
    return 'Already found';
  }

  return '';
};
