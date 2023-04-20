const fs = require('fs');

exports.logNow = (data) => {
  fs.appendFile('./public/logs.txt', data + '\n', function (err) {
    if (err) throw err;
  });
  if (process.env.NODE_ENV == 'development') {
    console.log(data);
  }
};

exports.logExternalCall = (data) => {
  fs.appendFile('./public/logs.externalcall.txt', data + '\n', function (err) {
    if (err) throw err;
  });
  if (process.env.NODE_ENV == 'development') {
    console.log(data);
  }
};

exports.logEmailSent = (data) => {
  fs.appendFile('./public/logs.email-good.txt', data + '\n', function (err) {
    if (err) throw err;
  });
  if (process.env.NODE_ENV == 'development') {
    console.log(data);
  }
};

exports.logEmailFail = (data) => {
  fs.appendFile('./public/logs.email-failed.txt', data + '\n', function (err) {
    if (err) throw err;
  });
  if (process.env.NODE_ENV == 'development') {
    console.log(data);
  }
};

exports.logSmsSent = (data) => {
  fs.appendFile('./public/logs.sms-good.txt', data + '\n', function (err) {
    if (err) throw err;
  });
  if (process.env.NODE_ENV == 'development') {
    console.log(data);
  }
};

exports.logSmsFail = (data) => {
  fs.appendFile('./public/logs.sms-failed.txt', data + '\n', function (err) {
    if (err) throw err;
  });
  if (process.env.NODE_ENV == 'development') {
    console.log(data);
  }
};
