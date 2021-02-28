import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('Users')
        private readonly usersModel: Model<UserDocument>,
    ) { }

    findAll(): Promise<UserDocument[]> {
        return this.usersModel.find().exec();
    }

    async findOneByUsername(username: string): Promise<UserDocument> {
        return this.usersModel.findOne({ username: username }).exec();
    }

    async create(createUserDto: CreateUserDto){
        if (await this.findOneByUsername(createUserDto.username)){
            throw new BadRequestException("Ce nom d\'utilisateur est déjà utilisé");
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, process.env.SECRET_FOR_PASSWORD);
        return (await this.usersModel.create(createUserDto)).save();
    }

}
