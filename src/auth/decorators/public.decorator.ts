import { SetMetadata } from '@nestjs/common';

export const IsPublicKey = 'isPublic';
/**
 * this decorator is used for choosing a route that is not
 * guarded as all routes globally.
 * @returns unguarded route.
 */
export const Public = () => SetMetadata(IsPublicKey, true);
