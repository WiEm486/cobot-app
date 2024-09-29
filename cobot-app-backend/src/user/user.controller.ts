/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { validatePassword } from 'src/utils/password.util';
import { generateJwtToken } from 'src/utils/jwt.util';
import { SignInDto } from './dto/signin-dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('add')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Get('all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;

    // Check if user exists
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    // Validate password (you should use a secure password hashing library like bcrypt)
    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    // Return some authentication token (e.g., JWT) upon successful sign in
    const token = generateJwtToken(user.id, user.email);
    return { token };
  }
}
