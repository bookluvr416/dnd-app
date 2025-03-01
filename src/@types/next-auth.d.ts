import type { Session, User, Account } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    id: UserId,
    access_token: string,
    exp: number,
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}
