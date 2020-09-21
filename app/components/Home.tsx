import React, {useState} from 'react';
import styles from './Home.css';
import uniq from "lodash/uniq";

// @ts-ignore
export default function Home() {

  const [phrase, setPhrase] = useState("");
  const [decode, setDecode] = useState(0);
  const chars = phrase.split("");
  const uniqChars = uniq(chars);

  let charToProbability = new Map();
  uniqChars.forEach(uniqChar => {
    charToProbability.set(uniqChar, chars.filter(c => c === uniqChar).length / chars.length)
  })
  charToProbability = new Map([...charToProbability.entries()].sort((a, b) => a[1] - b[1]))

  let prev = 0
  const charsToRange = new Map()
  Array.from(charToProbability.entries()).reverse().forEach(entry => {
    charsToRange.set(entry[0], prev + entry[1])
    prev += entry[1]
  })

  const getDecodeChar = (num: Number) => {
    return Array.from(charsToRange.keys())[Array.from(charsToRange.values()).filter(value => value < num).length]
  }

  return (
    <div className={styles.container} data-tid="container">
      <div className={styles.sec}>
        <main>Enter phrase</main>
        <input type="text" onChange={event => setPhrase(event.target.value)}/>
        <ul>
          {Array.from(charToProbability.entries()).map(entry => (<li>{entry[0]} - {entry[1]}</li>))}
        </ul>
      </div>
      <div className={styles.sec}>
        <main>Intervals</main>
        <ul>
          {Array.from(charsToRange.entries()).map(entry => (<li>{entry[0]} - {entry[1]}</li>))}
        </ul>
      </div>
      <div className={styles.sec}>
        <main>Decode</main>
        <input type="number" onChange={event => setDecode(Number(event.target.value))}/>
        {decode <= 0 || decode >=1 ? "Enter value in [0, 1]" : getDecodeChar(decode)}
      </div>
    </div>
  );
}
