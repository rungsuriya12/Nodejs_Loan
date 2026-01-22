const Loan = require('./loan.model');

exports.getLoans = async (req, res) => {
  try {
    const data = await Loan.getAll();
    res.json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดจากระบบ' + err.message
    });
  }

};

exports.getLoan = async (req, res) => {
  try {
    const data = await Loan.getById(req.params.id);
    res.json(data);
  } catch {
    console.log(err.message);
    res.status(500).json({
      message: 'เกิดข้อผิดพลาดในระบบ' + err.message
    })
  }

};


exports.create = async (req, res) => {
  try {
    const data = req.body;

    if (data.monthly_income < 15000) {
      data.decision = 'REJECTED';
      data.approvedAmount = 0;
      data.reason = 'ไม่เข้าเงื่อนไขการขอสินเชื่อ';
    } else {
      data.decision = 'PENDING';
      data.approvedAmount = 0;
      data.reason = '-';
    }

    // ✅ insert customer
    await Loan.insertCustomer(data); //ส่งตัวแปร object data

    // ✅ insert loan approval
    await Loan.insertLoanApproval(data); //ส่งตัวแปร object data

    res.status(201).json({
      message: 'Insert ' + data.decision + ' Successfuly'
    });

  } catch (err) {

    if (err.number === 2627 || err.number === 2601) {
      return res.status(409).json({
        message: 'เกิดข้อผิดพลาดจากระบบ' + err.message
      });
    }

    res.status(500).json({
      message: err.message   // 👈 แสดง error จริง
    });
  }
};


exports.updateLoan = async (req, res) => {
  try {
    const data = req.body;

    // ถ้า REJECTED → บังคับ approved_amount = 0
    if (data.decision === "REJECTED") {
      data.approved_amount = 0;
    }

    await Loan.update(req.params.id, data);
    res.status(200).json({
      message: 'update ' + data.decision + ' Successfuly'
    });

  } catch (err) {
    console.log('UPDATE ERROR:', err.number, err.message);

    res.status(500).json({
      message: 'เกิดข้อผิดพลาดจากระบบ' + err.message
    });
  }
};




exports.deleteLoan = async (req, res) => {
  await Loan.remove(req.params.id);
  res.json({ message: 'Loan deleted' });
};
