import mysql from 'mysql2';
import sqlite from 'better-sqlite3';
import { tle } from './lib/parsers/legacy.mjs';
import fs from 'fs';

let TLE = new tle();
let databaseName = 'mpe_test.db';
let start = new Date();
let total = 0;
let hrstart = process.hrtime();
let pageSize = 500000;
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'tj',
  password: '',
  database: 'tle'
});

const punch = () => {
  console.log('done');
  process.exit(0);
}

connection.connect();
fs.unlinkSync(databaseName);
let predicates = ['EPOCH', 'MEAN_MOTION', 'ECCENTRICITY', 'INCLINATION', 'RA_OF_ASC_NODE', 'MEAN_ANOMALY', 'NORAD_CAT_ID', 'BSTAR']
const db = new sqlite(databaseName, {});
db.pragma('journal_mode = WAL');
db.exec(`CREATE TABLE IF NOT EXISTS mpe(
  EPOCH REAL,
  MEAN_MOTION REAL,
  ECCENTRICITY REAL,
  INCLINATION REAL,
  RA_OF_ASC_NODE REAL,
  MEAN_ANOMALY REAL,
  NORAD_CAT_ID REAL,
  BSTAR REAL
);`);
db.exec(`CREATE INDEX _EPOCH on mpe (EPOCH)`);
db.exec(`CREATE INDEX _NORAD_CAT_ID on mpe (NORAD_CAT_ID)`);

let runInsert = (refresh) => {
  if (refresh) {
    db.exec('DELETE FROM mpe;');
  }
  const stmt = db.prepare(`SELECT COUNT(*) FROM mpe`);
  let offset = Object.values(stmt.get())[0];
  if (offset > total) {
    punch();
  }


  var end = new Date() - start,
    hrend = process.hrtime(hrstart)

  console.info('Execution time: %dms', end)
  console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)

  console.log(`${((offset / total) * 100).toFixed(10)}% ${offset} of ${total}`);
  connection.query(`SELECT line1, line2 from tle ORDER BY EPOCH DESC LIMIT ${pageSize} OFFSET ${offset}`, function (error, results, fields) {
    if (error) {
      throw error;
    } else if (!results.length) {
      punch();
    } else {

      const insert = db.prepare(
        `INSERT INTO mpe (${predicates.join(', ')}) 
                VALUES(${predicates.map((p, i) => !i ? `julianday(@${p})` : `@${p}`).join(', ')})`);

      const insertMany = db.transaction((mpes) => {
        for (const mpe of mpes) {
          insert.run(mpe);
        }
      });

      insertMany(results.map(a => {
        let mpe = TLE.format.OMM([a.line1, a.line2]);
        for (let x in mpe) {
          if (mpe[x].toNumber) {
            mpe[x] = mpe[x].toNumber();
          } if (mpe[x].getTime) {
            mpe[x] = mpe[x].getTime();
          } else if (predicates.indexOf(x) === -1) {
            delete mpe[x];
          }
        }
        return mpe;
      }));
      runInsert();
    }
  });
}
connection.query(`SELECT COUNT(*) FROM tle`, function (error, results, fields) {
  total = Object.values(results[0])[0];
  runInsert(true);
})

process.on('beforeExit', () => {
  connection.end();
})
