import * as scheduleRepo from './schedule.memory.repository.js';
import * as priceRepo from '../price/price.memory.repository.js'

const getAll = () => scheduleRepo.getAll();
const getById = (id) => scheduleRepo.getById(id);
const createSchedule = ({productID, isActive, startDate, endDate}) => 
scheduleRepo.createSchedule({productID, isActive, startDate, endDate});
const deleteById = async (id) => {
    const priceDeletable = await getById(id);
    scheduleRepo.deleteById(id);
    priceRepo.deleteScheduleId(id);
    return priceDeletable;
}

const updateById = ({id, productID, isActive, startDate, endDate}) =>
scheduleRepo.updateById({id, productID, isActive, startDate, endDate});

export { getAll, getById, createSchedule, deleteById, updateById };