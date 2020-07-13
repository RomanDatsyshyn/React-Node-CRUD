const router = require('express').Router();

const { goodsController } = require('../controller');

router.get('/', goodsController.getAll);

router.get('/search', goodsController.getByName);

router.get('/:product_id', goodsController.getById);

router.post('/add', goodsController.add);

router.put('/:product_id', goodsController.edit);

router.delete('/:product_id/delete', goodsController.delete);

module.exports = router;
