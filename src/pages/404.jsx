import Link from 'next/link';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { ArrowLeft, Home, Layers } from 'lucide-react';

export default function Custom404({ openSearch }) {
  return (
    <Layout openSearch={openSearch}>
      <SEO
        title="404 - 页面未找到 - 梯子玩资料库"
        description="很抱歉，您访问的页面不存在或已被移除。"
        canonical="https://tiziwan.wiki/404/"
      />

      <div className="text-center py-20 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-600 font-black text-2xl flex items-center justify-center mx-auto mb-6">
          404
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
          页面未找到
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          很抱歉，您访问的地址可能已被重新整理或路径有误。您可以返回首页或前往机场推荐核心中心页。
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Home className="w-4 h-4" />
            <span>返回首页</span>
          </Link>
          <Link
            href="/airport-recommend/"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" />
            <span>机场推荐中心页</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
