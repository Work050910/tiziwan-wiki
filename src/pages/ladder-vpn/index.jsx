import CategoryArchive from '@/components/CategoryArchive';
import articlesData from '@/data/articles.json';

export default function CategoryPage({ openSearch }) {
  const articles = articlesData.filter((a) => a.category === 'ladder-vpn');
  return (
    <CategoryArchive
      categorySlug="ladder-vpn"
      categoryTitle="梯子 VPN"
      pageH1="梯子 VPN 深度评测与架构辨析：全局强加密对比中转分流、隐私无日志合规与跨境业务防风控"
      seoTitle="梯子 VPN 深度评测与架构辨析：全局加密与隐私合规解析 - 梯子玩资料库"
      categoryDesc="本专栏紧密围绕【梯子vpn】核心关键词展开架构与合规全景剖析。对比传统全局虚拟专用网络与国内中转专线拓扑差异、不限流量背后的公平使用原则（FUP）、离岸无日志政策真实性核查、跨境电商独立纯净出口 IP 配置与 AI 高频请求防风控策略。"
      articles={articles}
      openSearch={openSearch}
    />
  );
}
