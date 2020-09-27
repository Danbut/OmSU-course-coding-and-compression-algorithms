import React, {useState} from 'react';
import styles from './Home.css';
import sum from 'lodash/sum';

const fieldDivide = (a: number, b: number) => {
  const na = a % 7;
  const nb = b % 7;

  for (let cand in [0, 1, 2, 3, 4, 5, 6]) {
    if((cand * nb) % 7 == na) {
      return cand
    }
  }
}

const getDiv7 = pow => {
  const a = [5,4,6,2,3,1];
  if(pow === 0) {
    return 1;
  }
  return a[(pow - 1) % 6]
}

const dft = (message, i) => {
  return fieldDivide(sum(message.map((el, index) => fieldDivide(el, getDiv7(i * index))).map(Number)), 6)
}

const idft = (message, i) => {
  const nm = message.map(Number)
  return (nm[0] + sum(nm.slice(1).map((el, index) => el * getDiv7((index + 1) * i)))) % 7
}

const findG2 = (a, b) => {
  return fieldDivide(7 - (a % 7), b)
}

const findG1 = (a,b,g2) => {
  return fieldDivide(7 - ((g2 * b) % 7), a)
}

const findGS = (a1, b1, c1, a2, b2, c2) => {
  const cands = Array.from(Array(6), (el, i) => i + 1)
  const fit1 = (g1, g2) => (a1 + b1 * g1 + c1 * g2) % 7 === 0
  const fit2 = (g1, g2) => (a2 + b2 * g1 + c2 * g2) % 7 === 0

  for(let g1Index in cands) {
    for (let g2Index in cands) {
      const g1 = cands[g1Index]
      const g2 = cands[g2Index]
      if(fit1(g1, g2) && fit2(g1, g2)) {
        return ({g1, g2})
      }
    }
  }
  return ({g1: 0, g2: 0})
}

export default function Home() {

  const [message, setMessage] = useState("");
  const [error, setError] = useState("000000");

  const fullMessage = new Int32Array(6)
  Array.from(message).forEach((digit, i) => fullMessage[i] = Number(digit) )
  const encodedMessage = Array.from(fullMessage).map((digit, i) => {
    return (fullMessage[0] + fullMessage[1] * Math.pow(5, i)) % 7
  })

  const errorEntered = error.length === 6

  const encodedMessageWithError = encodedMessage.map((digit, i) => ((digit) + Number(error[i])) % 7)

  const syndrome = [0,1,2,3,4,5].map(i => dft(encodedMessageWithError, i)).map(Number)
  const { g1, g2 } = findGS(syndrome[4], syndrome[3], syndrome[2], syndrome[5], syndrome[4], syndrome[3])

  const f1 = fieldDivide(7 - (syndrome[3] + g1 * syndrome[2]) % 7, g2)
  const f0 = fieldDivide(7 - (syndrome[2] + g1 * f1) % 7, g2)

  const f = [f0, f1].concat(syndrome.slice(2))

  return (
    <div className={styles.container} data-tid="container">
      <div>
        <main>Enter Message</main>
        <p className={styles.ps}>
          Message length is 2 <br/> Error correction length is 4
        </p>
        <input type="text" value={message} maxLength={2} onChange={event => {
            if(!isNaN(Number(event.target.value))) {
              setMessage(event.target.value)
            }
        }}/>
        <section className={styles.sec}>
          <main>Message</main>
          <p>{fullMessage}</p>
        </section>
        <section className={styles.sec}>
          <main>Encoded Message</main>
          <p>{encodedMessage}</p>
        </section>
        <main style={{color: !errorEntered ? "red" : "white"}}>Error</main>
        <input type="text" value={error} maxLength={6} onChange={event => {
          if(!isNaN(Number(event.target.value))) {
            setError(event.target.value)
          }
        }}/>
        {errorEntered && (
          <>
            <section className={styles.sec}>
              <main>Encoded Message with Error</main>
              <p>{encodedMessageWithError}</p>
            </section>
            <section className={styles.sec}>
              <main>Syndrome</main>
              <p>{syndrome}</p>
            </section>
            <section className={styles.sec}>
              <main>G1={g1} and G2={g2}</main>
              <br/>
              <main>{`F = ${f.join("")}`}</main>
              <br/>
              <main>Found error</main>
              <main>{[0,1,2,3,4,5].map(el => idft(f, el))}</main>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
