import { Router } from 'express';

import Tour from './tour.model.js';
import * as tourService from './tour.service.js';
import { getByTourId } from '../schedule/schedule.memory.repository.js'

const router = Router();

router.route('/').get(async (req, res) => {

  const tours = await tourService.getAll();
  res.render('tours', {tours});
});

router.route('/').post((async (req, res) => {
    const { title, slug, description, isActive } = req.body;

    const tour = await tourService.createTour({ title, slug, description, isActive });

    if (tour) {
      res.redirect('/tours');
    } else {
      res.status(400).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
    }
    
  })
);

router.route('/:id').get((async (req, res) => {
  const { id } = req.params;

  const price = await tourService.getById(id);

  if (price) {
    res.json(Tour.toResponse(price));
  } else {
    res.status(400).json({ code: 'USER_NOT_CREATE', msg: 'User not create' });
  }
})
);

router.route('/:id/schedules').get((async (req, res) =>{
  const { id } = req.params;

  const prices = await getByTourId(id);
  
  if (prices) {
    res.json(Tour.toResponse(prices));
  } else {
    res.status(400).json({ code: 'Price_NOT_CREATE', msg: 'Price not create' });
  }
})
);

router.route('/:id').put((async (req, res) => {
  const { id } = req.params;
  const { title, slug, description, isActive } = req.body;
  
  const price = tourService.updateById({id, title, slug, description, isActive });

  if (price) {
    res.redirect('/tours');
  } else {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
})
);

router.route('/:id').delete((async (req, res) => {
  const { id } = req.params;

  try{
    await tourService.deleteById(id);
  } catch (err) {
    res.status(400).json({ code: 'USER_NOT_FOUND', msg: 'User not found' });
  }
})
);

export default router;
