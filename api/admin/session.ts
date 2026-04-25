import { isAuthenticated } from '../_lib/auth';

export default async function handler(request: Request) {
  return Response.json({ authenticated: isAuthenticated(request) });
}
