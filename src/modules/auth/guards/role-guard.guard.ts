import { RoleEnum } from '../../user/enum/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { CustomRequest } from '../../../types/request';

export const RoleGuard = (roles: RoleEnum[]): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<CustomRequest>();
      const user = request.user;

      console.log(user, roles);

      return roles.includes(user?.role);
    }
  }

  return mixin(RoleGuardMixin);
};
