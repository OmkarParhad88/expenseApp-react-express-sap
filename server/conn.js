const hana = require('@sap/hana-client');

const conn = hana.createConnection();

const connParams = {
  serverNode: 'hostname:30015',
  uid: 'your-username',
  pwd: 'your-password',
  encrypt: true,        // Optional, for HANA Cloud SSL connection
  sslValidateCertificate: false,  // Optional, for HANA Cloud
};

conn.connect(connParams, (err) => {
  if (err) {
    return console.error('Connection error:', err);
  }

  conn.exec('SELECT * FROM your_table', (err, rows) => {
    if (err) {
      console.error('Execution error:', err);
    } else {
      console.log(rows);
    }

    conn.disconnect();
  });
});
