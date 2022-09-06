import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CityFilterDto } from '../dto/city.dto';
import { CityService } from '../service/city.service';

@ApiTags('Cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly _cityService: CityService) {}
  @ApiBearerAuth('StaticToken')
  @ApiQuery({
    name: 'countryIsoCode',
    type: String,
    required: true,
  })
  @ApiQuery({
    name: 'cityId',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    required: false,
  })
  @Get()
  getAll(@Query() filter: CityFilterDto) {
    return this._cityService.getAll(filter);
  }
}
