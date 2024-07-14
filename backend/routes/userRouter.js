const userControl = require('../controllers/userControl');

const router = require('express').Router();

router.post('/signup',userControl.signup);
router.post('refreshtoken',userControl.refreshtoken);

module.exports = router;