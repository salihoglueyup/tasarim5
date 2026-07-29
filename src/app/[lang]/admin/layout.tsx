'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type SubItem = { name: string; path: string; icon: string };
type MenuItem = { 
  name: string; 
  path?: string; 
  icon: string; 
  subItems?: SubItem[];
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const lang = params.lang as string;

  // Açık olan accordion gruplarını tutar. İsimleriyle ('İçerik Yönetimi' vb.) eşleşir.
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    { name: 'Dashboard', path: `/${lang}/admin/dashboard`, icon: '📊' },
    { name: 'Gelen Kutusu', path: `/${lang}/admin/leads`, icon: '📬' },
    {
      name: 'İçerik Yönetimi',
      icon: '📝',
      subItems: [
        { name: 'Yazılar', path: `/${lang}/admin/posts`, icon: '📄' },
        { name: 'Kategoriler', path: `/${lang}/admin/categories`, icon: '🏷️' },
        { name: 'Yazarlar', path: `/${lang}/admin/authors`, icon: '👥' },
      ],
    },
    {
      name: 'Kurumsal Yönetim',
      icon: '🏢',
      subItems: [
        { name: 'Referanslar', path: `/${lang}/admin/references`, icon: '🏙️' },
        { name: 'İş Ortakları', path: `/${lang}/admin/partners`, icon: '🤝' },
        { name: 'S.S.S', path: `/${lang}/admin/faqs`, icon: '❓' },
      ],
    },
  ];

  // Aktif menü grubunu bulup başlangıçta otomatik açması için
  useEffect(() => {
    const activeGroupNames: string[] = [];
    menuItems.forEach((item) => {
      if (item.subItems) {
        const hasActiveChild = item.subItems.some(sub => pathname === sub.path || pathname.startsWith(sub.path + '/'));
        if (hasActiveChild) {
          activeGroupNames.push(item.name);
        }
      }
    });
    setOpenGroups(activeGroupNames);
    // Sadece ilk yüklemede çalışması için dependency array boş (veya menü yapısı değişmezse pathname'den kopuk olmalı, 
    // ama sadece ilk renderda açık kalması genelde yeterlidir, sürekli açık kapalıyı ezmemeli)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const toggleGroup = (name: string) => {
    setOpenGroups(prev => 
      prev.includes(name) ? prev.filter(g => g !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-gray-100 flex font-sans pt-[72px]">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-white/[0.02] border-r border-slate-200 dark:border-white/10 flex flex-col z-20 relative shadow-sm dark:shadow-none">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-white/10">
          <Link href={`/${lang}/admin/dashboard`} className="block text-xl font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
            Yönetim Paneli
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {menuItems.map((item) => {
            if (item.subItems) {
              const isOpen = openGroups.includes(item.name);
              const isGroupActive = item.subItems.some(sub => pathname === sub.path || pathname.startsWith(sub.path + '/'));
              
              return (
                <div key={item.name} className="flex flex-col space-y-1">
                  <button
                    onClick={() => toggleGroup(item.name)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      isGroupActive && !isOpen
                        ? 'text-brand-600 dark:text-brand-400 font-medium'
                        : 'text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    <span 
                      className="material-symbols-outlined text-lg text-slate-400 transition-transform duration-300"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                    >
                      expand_more
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col space-y-1 pl-4 pt-1">
                          {item.subItems.map((sub) => {
                            const isSubActive = pathname === sub.path || pathname.startsWith(sub.path + '/');
                            return (
                              <Link
                                key={sub.name}
                                href={sub.path}
                                className={`flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                                  isSubActive 
                                    ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 shadow-sm dark:shadow-none' 
                                    : 'text-slate-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/[0.02]'
                                }`}
                              >
                                <span className="mr-3 text-xs opacity-70">{sub.icon}</span>
                                <span className="font-medium text-xs">{sub.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            } else {
              // Tekil Eleman (Dashboard vb.)
              const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
              return (
                <Link
                  key={item.name}
                  href={item.path!}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20 shadow-sm dark:shadow-none' 
                      : 'text-slate-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            }
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-white/10 mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-500 hover:text-red-500 hover:bg-red-50 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-400/10 rounded-xl transition-all duration-200"
          >
            <span className="mr-3">🚪</span> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background glow effects (Dark mode only) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-[150px] pointer-events-none hidden dark:block"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[150px] pointer-events-none hidden dark:block"></div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 z-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
