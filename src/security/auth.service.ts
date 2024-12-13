import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (user && user.password === password) {
      const payload = { sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new Error('Invalid credentials');
  }

  async register(email: string, password: string): Promise<{ access_token: string }> {
    const existingUser = await this.userService.getUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = await this.userService.createUser(email, password);

    const payload = { sub: newUser.id, role: newUser.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
