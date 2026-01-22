const sql = require('./db');

//Get All loan_approvals customers
exports.getAll = async () => {
  const result = await sql.query`SELECT la.*, c.*
FROM loan_approvals la
LEFT JOIN customers c
  ON la.customer_id = c.user_id
`
  return result.recordset;
};

//Get All Custumer ID
exports.getById = async (id) => {
  const result = await sql.query`
SELECT la.*, c.*
FROM loan_approvals la
LEFT JOIN customers c
  ON la.customer_id = c.user_id
WHERE la.id = ${id};
  `;
  return result.recordset[0];
};

  
// Add Customer + Loan
// loan.model.js

exports.insertCustomer = async (data) => {
  const result = await sql.query`
    INSERT INTO customers (
      user_id,
      citizen_id,
      name,
      lastname,
      monthly_income,
      loan_amount,
      created_at
    )
    VALUES (
      ${data.user_id},
      ${data.citizen_id},
      ${data.name},
      ${data.lastname},
      ${data.monthly_income},
      ${data.loan_amount},
      GETDATE()
    )
  `;

  return result;
};

exports.insertLoanApproval = async (data) => {
  const result = await sql.query`
    INSERT INTO loan_approvals (
      customer_id,
      decision,
      approved_amount,
      reason_codes,
      approved_at
    )
    VALUES (
      ${data.user_id},
      ${data.decision},
      ${data.approved_amount},
      ${data.reason},
      GETDATE()
    )
  `;

  return result;
};





exports.update = async (id, data) => {
  await sql.query`
  UPDATE loan_approvals
  SET
      decision = ${data.decision},
      approved_amount = ${data.approved_amount},
      reason_codes = ${data.reason_codes},
      approved_at = GETDATE()
      WHERE id = ${id}
  `;
};


exports.remove = async (id) => {
  await sql.query`
    DELETE FROM loan_approvals WHERE customer_id = ${loan_id};
  `;
    await sql.query`
    DELETE FROM customers WHERE id =  ${customer_id};
  `;
};


