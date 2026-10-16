import os

categories = [
    {
        "slug": "ladder-recommend-2026",
        "title": "梯子推荐2026",
        "desc": "本栏目汇聚 2026 年度梯子推荐核心指南。围绕套餐性价比比较、计费倍率陷阱、月付与年付决策、售后维权边界与防踩坑核查清单，帮助读者建立理性的选型决策树。"
    },
    {
        "slug": "stable-ladder",
        "title": "稳定梯子",
        "desc": "本专栏聚焦稳定梯子的技术评估与运维机制。深入剖析 BGP 多入口冗余、IPLC/IEPL 专线架构、晚高峰抗拥堵原理、故障通报时效与主备容灾规划，拒绝无依据的绝对稳定承诺。"
    },
    {
        "slug": "airport-ladder",
        "title": "机场梯子",
        "desc": "本专栏涵盖机场梯子全方位选型手册。涵盖多出口国家分布、1倍率与高倍率计算、通用订阅转换、ChatGPT 及流媒体原生 IP 解锁机制，以及正规真实官网入口识别技巧。"
    },
    {
        "slug": "ladder-vpn",
        "title": "梯子 VPN",
        "desc": "本专栏探究梯子 VPN 的网络拓扑与隐私合规。对比全局加密与中转分流差异、公平使用原则（FUP）、无日志审计政策核对、跨国电商独立出口 IP 与防风控策略。"
    },
    {
        "slug": "service",
        "title": "服务资料",
        "desc": "本专栏发布梯子玩资料库官方规范与消费者服务资料。涵盖购买前 6 步必查清单、通用订阅格式转换标准、退款维权常识普及与编辑部客观披露声明。"
    }
]

for cat in categories:
    dir_path = f"src/pages/{cat['slug']}"
    os.makedirs(dir_path, exist_ok=True)
    file_path = f"{dir_path}/index.jsx"
    content = f"""import CategoryArchive from '@/components/CategoryArchive';
import articlesData from '@/data/articles.json';

export default function CategoryPage({{ openSearch }}) {{
  const articles = articlesData.filter((a) => a.category === '{cat["slug"]}');
  return (
    <CategoryArchive
      categorySlug="{cat["slug"]}"
      categoryTitle="{cat["title"]}"
      categoryDesc="{cat["desc"]}"
      articles={{articles}}
      openSearch={{openSearch}}
    />
  );
}}
"""
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Created {file_path}")
