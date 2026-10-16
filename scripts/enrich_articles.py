import json
import os
import sys

# Add scripts directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from data_ladder_recommend import DATA as LADDER_DATA
from data_stable_ladder import DATA as STABLE_DATA
from data_airport_ladder import DATA as AIRPORT_DATA
from data_ladder_vpn import DATA as VPN_DATA

ALL_DATA = {}
ALL_DATA.update(LADDER_DATA)
ALL_DATA.update(STABLE_DATA)
ALL_DATA.update(AIRPORT_DATA)
ALL_DATA.update(VPN_DATA)

with open('src/data/airports.json', 'r', encoding='utf-8') as f:
    airports_list = json.load(f)

top5_airports = {ap['slug']: ap for ap in airports_list[:5]}

with open('src/data/articles.json', 'r', encoding='utf-8') as f:
    articles = json.load(f)

print(f"Total articles in articles.json: {len(articles)}")
print(f"Total rich specs defined in ALL_DATA: {len(ALL_DATA)}")

missing_slugs = []
for art in articles:
    slug = art['slug']
    if slug not in ALL_DATA:
        missing_slugs.append(slug)

if missing_slugs:
    print(f"ERROR: Missing specs for slugs: {missing_slugs}")
    sys.exit(1)

# Default airport profiles for the top 5
airport_profiles = [
    {
        "slug": "quanqiuyun",
        "name": "全球云",
        "rank": 1,
        "isFlagshipFirst": True,
        "minPrice": "20 元/月 · 120GB/月",
        "promoCode": "qq88",
        "affUrl": "https://hueue09.gcvipaff.com/#/?code=z8U9aaa4",
        "nodeDetails": "香港/日本/新加坡/美西全线企业级 IPLC/IEPL 内网专线，配备多国家原生纯净住宅 IP",
        "targetAudience": "全天候跨国远程办公、外贸商务、ChatGPT/Claude AI 深度交互、4K/8K 极致超高清影音用户"
    },
    {
        "slug": "feimaoyun",
        "name": "飞猫云",
        "rank": 2,
        "isFlagshipFirst": False,
        "minPrice": "7 元/月 · 50GB/月 (年付折算)",
        "promoCode": "flycat888",
        "affUrl": "https://quanqiu.flycatvipaff.cc/#/?code=7ZOeVmNS",
        "nodeDetails": "亚太主流中转优化节点（香港、日本、新加坡、美国），精简高效出口",
        "targetAudience": "预算有限的在校学生、轻度学术论文查阅、Google 检索及轻度日常备用用户"
    },
    {
        "slug": "muguang",
        "name": "暮光加速",
        "rank": 3,
        "isFlagshipFirst": False,
        "minPrice": "20 元/月 · 120GB/月",
        "promoCode": "mm88",
        "affUrl": "https://quanqi12.twilightaff.com/#/?code=beAVqNPf",
        "nodeDetails": "优质 BGP 多线中转，覆盖港日新美及欧美高频节点，全双向流媒体解锁支持",
        "targetAudience": "注重晚高峰平稳办公的都市白领、跨国企业员工、追剧发烧友及均衡型中度用户"
    },
    {
        "slug": "dalaoyun",
        "name": "大佬云",
        "rank": 4,
        "isFlagshipFirst": False,
        "minPrice": "20 元/月 · 120GB",
        "promoCode": "dly88",
        "affUrl": "https://adcua9104.dalaoyunaff.com/#/?code=J6GqQqk8",
        "nodeDetails": "大带宽专线集群，多地区冷热出口全覆盖，高吞吐并发冗余储备充裕",
        "targetAudience": "大容量数据搬运、Git 仓库拉取、高画质多媒体创作者及重度大流量消耗者"
    },
    {
        "slug": "breezenet",
        "name": "微风网络（BreezeNet）",
        "rank": 5,
        "isFlagshipFirst": False,
        "minPrice": "25 元/月 · 200GB/月",
        "promoCode": "wfwl88",
        "affUrl": "https://edp01.breezenetaff.com/#/?code=vxDUI8kY",
        "nodeDetails": "企业级 IEPL 高可用 SD-WAN 专线，骨干多路由热备，三网 BGP 边缘就近接入",
        "targetAudience": "跨国音视频会议、团队多设备协同办公、对网络中断零容忍的高阶商业用户"
    }
]

for art in articles:
    slug = art['slug']
    spec = ALL_DATA[slug]

    art['leadAnswer'] = spec['leadAnswer']
    art['suitableFor'] = spec['suitableFor']
    art['notSuitableFor'] = spec['notSuitableFor']
    art['coreConclusion'] = spec['coreConclusion']
    art['decisionPath'] = spec['decisionPath']
    art['metricsTable'] = spec['metricsTable']
    art['deepDiveSections'] = spec['deepDiveSections']
    art['checklist'] = spec['checklist']
    art['customFaqs'] = spec['customFaqs']

    contextual_evals = spec.get('contextualEvals', {})

    embedded = []
    for ap_profile in airport_profiles:
        ap_slug = ap_profile['slug']
        custom_eval = contextual_evals.get(ap_slug, f"在《{art['title']}》评估体系中表现优异，综合性能符合主流推荐规范。")
        embedded.append({
            "name": ap_profile["name"],
            "slug": ap_profile["slug"],
            "rank": ap_profile["rank"],
            "isFlagshipFirst": ap_profile["isFlagshipFirst"],
            "minPrice": ap_profile["minPrice"],
            "promoCode": ap_profile["promoCode"],
            "affUrl": ap_profile["affUrl"],
            "nodeDetails": ap_profile["nodeDetails"],
            "targetAudience": ap_profile["targetAudience"],
            "contextualEval": custom_eval
        })
    art['embeddedAirports'] = embedded

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print("Successfully enriched all 54 articles in src/data/articles.json!")
