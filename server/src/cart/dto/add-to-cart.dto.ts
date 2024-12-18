import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AddToCartDto {
    @IsNotEmpty()
    @IsString()
    book_id: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}