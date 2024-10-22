const {
  getOverview,
  getOverviewAdminPanel,
} = require('../controllers/viewController');

const router = require('express').Router();

router.get('/', getOverview);

router.get('/admin', getOverviewAdminPanel);

module.exports = router;
