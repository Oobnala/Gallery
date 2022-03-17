import words from '../../assets/words.json';

export const spellChecker = (searchVal) => {
  // Check if searchVal is already a valid word
  if (words.hasOwnProperty(searchVal)) {
    return searchVal;
  }

  let validWords = [];

  // Replace all vowels in the searchVal with asterisks
  let noVowelsSearch = searchVal.replace(/[aeiou]/g, '*');

  // Filter out the dictionary with words that have equal
  // length as the search value
  let dictWords = Object.keys(words).filter(
    (v) => v.length === searchVal.length
  );

  for (let word of dictWords) {
    // Remove vowels for the dictionary word and replace with asterisks
    let noVowelsWord = word.replace(/[aeiou]/g, '*');

    // Add all dictionary words that pattern match with the search value
    if (noVowelsSearch === noVowelsWord) {
      validWords.push(word);
    }
  }

  // Return the first valid word
  return validWords[0];
};
