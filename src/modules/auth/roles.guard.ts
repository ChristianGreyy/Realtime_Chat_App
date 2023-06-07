import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/enums/role';
import { User } from '../users/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
    //   'roles',
    //   [context.getHandler(), context.getClass()],
    // );
    // if (!requiredRoles) {
    //   return true;
    // }
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    let userDoc = await User.findByPk(user.sub);
    if (!userDoc) {
      return false;
    }
    request['user'] = userDoc;
    return true;
    // return requiredRoles.some((role) => userDoc?.roles?.includes(role));
  }
}
