export const randomizeLetters = (
  lettersArray: string[],
  mainLetter: string
): string[] => {
  const nonMainLetters = lettersArray.filter(letter => letter !== mainLetter);

  const sorted = nonMainLetters.sort(() => {
    return 0.5 - Math.random();
  });
  sorted.splice(4, 0, mainLetter);

  return sorted;
};
