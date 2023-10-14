import { IsNumber, IsOptional } from 'class-validator';
import { FindOptionsOrder, FindOptionsWhere } from 'typeorm';

export class PaginationRequest<TEntity> {
  filter: FindOptionsWhere<TEntity>;

  orderBy: FindOptionsOrder<TEntity>;

  @IsNumber()
  @IsOptional()
  page: number = 1; // 1, 2, 3 etc

  @IsNumber()
  @IsOptional()
  limit: number = 10; // the number of items to be displayed on the page
}
