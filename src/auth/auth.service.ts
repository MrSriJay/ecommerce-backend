
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity'; 
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Register a new user
  async register(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = this.userRepository.create({ username, password: hashedPassword });
    return await this.userRepository.save(newUser);
  }

  // Validate user credentials
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  // Generate JWT token
  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
