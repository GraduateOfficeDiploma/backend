import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

export class PaginationRequest<TEntity> {
  @ApiProperty({ description: 'Filter criteria for the query.' })
  filter: FindOptionsWhere<TEntity>;

  @ApiProperty({ description: 'Ordering criteria for the query.' })
  orderBy: FindOptionsOrder<TEntity>;

  @ApiProperty({
    description: 'The page number to retrieve.',
    minimum: 1, // Add validation constraints as needed
  })
  @IsNumber()
  @IsOptional()
  page: number = 1; // 1, 2, 3 etc

  @ApiProperty({
    description: 'The number of items to be displayed on the page.',
    minimum: 1, // Add validation constraints as needed
  })
  @IsNumber()
  @IsOptional()
  limit: number = 10; // the number of items to be displayed on the page
}
