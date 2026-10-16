import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Search, Menu, X, ShieldCheck, Zap } from 'lucide-react';

export default function Header({ openSearch }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: '机场推荐', href: '/airport-recommend/', highlight: true },
    { name: '2026梯子推荐', href: '/ladder-recommend-2026/' },
    { name: '稳定梯子推荐', href: '/stable-ladder/' },
    { name: '机场梯子', href: '/airport-ladder/' },
    { name: '梯子 VPN', href: '/ladder-vpn/' },
    { name: '常见问题', href: '/faq/' },
    { name: '关于本站', href: '/about/' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-xs ring-1 ring-slate-200 group-hover:scale-105 transition-transform flex items-center justify-center bg-slate-900">
                <img src="/tiziwan_icon.png" alt="梯子玩资料库 Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                  梯子玩资料库
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                  tiziwan.wiki · 2026 最新核验
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = router.asPath.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    item.highlight
                      ? 'bg-amber-500 text-white font-semibold shadow-xs hover:bg-amber-600'
                      : isActive
                      ? 'text-sky-600 bg-sky-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Header Right: Search Bar & Mobile Trigger */}
          <div className="flex items-center gap-2">
            {/* Search Bar on the Right */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2.5 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 hover:text-slate-900 rounded-full border border-slate-200 transition-all focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              aria-label="搜索全站文章与机场资料"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">搜索文章/机场/FAQ...</span>
              <span className="sm:hidden">搜索</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-white border border-slate-300 rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-hidden"
              aria-label="打开导航菜单"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-sm text-center font-medium ${
                  item.highlight
                    ? 'bg-amber-500 text-white font-bold'
                    : router.asPath.startsWith(item.href)
                    ? 'bg-sky-50 text-sky-600 font-semibold'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="text-xs text-center text-slate-400 pt-2 border-t border-slate-100">
            资料库核验周期：2026年最新 · 建议首选月付测试
          </div>
        </div>
      )}
    </header>
  );
}
