import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  
      ignoreExpiration: false, 
      secretOrKey: configService.get<string>('JWT_SECRET'),  
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload:', payload); 
    return { userId: payload.sub, email: payload.email };
  }
  
}
