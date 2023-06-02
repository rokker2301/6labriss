import * as priceRepo from './price.memory.repository.js';

const getAll = () => priceRepo.getAll();
const getById = (id) => priceRepo.getById(id);
const createPrice = ({scheduleID, priceValue, priceCurrency}) => 
priceRepo.createPrice({scheduleID, priceValue, priceCurrency});
const deleteById = async (id) => {
    const priceDeletable = await getById(id);
    priceRepo.deleteById(id);
    return priceDeletable;
}

const updateById = ({id, scheduleID, priceValue, priceCurrency}) =>
    priceRepo.updateById({id, scheduleID, priceValue, priceCurrency});

export { getAll, getById, createPrice, deleteById, updateById };