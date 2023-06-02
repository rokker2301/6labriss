import { Router } from 'express';
// import { StatusCodes } from 'http-status-codes';

import Schedule from './schedule.model.js';
import * as scheduleService from './schedule.service.js';
import { getByScheduledId}  from '../price/price.memory.repository.js';

const router = Router();

router.route('/').get(async (req, res) => {
  const schedules = await scheduleService.getAll();
  res.render('schedules', {schedules});
});

router.route('/:id').get((async (req, res) => {
  const { id } = req.params;

  const schedule = await scheduleService.getById(id);

  if (schedule) {
    res.json(Schedule.toResponse(schedule));
  } else {
    res.status(400).json({ code: 'Price_NOT_CREATE', msg: 'Price not create' });
  }
})
);

router.route('/:id/prices').get((async (req, res) =>{
  const { id } = req.params;

  const prices = await getByScheduledId(id);
  
  if (prices) {
    res.json(Schedule.toResponse(prices));
  } else {
    res.status(400).json({ code: 'Price_NOT_CREATE', msg: 'Price not create' });
  }
})
);

router.route('/').post((async (req, res) => {
  const { productID, isActive, startDate, endDate } = req.body;

  const schedule = await scheduleService.createSchedule({ productID, isActive, startDate, endDate });

  if (schedule) {
    res.redirect('/schedules');
  } else {
    res.status(400).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
  }
  
})
);

router.route('/:id').put((async (req, res) => {
  const { id } = req.params;
  const { productID, isActive, startDate, endDate } = req.body;
  
  const schedule = scheduleService.updateById({id, productID, isActive, startDate, endDate });

  if (schedule) {
    res.redirect('/schedule');
  } else {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
})
);

router.route('/:id').delete((async (req, res) => {
  const { id } = req.params;

  try{
    await scheduleService.deleteById(id);
  } catch (err) {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
})
);

export default router;