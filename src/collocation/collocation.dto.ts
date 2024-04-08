import { IsOptional, IsString, MinLength } from 'class-validator'

export class CollocationDto {
    @IsString()
    @IsOptional()
    @MinLength(3, {
        message: 'Name must be at least 3 characters long'
    })
    name: string

    @IsString()
    @IsOptional()
    defenition: string

    @IsString()
    @IsOptional()
    example?: string

    @IsString()
    @IsOptional()
    translation?: string
}