/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const { email, password } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10); // Hachage du mot de passe
        console.log("hashedPassword" + "+" + hashedPassword)
        const user = this.userRepository.create({ email, password: hashedPassword });
        return this.userRepository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
    async findOneByEmail(email: string): Promise<User | undefined> {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            return user || undefined;
        } catch (error) {
            // Handle error appropriately, e.g., log it or throw a custom error
            throw new Error('Error fetching user by email');
        }
    }
}
