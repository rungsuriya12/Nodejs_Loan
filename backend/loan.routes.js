const express = require('express');
const router = express.Router();
const controller = require('./loan.controller');

router.get('/', controller.getLoans);
router.get('/:id', controller.getLoan);
router.post('/', controller.create);
router.put('/:id', controller.updateLoan);
router.delete('/:id', controller.deleteLoan);

module.exports = router;
