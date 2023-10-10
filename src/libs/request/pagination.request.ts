import { IsNumber, IsOptional } from 'class-validator';

type PaginationFilter = {
  // key must be a property of the Entity that is being filtered
  [key: string]: any;
};

type OrderBy = {
  // key must be a property of the Entity that is being sorted
  [key: string]: 'ASC' | 'DESC';
};

export class PaginationRequest {
  filter: PaginationFilter;

  orderBy: OrderBy;

  @IsNumber()
  @IsOptional()
  page: number; // 1, 2, 3 etc

  @IsNumber()
  @IsOptional()
  limit: number; // the number of items to be displayed on the page
}
