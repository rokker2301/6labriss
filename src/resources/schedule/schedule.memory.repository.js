import { v4 as uuidv4 } from 'uuid';
import Schedule from './schedule.model.js';

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

const Schedules = [
  new Schedule({id: uuidv4(), productID: 'test', isActive: true, startDate:'2020-1-1', endDate:'2020-1-2', createdAt:'2020-1-1', updateAt:'2020-1-2'})
];

const getAll = async () => Schedules;

const getById = async (id) => Schedules.find((schedule) => schedule.id === id);
const getByTourId = async (productID) => Schedules.find((schedule) => schedule.productID === productID);

const createSchedule = async ({ productID, isActive, startDate, endDate }) => {
  const schedule = new Schedule({id:uuidv4(), productID, isActive, startDate, endDate});
  Schedules.push(schedule);
  return schedule;
}

const deleteById = async (id) => {
  const pricePosition = Schedules.findIndex((schedule) => schedule.id === id);
  if (pricePosition === -1) return null; 
  
  const priceDeletable = Schedules[pricePosition];
  Schedules.splice(pricePosition, 1);
  return priceDeletable;
}

const updateById = async ({id, productID, isActive, startDate, endDate }) => {
  const pricePosition = Schedules.findIndex((schedule) => schedule.id === id);
  if (pricePosition === -1) return null; 

  const now = new Date();
  const oldPrice = Schedules[pricePosition]; 
  const newPrice = {...oldPrice, productID, isActive, startDate, endDate, updateAt: formatter.format(now) };

  Schedules.splice(pricePosition, 1, newPrice);
  return newPrice;
}

const deleteByTourId = async (productID) => {
  const tour = Schedules.filter((schedule) => schedule.productID === productID);

  await Promise.allSettled(
    tour.map(async (schedule) => deleteById(schedule.id))
  );
}

export { Schedules, getAll, getById, createSchedule, deleteById, updateById, deleteByTourId, getByTourId };