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

  function random13Digit() {
  return Math.floor(1000000000000 + Math.random() * 9000000000000)}
  
  
// Add Customer + Loan
exports.create = async (data) => {
  const randomUserId = random13Digit()
  // insert ตาราง customers
  await sql.query`
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

  let decision;
  let approvedAmount;
  let reason;

  if (data.monthly_income < 15000) {
    decision = 'REJECTED';
    approvedAmount = 0;
    reason = 'ไม่เข้าเงื่อนไขการขอสินเชื่อ';
  } else {
    decision = 'APPROVE';
    approvedAmount = data.loan_amount;
    reason = '-';
  }

  // insert ตาราง loan_approvals
  await sql.query`
    INSERT INTO loan_approvals (
    customer_id,
      decision,
      approved_amount,
      reason_codes,
      approved_at
    )
    VALUES (
     ${data.user_id},
      ${decision},
      ${approvedAmount},
      ${reason},
      GETDATE()
    )
  `;

  return { success: true };
};





exports.update = async (id, data) => {
  await sql.query`
    UPDATE customers
    SET name = ${data.name},
        email = ${data.email}
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


