# coding: utf-8
import os

category_meta = {
    "ladder-recommend-2026": {
        "slug": "ladder-recommend-2026",
        "navTitle": "梯子推荐2026",
        "pageH1": "梯子推荐2026年度权威评测指南：套餐性价比比较、流量规则与防踩坑决策大全",
        "seoTitle": "梯子推荐2026年度权威评测指南：套餐性价比比较与防踩坑决策 - 梯子玩资料库",
        "desc": "本专栏紧密围绕【梯子推荐2026】核心关键词展开深度评测。全方位解剖 2026 年度梯子推荐选型标准、月度套餐可用流量核算、真实高峰倍率陷阱、小额月付风险把控、售后维权边界与防踩坑核查清单，助您科学搭建高速稳定的网络方案。"
    },
    "stable-ladder": {
        "slug": "stable-ladder",
        "navTitle": "稳定梯子",
        "pageH1": "稳定梯子推荐与技术评估指南：BGP多入口冗余、IPLC专线架构与晚高峰抗拥堵资料",
        "seoTitle": "稳定梯子推荐与技术评估指南：专线架构与晚高峰抗拥堵核验 - 梯子玩资料库",
        "desc": "本专栏紧密围绕【稳定梯子】核心关键词展开技术核验与长效运维分析。深入剖析国内三网 BGP 边缘入口调度、IPLC/IEPL 国际内网专线抗丢包能力、晚高峰 QoS 突破技术、官方运维通报时效性以及科学的主备双梯容灾策略，杜绝无实据的绝对稳定营销宣传。"
    },
    "airport-ladder": {
        "slug": "airport-ladder",
        "navTitle": "机场梯子",
        "pageH1": "机场梯子推荐与节点选型手册：全球节点覆盖、流量倍率计算、通用订阅与流媒体解锁",
        "seoTitle": "机场梯子推荐与节点选型手册：节点覆盖、倍率计算与流媒体解锁 - 梯子玩资料库",
        "desc": "本专栏紧密围绕【机场梯子】核心关键词展开实用选型全指南。涵盖主流亚太低延迟与欧美大带宽节点分布矩阵、1倍率与高倍率真实计费测算、通用订阅格式跨端导入、ChatGPT及海外流媒体原生 IP 解锁机制，以及权威官方真实入口防钓鱼防假冒技巧。"
    },
    "ladder-vpn": {
        "slug": "ladder-vpn",
        "navTitle": "梯子 VPN",
        "pageH1": "梯子 VPN 深度评测与架构辨析：全局强加密对比中转分流、隐私无日志合规与跨境业务防风控",
        "seoTitle": "梯子 VPN 深度评测与架构辨析：全局加密与隐私合规解析 - 梯子玩资料库",
        "desc": "本专栏紧密围绕【梯子vpn】核心关键词展开架构与合规全景剖析。对比传统全局虚拟专用网络与国内中转专线拓扑差异、不限流量背后的公平使用原则（FUP）、离岸无日志政策真实性核查、跨境电商独立纯净出口 IP 配置与 AI 高频请求防风控策略。"
    },
    "service": {
        "slug": "service",
        "navTitle": "服务资料",
        "pageH1": "梯子服务资料与官方规范指南：购买前6步必查清单、订阅转换与编辑部透明披露标准",
        "seoTitle": "梯子服务资料与官方规范指南：购买前核查清单与透明披露 - 梯子玩资料库",
        "desc": "本专栏紧密围绕【梯子服务资料】核心关键词发布权威使用守则。系统发布购买前 6 步防坑必查自检清单、主流订阅格式标准化转换规范、突发故障应对与工单沟通边界，以及梯子玩资料库编辑部恪守的中立客观准则与商业赞助返利透明披露。"
    }
}

for cat_slug, meta in category_meta.items():
    file_path = f"src/pages/{cat_slug}/index.jsx"
    content = f"""import CategoryArchive from '@/components/CategoryArchive';
import articlesData from '@/data/articles.json';

export default function CategoryPage({{ openSearch }}) {{
  const articles = articlesData.filter((a) => a.category === '{cat_slug}');
  return (
    <CategoryArchive
      categorySlug="{cat_slug}"
      categoryTitle="{meta['navTitle']}"
      pageH1="{meta['pageH1']}"
      seoTitle="{meta['seoTitle']}"
      categoryDesc="{meta['desc']}"
      articles={{articles}}
      openSearch={{openSearch}}
    />
  );
}}
"""
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file_path}")

