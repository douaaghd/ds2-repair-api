import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInterventionDto {
  @IsString() 
  @IsNotEmpty()
  description: string;

  @IsNumber() //lezem lID tkoun rakem
  @IsNotEmpty()
  deviceId: number;

  @IsArray() //ithabet ken liste tbaathet (tableau)
  @IsNumber({}, { each: true }) 
  @IsOptional() //tnajem taamel intervention hata ken famech piece jdida
  sparePartIds?: number[];
}