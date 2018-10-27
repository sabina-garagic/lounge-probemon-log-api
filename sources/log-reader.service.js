const moment = require('moment');
const fs = require('fs');
const readline = require('readline');

const pathToLogFile = '/home/pi/python/probemon/probemon.log';

class LogReaderService {
  fetchLast5MinutesOfLog() {
    return new Promise((resolve) => {
      const log = [];

      var rd = readline.createInterface({
        input: fs.createReadStream(pathToLogFile),
        console: false
      });

      rd.on('line', line => {
        this._appendToLog(line, log);
      });

      rd.on('close', () => {
        resolve(log);
      })
    });
  }

  _appendToLog(line, log) {
    const lineInfo = line.split(';');
    const timestampMoment = moment(lineInfo[0]);
    if (this._isWithin5Minutes(timestampMoment)) {
      log.push({
        timestamp: lineInfo[0],
        mac: lineInfo[1],
        manufacturer: lineInfo[2]
      });
    }
  }

  _isWithin5Minutes(timeMoment) {
    return moment().add(-5, 'minute').isBefore(timeMoment);
  }
}

module.exports = new LogReaderService();
