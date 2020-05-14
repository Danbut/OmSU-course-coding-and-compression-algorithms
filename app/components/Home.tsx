import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
import routes from '../constants/routes.json';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <div className={styles.flexbox}>
        <div className={styles.block}>
          <div className={styles.square}>
            <Link className={styles.text} to={routes.HUFFMAN}>
              <div>Алгоритм Хаффмана</div>
            </Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.square}>
            <Link className={styles.text} to={routes.MENU}>
              <div>Алгоритм Шеннона - Фано</div>
            </Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.square}>
            <Link className={styles.text} to={routes.MENU}>
              <div>Арифметическое кодирование</div>
            </Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.square}>
            <Link className={styles.text} to={routes.MENU}>
              <div>Код Хэмминга</div>
            </Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.square}>
            <Link className={styles.text} to={routes.MENU}>
              <div>Код Рида - Соломона</div>
            </Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.square}>
            <Link className={styles.text} to={routes.MENU}>
              <div>LZ78 LZ77</div>
            </Link>
          </div>
        </div>
        <div className={styles.block}>
          <div className={styles.square}>
            <Link className={styles.text} to={routes.MENU}>
              <div>BMP</div>
            </Link>
          </div>
        </div>
        <div className={styles.block}>
          <h1>Алгоритмы кодировки и сжатия</h1>
          <h4>Выполнил: Бутерус Д.В.</h4>
        </div>
      </div>
    </div>
  );
}
