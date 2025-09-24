import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiKeyService } from '../api-key/api-key.service';

@Injectable()
export class DevApiGuard implements CanActivate {
  constructor(private apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader =
      req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('API key required');
    }
    const apiKey = authHeader.replace('Bearer ', '').trim();
    const userId = await this.apiKeyService.validateApiKey(apiKey);
    if (!userId) throw new UnauthorizedException('Invalid API key');
    req.devUserId = userId;
    return true;
  }
}
