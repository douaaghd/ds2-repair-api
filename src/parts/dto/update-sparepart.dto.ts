import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';
// Bechi tthabbet fel-data ki theb tbeddel stock wala soum
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
