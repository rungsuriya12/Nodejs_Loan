const sql = require('./db');

//Get All Custumer
exports.getAll = async () => {
  const result = await sql.query`SELECT * FROM customers`;
  return result.recordset;
};

//Get All Custumer ID
exports.getById = async (id) => {
  const result = await sql.query`
    SELECT * FROM customers WHERE id = ${id}
  `;
  return result.recordset[0];
};

//Add Custumer
exports.create   = async (data) => {
  return sql.query`
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
    DELETE FROM customers WHERE id = ${id}
  `;
};

addItem
1 add customer
2 add creait

Item
3 get all creait FK CustomerID

view
4 get by id creait


5 Approve
 update creait
