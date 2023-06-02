import { v4 as uuidv4 } from 'uuid';
import Price from './price.model.js';

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

const Prices = [
  new Price({id: uuidv4(), Scheduled: 'test', priceValue: 15, priceCurrecy: 25, createdAt: '2020-1-1', updateAt: '2020-1-2'})
];

const getAll = async () => Prices;

const getById = async (id) => Prices.find((price) => price.id === id);
const getByScheduledId = async (scheduleID) => Prices.find((price) => price.scheduleID === scheduleID);

const createPrice = async ({ scheduleID, priceValue, priceCurrency }) => {
  const price = new Price({id:uuidv4(), scheduleID, priceValue, priceCurrency});
  Prices.push(price);
  return price;
}

const deleteById = async (id) => {
  const pricePosition = Prices.findIndex((price) => price.id === id);
  if (pricePosition === -1) return null; 
  
  const priceDeletable = Prices[pricePosition];
  Prices.splice(pricePosition, 1);
  return priceDeletable;
}

const updateById = async ({id, scheduleID, priceValue, priceCurrency }) => {
  const pricePosition = Prices.findIndex((price) => price.id === id);
  if (pricePosition === -1) return null; 

  const now = new Date();
  const oldPrice = Prices[pricePosition]; 
  const newPrice = {...oldPrice, scheduleID, priceValue, priceCurrency,updateAt: formatter.format(now) };

  Prices.splice(pricePosition, 1, newPrice);
  return newPrice;
}

const deleteScheduleId = async (scheduleID) => {
  const schedule = Prices.filter((price) => price.scheduleID === scheduleID);

  await Promise.allSettled(
    schedule.map(async (price) => deleteById(price.id))
  );
}

export { Prices, getAll, getById, createPrice, deleteById, updateById, deleteScheduleId, getByScheduledId };