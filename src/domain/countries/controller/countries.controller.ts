import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CountryFilterDto } from '../dto/country.dto';
import { CountriesService } from '../service/countries.service';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly _countriesService: CountriesService) {}

  @ApiQuery({
    name: 'countryIdentifier',
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
  getAll(@Query() filter: CountryFilterDto) {
    return this._countriesService.getAll(filter);
  }
}
