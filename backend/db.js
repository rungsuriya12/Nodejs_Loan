const sql = require('mssql');

const config = {
  user: 'sasa',
  password: '0821142514Zx',
  server: 'DESKTOP-0CDFREI\\SQLEXPRESS',
  database: 'Loan_Data',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

sql.connect(config)
  .then(() => console.log('✅ SQL Server Connected'))
  .catch(err => console.error('❌ DB Error:', err));



module.exports = sql;

  //user: 'sasa',
  //password: '0821142514Zx',  
  // server: 'KSP696\\SQLEXPRESS4',