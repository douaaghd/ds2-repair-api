import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
// Bech tthabbet fel-data elli jaya mel client bech tesnaa 9ataa jdida
export class CreateSparePartDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsNumber()
  @IsPositive()
  price: number;
}
