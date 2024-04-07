import { IsOptional, IsEmail, IsString, MinLength } from 'class-validator'

export class UserDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    name?: string

    @IsOptional()
    @IsString()
    @MinLength(6, {
        message: 'Password must be at least 6 characters long'
    })
    password: string
}