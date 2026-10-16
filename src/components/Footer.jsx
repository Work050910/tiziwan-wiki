import Link from 'next/link';
import { ShieldCheck, Info, HelpCircle, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Intro */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg overflow-hidden bg-slate-800 p-0.5">
                <img src="/tiziwan_icon.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-white text-base">梯子玩资料库</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              面向关注2026梯子推荐、稳定梯子、机场梯子和梯子vpn的中文读者。围绕专线架构、月付套餐、测速评测与购买前核验组织文档，以 /airport-recommend/ 为全站核心枢纽。
            </p>
            <div className="text-[11px] text-slate-500">
              域名：tiziwan.wiki · 纯静态技术架构
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              核心分类导航
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/airport-recommend/" className="text-amber-400 hover:text-amber-300 font-medium">
                  ★ 2026机场推荐核心中心页 (28家收录)
                </Link>
              </li>
              <li>
                <Link href="/ladder-recommend-2026/" className="hover:text-white transition-colors">
                  2026梯子推荐 指南 (14篇)
                </Link>
              </li>
              <li>
                <Link href="/stable-ladder/" className="hover:text-white transition-colors">
                  稳定梯子 评估与维护 (14篇)
                </Link>
              </li>
              <li>
                <Link href="/airport-ladder/" className="hover:text-white transition-colors">
                  机场梯子 节点与倍率 (14篇)
                </Link>
              </li>
              <li>
                <Link href="/ladder-vpn/" className="hover:text-white transition-colors">
                  梯子 VPN 协议与隐私 (12篇)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Topics & FAQs */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              专题与支持
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/faq/" className="hover:text-white transition-colors">
                  常见问题 FAQ (100组问答)
                </Link>
              </li>
              <li>
                <Link href="/about/" className="hover:text-white transition-colors">
                  关于本站与编辑原则
                </Link>
              </li>
              <li>
                <Link href="/stable-ladder/stable-ladder-maintenance-and-records/" className="hover:text-white transition-colors">
                  专线维护与可用性指标
                </Link>
              </li>
              <li>
                <Link href="/ladder-recommend-2026/ladder-recommend-2026-pre-purchase-checklist/" className="hover:text-white transition-colors">
                  购买前核查清单与防坑指引
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Keyword Index */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
              页脚关键词索引
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">tiziwan.wiki</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">梯子玩资料库</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">2026梯子推荐</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">稳定梯子评测</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">机场梯子推荐</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">梯子VPN推荐</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">常见问题 FAQ</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-slate-300">免责声明</span>
            </div>
          </div>
        </div>

        {/* Commercial Disclosure & Disclaimer */}
        <div className="border-t border-slate-800/80 pt-8 pb-4 text-xs leading-relaxed space-y-3 text-slate-400">
          <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60 flex items-start gap-3">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300">透明度与商业关系披露：</strong>
              本站包含部分服务商的推荐返利外链（标记为 sponsored nofollow）。当您通过本站链接注册或订阅时，我们可能获得微薄佣金用于维持服务器与数据核验开支，但这绝不会影响我们的客观数据呈现、价格透明度与缺点披露。
            </p>
          </div>

          <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/60 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong className="text-slate-300">免责声明与服务边界：</strong>
              本站仅供技术资料整理、网络选型参数客观对比与学术交流参考。本站不运营任何代理服务器，不承诺任何服务“永久稳定”或“永不掉线”。所有套餐价格、节点情况、优惠码与退款条款均以服务商官方实时结算页面为准。请严格遵守您所在地法律法规，禁止利用网络从事任何违规活动。
            </p>
          </div>

          <div className="text-center text-[11px] text-slate-400 pt-4">
            © 2026 tiziwan.wiki · 梯子玩资料库 · 保留所有权利
          </div>
        </div>
      </div>
    </footer>
  );
}
