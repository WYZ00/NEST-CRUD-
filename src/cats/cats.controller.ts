import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  NotFoundException,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // GET /cats?color=male ---> []
  @Get()
  getCats(@Query('color') color: 'brown' | 'white') {
    //const service = new CatsService();
    return this.catsService.getCats(color);
  }

  //GET /cats/:id ---> {...}
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.catsService.getCat(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  //POST /cats
  @Post()
  createCat(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    return this.catsService.createCat(createCatDto);
  }

  //PUT /cats/:id ---> {...}
  @Put(':id')
  updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.updateCat(id, updateCatDto);
  }

  //DELETE /cats/:id
  @Delete(':id')
  removeCat(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.removeCat(id);
  }
}
