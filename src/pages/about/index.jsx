import Link from 'next/link';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import {
  ShieldCheck,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function AboutPage({ openSearch }) {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: '关于梯子玩资料库',
    url: 'https://tiziwan.wiki/about/',
    description: '梯子玩资料库 (tiziwan.wiki) 的立站初心、编辑原则、数据核验标准与商业披露声明。',
  };

  return (
    <Layout openSearch={openSearch}>
      <SEO
        title="关于本站与编辑原则 - 梯子玩资料库"
        description="梯子玩资料库 (tiziwan.wiki) 的立站初心、中立评测原则、数据采集标准、赞助外链披露与免责声明。面向中文读者提供真实、透明的网络资料库。"
        canonical="https://tiziwan.wiki/about/"
        schemaData={aboutSchema}
      />

      {/* Header */}
      <div className="max-w-5xl xl:max-w-6xl mx-auto w-full mb-8">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-3">
          <Link href="/" className="hover:text-slate-900 transition-colors">首页</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">关于本站</span>
        </nav>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
          关于梯子玩资料库 (tiziwan.wiki)
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
          <strong>梯子玩资料库</strong>是一个面向关注梯子推荐2026、稳定梯子、机场梯子和梯子vpn资料的中文读者的静态技术文档站。我们的目标是打破网络代理行业普遍存在的信息不对称、虚假绝对承诺与价格陷阱，为真实用户提供结构化、可核验的公开数据。
        </p>
      </div>

      <div className="max-w-5xl xl:max-w-6xl mx-auto w-full space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700">
        {/* Section 1: Logo & Visual */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-slate-900 p-2.5 shrink-0 shadow-md">
              <img src="/tiziwan_icon.png" alt="Icon" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                品牌标志与视觉理念
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                基于 <strong>tiziwan.wiki</strong> 域名设计，深蓝黑圆角矩形基底融合赛博青蓝阶梯、橙金核心与天蓝信号光波。象征着“登高跨越物理障碍”的阶梯拓扑，以及汇聚全网选型数据的 Wiki 知识枢纽。
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Core Principles */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <span>我们的三大核心编辑原则</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs mb-2">1</div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">拒绝虚假绝对承诺</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  海缆故障、机房割接和网络抖动客观存在。市场上宣称“100% 永久稳定”、“绝对不被封”的产品多为不可信营销。本站强调“理性预期”与“主备容灾”。
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-2">2</div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">坚持事实核查与标注</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  对于价格、流量倍率与协议架构，来自官方文档或用户测试的均严格标注数据状态；对于未验证事项标注“待二次核验”，不捏造虚假参数。
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs mb-2">3</div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">首选小额月付检验</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  我们始终倡导读者在选购任何服务时首先进行为期一个月的月付测试，经过晚高峰实际考验与设备兼容验证后再做长远打算。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Commercial Disclosures */}
        <section className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Info className="w-5 h-5 text-sky-600" />
            <span>透明度与赞助返利声明</span>
          </h2>
          <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-2">
            <p>
              为了维持本站服务器开支、自动化抓取索引以及长期的数据核验工作，本站部分指向 28 家机场的外部链接为推广返利链接（严格标记为 <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono text-xs">rel=&quot;sponsored nofollow&quot;</code>）。
            </p>
            <p>
              当您通过这些链接注册并购买时，服务商可能会向我们支付微薄的佣金。但这绝不会增加您的购买成本（相反，使用本站优惠码往往能享受专属折扣），更不会影响我们对服务商优缺点的中立揭示与中肯评价。
            </p>
          </div>
        </section>

        {/* Central Link CTA */}
        <div className="p-6 sm:p-7 bg-slate-900 text-white rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <div className="font-bold text-base sm:text-lg text-white mb-1">查阅 2026 年度 28 家服务商档案</div>
            <div className="text-xs text-slate-400">所有数据均已更新至 2026 年最新基准，包含线路架构、套餐资费与核心优缺点</div>
          </div>
          <Link
            href="/airport-recommend/"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shrink-0 flex items-center gap-1.5 transition-colors shadow-md"
          >
            <span>进入机场推荐核心中心页</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
