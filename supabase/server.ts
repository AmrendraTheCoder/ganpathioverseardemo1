import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};

// For server-side operations in pages router, use this in getServerSideProps or API routes
export const createServerClient = (req: any, res: any) => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: any) {
          res.setHeader('Set-Cookie', `${name}=${value}; Path=/; ${options.httpOnly ? 'HttpOnly;' : ''} ${options.secure ? 'Secure;' : ''}`);
        },
        remove(name: string, options: any) {
          res.setHeader('Set-Cookie', `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
        },
      },
    }
  );
};