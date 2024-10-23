import { Injectable } from '@nestjs/common';
import { SignupUserDto } from './dtos/signupUser.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostedJob } from 'src/postedJob/postedJob.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(newUser: SignupUserDto) {
        const createdUser = this.userRepository.create(newUser);
        await this.userRepository.save(createdUser);

        return createdUser;
    }

    async findUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });

        return user;
    }

    async getProfessionals(
        professions: string,
        page: number,
        limit: number,
    ): Promise<User[]> {
        const users = await this.userRepository.find({
            where: { role: 'professional' },
            relations: { acceptedJobs: { review: true }, categories: true },
            skip: (page - 1) * limit,
            take: limit,
        });

        return users;
    }

    async getClients(
        page: number,
        limit: number,
    ): Promise<User[]> {
        const users = await this.userRepository.find({
            where: { role: 'client' },
            relations: { postedJobs: { review: true } },
            skip: (page - 1) * limit,
            take: limit,
        });

        return users;
    }
}
