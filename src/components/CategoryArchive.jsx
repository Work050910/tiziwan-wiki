import Link from 'next/link';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { BookOpen, Calendar, ArrowRight, Layers, ShieldCheck, Sparkles } from 'lucide-react';

export default function CategoryArchive({
  categorySlug,
  categoryTitle,
  pageH1,
  seoTitle,
  categoryDesc,
  articles,
  openSearch
}) {
  const displayH1 = pageH1 || `${categoryTitle}指南与资料汇总`;
  const displaySeoTitle = seoTitle || `${categoryTitle}指南与资料汇总 - 梯子玩资料库`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '首页', item: 'https://tiziwan.wiki/' },
      { '@type': 'ListItem', position: 2, name: categoryTitle, item: `https://tiziwan.wiki/${categorySlug}/` },
    ],
  };

  return (
    <Layout openSearch={openSearch}>
      <SEO
        title={displaySeoTitle}
        description={categoryDesc}
        canonical={`https://tiziwan.wiki/${categorySlug}/`}
        schemaData={breadcrumbSchema}
      />

      {/* Header Banner */}
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-3">
          <Link href="/" className="hover:text-slate-900 transition-colors">首页</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{categoryTitle}</span>
        </nav>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3">
          <Calendar className="w-3.5 h-3.5" />
          <span>收录核心文档：{articles.length} 篇 · 2026年度权威核验</span>
        </div>

        {/* Extended H1 for SEO/GEO */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
          {displayH1}
        </h1>

        {/* Extended Description tailored to keywords */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl mb-6">
          {categoryDesc}
        </p>

        {/* Central Hub Link Pill with Global Cloud Highlight */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-sky-50 rounded-xl border border-amber-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="text-slate-800">
            <span className="font-bold text-amber-950 flex items-center gap-1.5 mb-1 text-xs sm:text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>核心长文评测推荐：首选【全球云】（QuanQiu Cloud）</span>
            </span>
            <span className="leading-relaxed text-slate-600">全网 28 家机场长文全量排行榜与对比表已上线，支持右侧目录定位与 8 折专属优惠码。</span>
          </div>
          <Link
            href="/airport-recommend/"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg shadow-2xs shrink-0 flex items-center gap-1.5 transition-colors text-xs sm:text-sm"
          >
            <span>进入机场推荐长文中心页</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-14">
        {articles.map((art) => (
          <Link
            key={art.slug}
            href={`/${categorySlug}/${art.slug}/`}
            className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                <span className="font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md">
                  {art.categoryName}
                </span>
                <span>{art.date}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-2 leading-snug">
                {art.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                {art.seoDescription || art.description}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-sky-600 pt-4 border-t border-slate-100 mt-4">
              <span>阅读完整深度评测</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
