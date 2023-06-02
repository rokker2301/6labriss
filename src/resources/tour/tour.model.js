import { v4 as uuidv4 } from 'uuid';

const formatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit'
});

class Tour {
  constructor({ id = uuidv4(),
      now = new Date(),
      title = 'Test', 
      slug = 'tset',
      description = 'description',
      isActive = false,
      createdAt = formatter.format(now),
      updateAt = formatter.format(now)
    } = {}) {
      this.id = id;
      this.title = title;
      this.slug = slug;
      this.description = description;
      this.isActive = isActive;
      this.createdAt = createdAt;
      this.updateAt = updateAt;
  }

  static toResponse(tour) {
    const { id, title, slug, description, isActive, createdAt, updateAt } = tour;
    return { id, title, slug, description, isActive, createdAt, updateAt };
  }
}

export default Tour;
