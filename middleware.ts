import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Proteger rotas admin (exceto login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Para rotas admin diferentes de login, verificar se tem cookie de autenticação
    // Se não tiver, redirecionar para login
    const authCookie = request.cookies.get('admin-auth')
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}
