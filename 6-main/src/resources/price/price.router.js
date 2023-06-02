import { Router } from 'express';
// import { StatusCodes } from 'http-status-codes';

import Price from './price.model.js';
import * as priceService from './price.service.js';

const router = Router();

router.route('/').get(async (req, res) => {
  const prices = await priceService.getAll();
  res.render('prices', {prices});
});

router.route('/:id').get((async (req, res) => {
  const { id } = req.params;

  const price = await priceService.getById(id);

  if (price) {
    res.json(Price.toResponse(price));
  } else {
    res.status(400).json({ code: 'Price_NOT_CREATE', msg: 'Price not create' });
  }
})
);

router.route('/').post((async (req, res) => {
  const { scheduleID, priceValue, priceCurrency } = req.body;

  const price = await priceService.createPrice({ scheduleID, priceValue, priceCurrency });

  if (price) {
    res.redirect('/prices');
  } else {
    res.status(400).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
  }
  
})
);

router.route('/:id').put((async (req, res) => {
  const { id } = req.params;
  const { scheduleID, priceValue, priceCurrency } = req.body;
  
  const price = priceService.updateById({id, scheduleID, priceValue, priceCurrency });

  if (price) {
    res.redirect('/prices');
  } else {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
})
);

router.route('/:id').delete((async (req, res) => {
  const { id } = req.params;

  try{
    await priceService.deleteById(id);
  } catch (err) {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
})
);

export default router;