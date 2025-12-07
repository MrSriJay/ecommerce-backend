import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';  // Adjust path if needed
import { LoginDto } from '../user/dto/login.dto';  // Adjust path if needed


@ApiTags('auth') // Make sure this is here to tag the controller in Swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body.username, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and get a JWT token' })
  @ApiResponse({ status: 200, description: 'JWT token returned successfully' })
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }
}