import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req) => req.headers['authorization']?.replace('Bearer ', ''),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key', 
    });
  }

  // Validate the JWT payload
  async validate(payload: JwtPayload) {
    return { userId: payload.sub, username: payload.username };
  }
}
