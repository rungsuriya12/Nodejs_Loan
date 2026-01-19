const sql = require('mssql');

const config = {
  user: 'sa',
  password: '0821142514Zx',
  server: 'KSP696\\SQLEXPRESS4',
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
