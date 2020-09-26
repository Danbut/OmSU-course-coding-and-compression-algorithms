import React, {useState} from 'react';
import styles from './Home.css';

const encodeWithLZ77 = (message: string, bufferSize: number) => {
  let buffer = {start: 0, end: 0};
  const shiftBuffer = (offset: number) => {
    buffer.end += offset;
    if(buffer.end - buffer.start > bufferSize) {
      buffer.start = buffer.end - bufferSize
    }
  }
  const ans = []

  const findMatching = (pos: number) => {
    const { start, end } = buffer
    let stringBuffer = message.substring(start, end)
    const suffix = message.slice(pos)
    let matching = true
    let length = 0
    let startIndex = stringBuffer.indexOf(suffix[length])
    while (matching && startIndex !== -1) {
      if(stringBuffer[(startIndex + length) % stringBuffer.length] === suffix[length]) {
        length += 1
      }
      else {
        matching = false
      }
    }
    return ({offset: length ? pos - start : 0, length})
  }

  let pos = 0
  while(pos < message.length) {
    pos = buffer.end
    const { offset, length } = findMatching(pos)
    shiftBuffer(length + 1)
    ans.push({offset, length, next: message[pos + length]})
    if(ans[ans.length - 1].next === undefined) {
      ans[ans.length - 1].next = "∅"
      return ans
    }
  }

  return ans;
}

const encodeWithLZ78 = (message: string) => {
  const dict: Array<string> = [];
  const ans = []

  const handleNextPrefix = (pos: number) => {
    const entries = [...dict].sort((a,b) => b.length - a.length)

    const suffix = message.slice(pos)
    for (let i in entries) {
      const word = entries[i]
      if(suffix.startsWith(word)) {
        const newWord = word + message[pos + word.length]
        dict.push(newWord)
        return { prefix: newWord[newWord.length - 1], code: dict.findIndex(cand => cand === word) + 1 }
      }
    }
    dict.push(message[pos])
    return { prefix: message[pos], code: 0 }
  }

  let pos = 0
  while (pos < message.length) {
    const { prefix, code } = handleNextPrefix(pos)
    pos += code !== 0 ? dict[code - 1].length + 1 : 1
    ans.push({prefix, code})
  }

  return ans.map(answer => {
    return `<${answer.code},${answer.prefix}>`
  }).join("")
}

export default function Home() {
  const [bufferSize, setBufferSize] = useState(5)
  const [text1, setText1] = useState("abacabacabadaca")
  const [text2, setText2] = useState("codecodecode")
  const [lz77, setlz77] = useState("")
  const [lz78, setlz78] = useState("")
  const handleLZ77Encode = () => {
    const encoded = encodeWithLZ77(text1, bufferSize)
    setlz77(encoded.map(token => `<${token.offset},${token.length},${token.next}>`).join(""))
  }
  const handleLZ78Encode = () => {
    setlz78(encodeWithLZ78(text2))
  }
  return (
    <div className={styles.container} data-tid="container">
      <br/>
      <main>Buffer Size</main>
      <input type="text" value={bufferSize} onChange={event => {
        const num = Number(event.target.value)
        if(!isNaN(num)) {
          setBufferSize(num)
        }
      }}/>
      <div className={styles.sec}>
        <main>LZ77</main>
        <br/>
        <textarea cols={40} rows={5} value={text1} onChange={event => setText1(event.target.value)}/>
        <button onClick={handleLZ77Encode}>encode</button>
        <p>{lz77}</p>
      </div>
      <div className={styles.sec}>
        <main>LZ78</main>
        <br/>
        <textarea cols={40} rows={5} value={text2} onChange={event => setText2(event.target.value)}/>
        <button onClick={handleLZ78Encode}>encode</button>
        <p>{lz78}</p>
      </div>
    </div>
  );
}
