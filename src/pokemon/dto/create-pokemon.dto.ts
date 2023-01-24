import { IsInt, IsString, MinLength, IsPositive, Min } from 'class-validator';
export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @IsString()
  @MinLength(2)
  name: string;
}
