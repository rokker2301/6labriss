import * as toursRepo from './tour.memory.repository.js';
import * as scheduleRepo from '../schedule/schedule.memory.repository.js'

const getAll = () => toursRepo.getAll();
const getById = (id) => toursRepo.getById(id);
const createTour = ({title, slug, description, isActive}) => 
    toursRepo.createTour({title, slug, description, isActive});
const deleteById = async (id) => {
    const tourDeletable = await getById(id);
    toursRepo.deleteById(id);
    scheduleRepo.deleteByTourId(id);
    return tourDeletable;
}

const updateById = ({id, title, slug, description, isActive}) => {
    toursRepo.updateById({id, title, slug, description, isActive});
}

export { getAll, getById, createTour, deleteById, updateById };
