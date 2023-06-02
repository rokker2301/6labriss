import { v4 as uuidv4 } from 'uuid';
import Tour from './tour.model.js';

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

const Tours = [
  new Tour({id: uuidv4(), title: '1', slug: '1', description: '1', isActive: true, createdAt: '2020-1-1', updateAt: '2020-1-2'}),
];

const getAll = async () => Tours;

const getById = async (id) => Tours.find((tour) => tour.id === id);

const createTour = async ({ title, slug, description, isActive }) => {
  const tour = new Tour({id: uuidv4(), title, slug, description, isActive});
  Tours.push(tour);
  return tour;
}

const deleteById = async (id) => {
  const tourPosition = Tours.findIndex((tour) => tour.id === id);
  if (tourPosition === -1) return null; 
  
  const tourDeletable = Tours[tourPosition];
  Tours.splice(tourPosition, 1);
  return tourDeletable;
}

const updateById = async ({id, title, slug, description, isActive }) => {
  const tourPosition = Tours.findIndex((tour) => tour.id === id);
  if (tourPosition === -1) return null; 

  const now = new Date();
  const oldTour = Tours[tourPosition];
  const newTour = {...oldTour, title, slug, description, isActive, updateAt: formatter.format(now) };

  Tours.splice(tourPosition, 1, newTour);
  return newTour;
}

export { Tours, getAll, getById, createTour, deleteById, updateById };