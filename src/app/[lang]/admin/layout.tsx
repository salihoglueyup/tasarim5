'use client';

import { useRouter, useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const lang = params.lang as string;

  // Login sayfasındaysak layout sidebar göstermesin
  if (pathname.includes('/admin/login')) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push(`/${lang}/admin/login`);
      router.refresh();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: `/${lang}/admin/dashboard`, icon: '📊' },
    { name: 'Yazılar', path: `/${lang}/admin/posts`, icon: '📝' },
    { name: 'Kategoriler', path: `/${lang}/admin/categories`, icon: '🏷️' },
    { name: 'Yazarlar', path: `/${lang}/admin/authors`, icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white/[0.02] border-r border-white/10 flex flex-col backdrop-blur-xl">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href={`/${lang}/admin/dashboard`} className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-accent-400">
            Alo Yönetim Panel
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-200"
          >
            <span className="mr-3">🚪</span> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[150px] pointer-events-none"></div>
        
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-white/[0.01] backdrop-blur-md z-10">
          <h2 className="text-lg font-medium text-gray-200">
            {menuItems.find(i => pathname.includes(i.path))?.name || 'Yönetim'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">admin@aloyonetim.com</div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20">
              A
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 z-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
