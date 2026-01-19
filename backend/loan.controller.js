const Loan = require('./loan.model');

exports.getLoans = async (req, res) => {
  const data = await Loan.getAll();
  res.json(data);
};

exports.getLoan = async (req, res) => {
  const data = await Loan.getById(req.params.id);
  res.json(data);
};


exports.create  = async (req, res) => {
  try {
    await Loan.create(req.body);
    res.status(201).json({ message: 'Insert success' });
  } catch (err) {
    if (err.number === 2627 || err.number === 2601) {
      return res.status(409).json({
        message: 'ข้อมูลซ้ำ ไม่สามารถบันทึกได้'
      });
    }

    res.status(500).json({
      message: 'เกิดข้อผิดพลาดจากระบบ'
    });

  }
};

exports.updateLoan = async (req, res) => {
  await Loan.update(req.params.id, req.body);
  res.json({ message: 'Loan updated' });
};

exports.deleteLoan = async (req, res) => {
  await Loan.remove(req.params.id);
  res.json({ message: 'Loan deleted' });
};
