import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateSparePartDto {
  @IsInt()
  @IsOptional()
  @IsPositive()
  stock?: number;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;
}
