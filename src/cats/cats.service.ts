import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  private cats = [
    { id: 0, name: 'Kyaung Ma Gyi', color: 'brown' },
    { id: 1, name: 'Mi Phyu', color: 'white' },
  ];

  getCats(color?: 'brown' | 'white') {
    if (color) {
      return this.cats.filter((cat) => cat.color === color);
    }

    return this.cats;
  }

  getCat(id: number) {
    const cat = this.cats.find((cat) => cat.id === id);

    if (!cat) {
      throw new Error('Cat not Found');
    }
    return cat;
  }

  createCat(createCatDto: CreateCatDto) {
    const newCat = {
      ...createCatDto,
      id: Date.now(),
    };
    this.cats.push(newCat);
    return newCat;
  }

  updateCat(id: number, updateCatDto: UpdateCatDto) {
    this.cats = this.cats.map((cat) => {
      if (cat.id === id) {
        return { ...cat, ...updateCatDto };
      }
      return cat;
    });
    return this.getCat(id);
  }

  removeCat(id: number) {
    const toBeRemoved = this.getCat(id);
    this.cats = this.cats.filter((cat) => cat.id !== id);
    return toBeRemoved;
  }
}
