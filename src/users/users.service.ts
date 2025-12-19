// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // Tesna3 user jdid w tcrypti password b-bcrypt
  async create(email: string, username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
      role: UserRole.TECH, 
    });

    return this.usersRepository.save(user);
  }
 // Tlawaj ala user b email  (mestaamla fel Login)
  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }
// Tlawaj ala user bidou (mesta3mla fel Profile)
  async findById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }
}
