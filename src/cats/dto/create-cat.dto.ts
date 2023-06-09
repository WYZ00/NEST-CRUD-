import { IsEnum, MinLength } from "class-validator";

export class CreateCatDto {
  @MinLength(3)
  name: string;
  @IsEnum(['brown','white'],{message:"Use correct colors!"})
  color: 'brown' | 'white';
}
