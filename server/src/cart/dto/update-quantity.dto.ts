import { IsInt, IsPositive, IsString } from 'class-validator';

export class UpdateQuantityDto {
  @IsInt()
  @IsPositive()
  quantity: number;

  @IsString()
  publisher: string;
  @IsString()
  bookId: string;
}
