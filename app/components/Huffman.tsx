import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Huffman.css';
import routes from '../constants/routes.json';
import encodeHuffman from '../algorithms/encodeHuffman/encodeHuffman';

export default function Huffman(
  empty: {
    char: string;
    code: string;
  }[] = []
) {
  const [text, setText] = useState('');
  const [codes, setCodes] = useState(empty);
  return (
    <div>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.MENU}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.column}>
          <div className={styles.column}>
            <p>Введите текст:</p>
            <textarea
              cols={40}
              rows={3}
              value={text}
              onChange={event => setText(event.target.value)}
            />
            <button
              type="button"
              onClick={() => {
                setCodes(encodeHuffman(text));
              }}
            >
              Закодировать
            </button>
          </div>
          <div className={styles.column}>
            <p>Результат:</p>
            {codes.length ? (
              <table>
                <tr>
                  {codes.map((code, index) => (
                    <td key={`id:${index + 1}`}>{code.char}</td>
                  ))}
                </tr>
                <tr>
                  {codes.map((code, index) => (
                    <td key={`id:${index + 1}`}>{code.code}</td>
                  ))}
                </tr>
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
