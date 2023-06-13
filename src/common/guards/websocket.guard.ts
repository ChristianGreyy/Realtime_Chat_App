import { CanActivate, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: any): Promise<boolean | any> {
    const request = context.switchToHttp().getRequest();
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      //   const decoded = jwt.verify(bearerToken, jwtConstants.secret) as any;
      const payload = await this.jwtService.verifyAsync(bearerToken, {
        secret: 'SUPER_JWT_SECRET_KEY',
      });
      return new Promise((resolve, reject) => {
        return this.userService.getUserById(payload.sub).then((user) => {
          if (user) {
            request['user'] = user;
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
