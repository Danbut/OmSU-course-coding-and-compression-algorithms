export default function calculateFrequencyTable(text: string) {
  const table: { char: string; frequency: number }[] = [];

  const unorderedTable = [...text].reduce(
    (freq: { [char: string]: number }, char: string) => {
      return Object.assign(freq, { [char]: (freq[char] || 0) + 1 });
    },
    {}
  );

  Object.keys(unorderedTable).forEach(char => {
    table.push({ char, frequency: unorderedTable[char] });
  });

  table.sort((a, b) => (a.frequency < b.frequency ? 1 : -1));

  return table;
}
