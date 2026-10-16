# coding: utf-8
import json, os
import faq_builder

# 1. 28 Airports Data
airports = [
    {
        "id": "01",
        "slug": "u1s1",
        "name": "U1S1",
        "affUrl": "https://quanqiu.v2yunvipaff.com/#/?code=YCf9VJsS",
        "promoCode": "u1s188",
        "promoDesc": "新老用户通用福利优惠码",
        "minPrice": "20 元/月 · 120GB/月",
        "lineType": "中转优化专线",
        "tags": ["长期自用稳定", "原生 IP 解锁", "档位明确", "轻量入门"],
        "summary": "定位偏向“稳定、标注清楚”的长期自用方案。公开资料强调中转优化、原生 IP 解锁与明确的流量档位，更适合在意实际可用性、又不想研究复杂配置的用户。",
        "plans": [
            {"name": "基础体验版", "price": "20 元/月", "traffic": "120GB/月", "period": "按月结算"},
            {"name": "日常影音版", "price": "40 元/月", "traffic": "300GB/月", "period": "按月结算"},
            {"name": "重度冲浪版", "price": "100 元/月", "traffic": "700GB/月", "period": "按月结算"},
            {"name": "尊享大户版", "price": "180 元/月", "traffic": "1500GB/月", "period": "按月结算"},
            {"name": "不限时流量包", "price": "580 元", "traffic": "1000GB (不限时)", "period": "一次性买断"}
        ],
        "suitableFor": ["日常轻度至中度影音追剧", "长期主力自用且厌恶频繁切线者", "对原生 IP 有解锁诉求的用户"],
        "unsuitableFor": ["需要数 TB 极低成本下行大户", "追求极端免费测试的用户"],
        "aiSupport": "支持主流 ChatGPT、Claude 等常用平台，原生住宅与机房纯净出口降低风控拦截率。",
        "streaming": "支持 YouTube 4K 流畅加载，常规解锁 Netflix、Disney+ 等主流海外流媒体区域。",
        "devices": "支持常规个人多端并发使用，具体在线 IP 限制以结算面板说明为准。",
        "pros": ["中转优化延迟抖动小", "原生 IP 识别率高", "阶梯跨度合理，入门月费门槛亲民"],
        "cons": ["不限时大包单价偏高", "需在结算页二次确认并发设备数限制"],
        "checkTips": "套餐名称与价格据公开资料整理，购买前仍需在官方结算页确认流量重置周期与当前可用库存。"
    },
    {
        "id": "02",
        "slug": "jilianyun",
        "name": "极连云",
        "affUrl": "https://quanqiu.jlyvipaff.com/#/?code=NplcUEEV",
        "promoCode": "jly88",
        "promoDesc": "结算输入享专属折扣福利",
        "minPrice": "15.5 元/月 · 100GB/月",
        "lineType": "IPLC 内网纯专线",
        "tags": ["IPLC 内网专线", "抗 QoS 封锁", "港日极低延迟", "晚高峰保障"],
        "summary": "主打 IPLC 内网专线的连通稳定性，重点突出抗封锁、防 QoS，以及香港、日本方向的低延迟体验；对敏感时期仍需保持连接、同时使用 AI 与流媒体的用户更有吸引力。",
        "plans": [
            {"name": "轻量体验年付", "price": "96 元/年 (折合 8 元/月)", "traffic": "60GB/月", "period": "年付预付"},
            {"name": "基础版 (月付)", "price": "15.5 元/月", "traffic": "100GB/月", "period": "按月结算"},
            {"name": "进阶版 (月付)", "price": "30.5 元/月", "traffic": "200GB/月", "period": "按月结算"},
            {"name": "旗舰版 (月付)", "price": "65.5 元/月", "traffic": "500GB/月", "period": "按月结算"},
            {"name": "尊享版 (月付)", "price": "120.5 元/月", "traffic": "1000GB/月", "period": "按月结算"},
            {"name": "不限时流量包", "price": "399 元", "traffic": "1000GB (不限时)", "period": "一次性买断"}
        ],
        "suitableFor": ["特殊敏感时期需稳定连通者", "港日低延迟游戏与实时互动用户", "ChatGPT 与办公会议重度依赖者"],
        "unsuitableFor": ["预算极低且仅接受免费者", "不愿年付却想享受 8 元档的用户"],
        "aiSupport": "内网专线不过公网审查，对 OpenAI、Claude 及 Copilot 提供高可用连通环境。",
        "streaming": "港日新加坡原生节点解锁 Netflix、YouTube Premium 等，晚高峰 4K 拖拽无卡顿。",
        "devices": "允许标准个人设备并发连接，不限多操作系统客户端通用订阅导入。",
        "pros": ["纯 IPLC 内网架构抗封锁极佳", "晚高峰时段延迟稳定无断流", "月付 15.5 元极具性价比"],
        "cons": ["年付折算价需一次性支付全年", "专线流量倍率需在客户端留意"],
        "checkTips": "年付折算价不等于常规月付门槛；专线覆盖节点、流量倍率和长期套餐退款条款以实时结算页为准。"
    },
    {
        "id": "03",
        "slug": "guangnianti",
        "name": "光年梯",
        "affUrl": "https://quanqiu.gntaff.com/#/?code=qUJeOegs",
        "promoCode": "gnt88",
        "promoDesc": "专属新人优惠码",
        "minPrice": "18 元/月 · 110GB/月",
        "lineType": "三网优化 BGP 专线",
        "tags": ["新手友好", "三网接入优化", "一键订阅导入", "ChatGPT 专用"],
        "summary": "把易用性放在前面，强调客户端一键导入、三网线路优化和清晰的套餐档位。它更适合作为新手第一次接触机场时的轻量选择，并兼顾 ChatGPT 等常用服务的访问需求。",
        "plans": [
            {"name": "入门版", "price": "18 元/月", "traffic": "110GB/月", "period": "按月结算"},
            {"name": "晋级版", "price": "34 元/月", "traffic": "220GB/月", "period": "按月结算"},
            {"name": "专业版", "price": "68 元/月", "traffic": "450GB/月", "period": "按月结算"},
            {"name": "至尊版", "price": "130 元/月", "traffic": "900GB/月", "period": "按月结算"},
            {"name": "私人专线", "price": "680 元/月", "traffic": "500GB/月 (独享带宽)", "period": "按月结算"}
        ],
        "suitableFor": ["网络配置新手与小白用户", "日常查阅海外资讯与学术检索", "ChatGPT 等轻量办公交互"],
        "unsuitableFor": ["超大带宽视频压测用户", "需要极端冷门地区小众出口的用户"],
        "aiSupport": "内置 AI 优化智能分流策略，直接畅联 ChatGPT 网页版与官方客户端。",
        "streaming": "支持主流 1080P/4K 高清播放，主流地区流媒体库自动分流解锁。",
        "devices": "支持通用多平台订阅导入，多设备同时在线数按套餐规格递增。",
        "pros": ["新手教程与一键导入极为简明", "三网智能适配，移动电信联通均衡", "入门档 110GB 充裕"],
        "cons": ["独享专线价格较高", "不提供超长年付超低折扣"],
        "checkTips": "结算时确认各周期折扣、订阅导入方式及独享节点交付标准。"
    },
    {
        "id": "04",
        "slug": "guangshuyun",
        "name": "光速云",
        "affUrl": "https://quanqiu.gsyaff.com/#/?code=AAkbe2W6",
        "promoCode": "gsy88",
        "promoDesc": "光速云专属优惠码",
        "minPrice": "17 元/月 · 110GB/月",
        "lineType": "BGP 多线入口中转",
        "tags": ["BGP 入口优化", "超低响应延迟", "即时通讯优先", "不限时流量可选"],
        "summary": "核心叙事是 BGP 入口与低延迟中转，兼顾三网接入和客户端快速导入。相较单纯堆流量，它更适合网页、即时通信及轻度游戏等对响应速度更敏感的日常场景。",
        "plans": [
            {"name": "轻量年付", "price": "99 元/年 (折合约 8.25 元/月)", "traffic": "59GB/月", "period": "年付预付"},
            {"name": "极速版", "price": "17 元/月", "traffic": "110GB/月", "period": "按月结算"},
            {"name": "流光版", "price": "34 元/月", "traffic": "220GB/月", "period": "按月结算"},
            {"name": "量子版", "price": "68 元/月", "traffic": "450GB/月", "period": "按月结算"},
            {"name": "无界版", "price": "130 元/月", "traffic": "900GB/月", "period": "按月结算"},
            {"name": "一次性不限时", "price": "680 元", "traffic": "1000GB (不限时)", "period": "一次性买断"}
        ],
        "suitableFor": ["Telegram/Discord/Slack 即时通讯高频交互", "日常网页秒开与技术文档查阅", "轻度跨区低延迟需求"],
        "unsuitableFor": ["超大体积 BT 下载（严禁）", "只寻找 5 元以下廉价垃圾机场者"],
        "aiSupport": "良好支持 AI 常用工具，快速握手避免长等待。",
        "streaming": "支持 4K YouTube 与主流视频站点平滑播放。",
        "devices": "标准多设备在线支持，支持通用订阅转换。",
        "pros": ["BGP 入口抗波动能力强", "页面打开握手极快", "套餐档位划分精细"],
        "cons": ["年付流量按月重置", "不限时包门槛稍高"],
        "checkTips": "最低价格字段按常规月付口径；年付与不限时套餐的流量重置及有效期以结算页为准。"
    },
    {
        "id": "05",
        "slug": "weituyun",
        "name": "唯兔云",
        "affUrl": "https://quanqiu.vipaff.cc/#/?code=c4sOJBXE",
        "promoCode": "wty88",
        "promoDesc": "唯兔云专属通用折扣码",
        "minPrice": "14.9 元/月 · 100GB/月",
        "lineType": "VLESS 架构 / 智能负载",
        "tags": ["VLESS 现代协议", "60+ 全球节点", "智能负载均衡", "免频繁切线"],
        "summary": "采用 VLESS 作为主要协议卖点，并强调 60+ 节点、三网优化与智能负载均衡。节点选择空间和自动调度能力是它的差异点，适合希望减少手动换线频率的进阶用户。",
        "plans": [
            {"name": "入门年付", "price": "79.9 元/年 (折合 6.66 元/月)", "traffic": "45GB/月", "period": "年付预付"},
            {"name": "基础版 (100GB)", "price": "14.9 元/月 · 40.9 元/季 · 142.9 元/年", "traffic": "100GB/月", "period": "多周期可选"},
            {"name": "进阶版 (200GB)", "price": "29.9 元/月 · 80.9 元/季 · 286.9 元/年", "traffic": "200GB/月", "period": "多周期可选"},
            {"name": "高级版 (500GB)", "price": "59.9 元/月 · 161.9 元/季 · 547.9 元/年", "traffic": "500GB/月", "period": "多周期可选"},
            {"name": "尊享版 (1000GB)", "price": "119.9 元/月 · 323.9 元/季 · 1150.9 元/年", "traffic": "1000GB/月", "period": "多周期可选"},
            {"name": "不限时流量包", "price": "340 元", "traffic": "500GB (不限时)", "period": "一次性买断"}
        ],
        "suitableFor": ["多设备自动负载调度用户", "对 VLESS 协议有明确偏好的进阶用户", "长期追剧与多地区访问需求者"],
        "unsuitableFor": ["只认传统单节点手动测速的用户", "纯小白完全不愿了解通用订阅者"],
        "aiSupport": "全节点自动化健康检查，OpenAI 及主流 AI 工具连接平稳。",
        "streaming": "覆盖港台日新美等热门流媒体区域，自动故障转移保障连续观影。",
        "devices": "支持常规多端并发，支持订阅自动拉取与定时更新。",
        "pros": ["VLESS 协议抗干扰性出众", "节点规模达 60+ 选择丰富", "季付与年付梯度优惠力度明显"],
        "cons": ["不限时包需注意账户保持活跃", "部分偏门节点倍率偶有变动"],
        "checkTips": "购买前核对有效期和账户规则，客户端需支持 VLESS 协议规范。"
    },
    {
        "id": "06",
        "slug": "yuzhouyun",
        "name": "宇宙云",
        "affUrl": "https://quanqiu.yuzoucloud.cc/#/?code=f3DHb9Gj",
        "promoCode": "yzy88",
        "promoDesc": "宇宙云专属优惠码",
        "minPrice": "14.9 元/月 · 100GB/月",
        "lineType": "企业级专线 / 70+ 多国节点",
        "tags": ["70+ 节点", "多国家出口", "大流量高性价比", "通用订阅支持"],
        "summary": "走“多地区覆盖 + 大流量性价比”路线，公开资料还提到三网接入优化和主流客户端订阅导入。适合经常切换不同国家或地区节点、又希望控制月度成本的用户。",
        "plans": [
            {"name": "公开入门档", "price": "14.9 元/月", "traffic": "100GB/月", "period": "按月结算"},
            {"name": "大流量高阶档", "price": "需以官方后台实时阶梯为准", "traffic": "250GB-1000GB/月", "period": "多周期可选"}
        ],
        "suitableFor": ["需要跨国多地区出口的跨境业务测试", "经常切换小众国家节点的用户", "预算控制在 15 元左右的学生与初阶群体"],
        "unsuitableFor": ["要求每一跳物理拓扑完全透明的企业级用户", "对单一节点晚高峰有超极端吞吐要求者"],
        "aiSupport": "提供多国洁净 IP 出口，针对不同地区 ChatGPT 限制灵活切换节点。",
        "streaming": "支持主流海外流媒体区域解锁，覆盖亚洲与欧美主要流媒体节点。",
        "devices": "支持通用订阅与自研客户端导入，支持多设备协同。",
        "pros": ["节点覆盖国家与地区极其广泛（70+）", "入门门槛低，月付仅 14.9 元", "大流量性价比出色"],
        "cons": ["高阶梯队价格需登录控制台查看", "各节点峰值性能差异需自行筛选"],
        "checkTips": "需在邀请页确认节点地区、流量倍率、设备数、续费和退款规则。"
    },
    {
        "id": "07",
        "slug": "sujie",
        "name": "速界",
        "affUrl": "https://quanqiu.speedworldaff.cc/#/?code=kY825Zat",
        "promoCode": "sj88",
        "promoDesc": "速界专属福利码",
        "minPrice": "25 元/月 · 150GB/月",
        "lineType": "高带宽 IPLC 专线",
        "tags": ["高带宽 IPLC", "晚高峰承载", "4K/8K 极速", "重度影音专用"],
        "summary": "卖点集中在高带宽 IPLC 专线和晚高峰承载，宣传方向覆盖低延迟与 4K/8K 流媒体。它更适合对高峰时段速度、高清播放和大流量传输要求较高的重度用户。",
        "plans": [
            {"name": "极速版 (150GB/月)", "price": "25 元/月 · 71.25 元/季 · 255 元/年", "traffic": "150GB/月", "period": "多周期可选"},
            {"name": "超速版", "price": "50 元/月 · 142.5 元/季 · 510 元/年", "traffic": "以结算页为准", "period": "多周期可选"},
            {"name": "光速版", "price": "100 元/月 · 285 元/季 · 1020 元/年", "traffic": "以结算页为准", "period": "多周期可选"},
            {"name": "跃迁版", "price": "200 元/月 · 570 元/季 · 2040 元/年", "traffic": "以结算页为准", "period": "多周期可选"},
            {"name": "年付体验包", "price": "88 元/年", "traffic": "轻量尝鲜包", "period": "年付预付"}
        ],
        "suitableFor": ["晚高峰 4K/8K 超高清流媒体发烧友", "大文件频繁传输与跨国高清视频会议", "对网络抖动零容忍的重度使用者"],
        "unsuitableFor": ["月预算低于 20 元的纯轻量用户", "仅需文字检索且极少看视频者"],
        "aiSupport": "全专线低延迟，ChatGPT 响应迅速，Claude 对话无断连。",
        "streaming": "强项为 4K/8K 高码率流畅加载，原生 IP 全解锁热门流媒体平台。",
        "devices": "支持家庭与个人多设备并发连接，稳定带宽保障。",
        "pros": ["晚高峰抗拥堵能力极其强悍", "带宽冗余高，超高清视频拖拽秒开", "长期订阅周期折扣丰富"],
        "cons": ["入门价格 25 元起步偏中高", "高阶档具体流量需在结算页确认"],
        "checkTips": "公开价格表未同时列明各高阶档流量，写作与购买时切勿自行推算，以实时结算页为准。"
    },
    {
        "id": "08",
        "slug": "sogoyun",
        "name": "SOGO 云",
        "affUrl": "https://afasfw.sogotztz2.sbs/#/?code=Mgoqf6KP",
        "promoCode": "sgy88",
        "promoDesc": "SOGO 云通用优惠券",
        "minPrice": "20 元/月 · 120GB/月",
        "lineType": "全球节点专线优化",
        "tags": ["多设备并发", "大起步流量", "家庭团队协同", "不限时包可选"],
        "summary": "突出全球节点、专线优化和多设备使用，套餐从较大的月流量起步。内容角度可聚焦家庭或小团队的多端并发，以及 4K 流媒体和 AI 工具同时使用的便利性。",
        "plans": [
            {"name": "活动入门档", "price": "20 元/月 (常规为 25 元/月)", "traffic": "120GB/月", "period": "按月结算"},
            {"name": "常规优选版", "price": "50 元/月", "traffic": "250GB/月", "period": "按月结算"},
            {"name": "常规强化版", "price": "100 元/月", "traffic": "500GB/月", "period": "按月结算"},
            {"name": "常规顶配版", "price": "200 元/月", "traffic": "1000GB/月", "period": "按月结算"},
            {"name": "一次性不限时", "price": "100元/100G · 200元/250G · 400元/500G", "traffic": "各档不限时流量", "period": "买断不限时"}
        ],
        "suitableFor": ["多台手机电脑平板同时在线的家庭", "3-5 人微型跨国协作工作室", "追剧与 AI 开发工具混合使用人群"],
        "unsuitableFor": ["独身一人极度节约流量者", "无法接受活动价可能回调者"],
        "aiSupport": "支持多设备同时请求 ChatGPT 与海外 AI API 接口，无 IP 冲突。",
        "streaming": "支持各主流流媒体多屏并发播放，香港日本节点顺畅。",
        "devices": "主打多设备高并发，家庭网络与多端同时接入不排斥。",
        "pros": ["多设备连接宽容度高", "起步流量 120GB 充足", "不限时流量包档位选择多"],
        "cons": ["活动入门价有库存周期限制", "常规基础档单月费用略升至 25 元"],
        "checkTips": "活动价可能随时调整，多设备和同时在线规则应在下单前确认。"
    },
    {
        "id": "09",
        "slug": "kuaili",
        "name": "快狸",
        "affUrl": "https://quanqiu.kuailicloud.cc/#/?code=vuYET5Qj",
        "promoCode": "kl88",
        "promoDesc": "快狸专属优惠码",
        "minPrice": "10 元/月 · 30GB/月",
        "lineType": "均衡中转线路",
        "tags": ["超低月费入门", "免折腾配置", "日常主力备用", "大流量常规版"],
        "summary": "强调中转线路优化和简单配置，三网接入取向较均衡，月付即提供较大流量。适合不想折腾规则或客户端、只需要一套日常主力订阅的用户。",
        "plans": [
            {"name": "活动入门档", "price": "10 元/月 (限时活动)", "traffic": "30GB/月", "period": "按月结算"},
            {"name": "森狸年付小包", "price": "120 元/年", "traffic": "30GB/月", "period": "年付预付"},
            {"name": "月猩月付小包", "price": "15 元/月", "traffic": "50GB/月", "period": "按月结算"},
            {"name": "小狸基础", "price": "22 元/月", "traffic": "100GB/月", "period": "按月结算"},
            {"name": "灵理标准", "price": "35 元/月", "traffic": "250GB/月", "period": "按月结算"},
            {"name": "夜理强化", "price": "95 元/月", "traffic": "500GB/月", "period": "按月结算"},
            {"name": "天狸顶配", "price": "180 元/月", "traffic": "1000GB/月", "period": "按月结算"}
        ],
        "suitableFor": ["寻找极低门槛备用梯子的用户", "日常查资料、收发外贸邮件的上班族", "不愿花费精力折腾规则的小白"],
        "unsuitableFor": ["经常需要数百 GB 视频搬运者", "对冷门国家出口有特定需求者"],
        "aiSupport": "适配日常 ChatGPT 网页交互，线路开销小。",
        "streaming": "支持 1080P/4K 日常流媒体观看，主流出口优化。",
        "devices": "支持通用多平台客户端导入，标准并发支持。",
        "pros": ["10 元入门门槛全网少见", "无需复杂配置，开箱即用", "阶梯跨度覆盖广从 30GB 到 1TB"],
        "cons": ["10 元活动档配额较小且有时限", "晚高峰极致表现略逊于纯专线"],
        "checkTips": "客户端兼容性、退款条件和流量重置日均需在结算页确认。"
    },
    {
        "id": "10",
        "slug": "ermaoyun",
        "name": "二猫云",
        "affUrl": "https://quanqiu.2maoyunaff.cc/#/?code=zy39Ip8E",
        "promoCode": "emy88",
        "promoDesc": "二猫云专属折扣码",
        "minPrice": "20 元/月 · 100GB/月",
        "lineType": "中转 + 专线混合",
        "tags": ["中转专线混合", "原生 IP 解锁", "影音追剧优选", "性价平衡"],
        "summary": "以“中转 + 专线”的混合线路平衡成本和稳定性，并把原生 IP、流媒体解锁与较大月流量作为组合亮点。适合预算适中、主要需求是追剧和常规海外服务的用户。",
        "plans": [
            {"name": "白猫套餐", "price": "20 元/月", "traffic": "100GB/月", "period": "按月结算"},
            {"name": "橘猫畅玩版", "price": "40 元/月", "traffic": "200GB/月", "period": "按月结算"},
            {"name": "牛奶猫尊享版", "price": "80 元/月", "traffic": "400GB/月", "period": "按月结算"},
            {"name": "黑猫无限版", "price": "160 元/月", "traffic": "800GB/月", "period": "按月结算"}
        ],
        "suitableFor": ["主要需求为追剧与日常影音的用户", "希望兼顾专线品质与成本平衡者", "重视原生 IP 解锁状态的使用者"],
        "unsuitableFor": ["需要一次性不限时套餐的用户", "极端高并发团队场景"],
        "aiSupport": "良好兼容主流 AI 服务，原生 IP 减少频繁人机验证验证码。",
        "streaming": "强项在于主流海外流媒体原生解锁，Netflix/Disney+ 表现稳定。",
        "devices": "标准个人多端支持，订阅格式支持通用标准。",
        "pros": ["原生 IP 解锁能力口碑良好", "混合线路成本效益比高", "套餐命名直观，无隐藏杂费"],
        "cons": ["暂无一次性不限时流量包", "超大流量档位单价中规中矩"],
        "checkTips": "二毛博客记录为暂无一次性不限时订阅；线路构成和客户端限制仍需实测。"
    },
    {
        "id": "11",
        "slug": "yifanyun",
        "name": "一翻云",
        "affUrl": "https://quanqiu.1flyunaff.cc/#/?code=gJtw80i4",
        "promoCode": "yfy88",
        "promoDesc": "一翻云专属优惠码",
        "minPrice": "30 元/月 · 150GB/月",
        "lineType": "VLESS / Reality 架构",
        "tags": ["VLESS Reality", "新协议抗封锁", "大流量起步", "下载与视频大户"],
        "summary": "入门档就提供 150GB，定位明显偏向高流量用户；同时强调 VLESS / Reality 协议与三网优化。适合视频、下载等月度消耗较大，并在意新协议抗封锁能力的使用者。",
        "plans": [
            {"name": "VIP1 (150GB)", "price": "30 元/月 · 86 元/季 · 306 元/年", "traffic": "150GB/月", "period": "多周期可选"},
            {"name": "VIP2 (300GB)", "price": "60 元/月 · 171 元/季 · 612 元/年", "traffic": "300GB/月", "period": "多周期可选"},
            {"name": "VIP3 (600GB)", "price": "120 元/月 · 342 元/季 · 1224 元/年", "traffic": "600GB/月", "period": "多周期可选"},
            {"name": "VIP4 (1200GB)", "price": "240 元/月 · 684 元/季 · 2448 元/年", "traffic": "1200GB/月", "period": "多周期可选"}
        ],
        "suitableFor": ["月度数据消耗超 100GB 的高频用户", "对 Reality 新协议抗探测有偏好者", "视频重度搬运与大文件同步需求"],
        "unsuitableFor": ["月预算低于 25 元的轻量用户", "仅用少量文字搜索者"],
        "aiSupport": "Reality 协议伪装度高，连接 ChatGPT 及 AI API 握手顺畅。",
        "streaming": "大流量搭配高速通道，4K 视频长期播放无压力。",
        "devices": "多设备并发支持，客户端需兼容 Reality 协议。",
        "pros": ["新协议抗封锁能力极为优异", "入门即享 150GB 充沛配额", "长周期年付折扣平滑"],
        "cons": ["30 元起步门槛稍高", "需要客户端支持较新的 VLESS/Reality 配置"],
        "checkTips": "长期套餐应确认流量是否按月重置、节点倍率和退款条款。"
    },
    {
        "id": "12",
        "slug": "edgenova",
        "name": "边缘节点（EdgeNova）",
        "affUrl": "https://quanqi.edgenovaaff.cc/#/?code=8BBARdHw",
        "promoCode": "byjd88",
        "promoDesc": "EdgeNova 专属折扣码",
        "minPrice": "25 元/月 · 120GB/月",
        "lineType": "海外团队 / Reality 协议",
        "tags": ["海外团队运营", "Reality 强抗封", "原生 IP 落地", "外服与 AI 优选"],
        "summary": "海外团队运营和 Reality 协议是主要辨识度，配合原生 IP 节点，使用场景偏向外服与 AI 工具。对能接受较技术化配置、看重抗封锁与落地 IP 属性的用户更合适。",
        "plans": [
            {"name": "年付入门", "price": "108 元/年 (折合 9 元/月)", "traffic": "45GB/月", "period": "年付预付"},
            {"name": "标准版 (常规月付)", "price": "25 元/月", "traffic": "120GB/月", "period": "按月结算"},
            {"name": "进阶版 (常规月付)", "price": "50 元/月", "traffic": "250GB/月", "period": "按月结算"},
            {"name": "高级版 (常规月付)", "price": "100 元/月", "traffic": "500GB/月", "period": "按月结算"},
            {"name": "极限版 (常规月付)", "price": "200 元/月", "traffic": "1000GB/月", "period": "按月结算"}
        ],
        "suitableFor": ["海外服游戏、海外商业工具访问者", "技术型用户与注重抗主动探测者", "ChatGPT/Claude 重度提示词工程与开发"],
        "unsuitableFor": ["完全不认识通用订阅链接的小白", "极度排斥英文控制台界面的用户"],
        "aiSupport": "原生住宅与商业出口 IP，AI 平台极少触发 Cloudflare 频繁拦截验证。",
        "streaming": "支持海外冷门及热门流媒体区域原生解锁。",
        "devices": "标准多设备在线，支持主流开源内核通用客户端导入。",
        "pros": ["海外运营离岸架构抗外部干扰强", "Reality 协议抗探测能力处于前沿", "原生出口 IP 纯净"],
        "cons": ["控制台部分说明含技术术语", "最低常规月付为 25 元"],
        "checkTips": "最低价格字段按常规月付口径；英文界面、协议兼容和原生 IP 地区应先行确认。"
    },
    {
        "id": "13",
        "slug": "kexinyun",
        "name": "可信云",
        "affUrl": "https://quanqiu.kosingaff.com/#/?code=NRG0tXKO",
        "promoCode": "kxy88",
        "promoDesc": "可信云专属优惠码",
        "minPrice": "9 元/月 · 45GB/月",
        "lineType": "IEPL 企业级专线",
        "tags": ["IEPL 专线", "注重售后响应", "全平台支持", "低价尝鲜小包"],
        "summary": "品牌叙事聚焦长期稳定与售后服务，公开资料把 IEPL 专线、全平台支持及流媒体 / AI 兼容放在一起。适合愿意为服务响应和持续使用体验支付稍高月费的人。",
        "plans": [
            {"name": "轻量月付", "price": "9 元/月", "traffic": "45GB/月", "period": "按月结算"},
            {"name": "常规基础版", "price": "25 元/月", "traffic": "150GB/月", "period": "按月结算"},
            {"name": "常规标准版", "price": "50 元/月", "traffic": "300GB/月", "period": "按月结算"},
            {"name": "常规专业版", "price": "100 元/月", "traffic": "600GB/月", "period": "按月结算"},
            {"name": "常规旗舰版", "price": "200 元/月", "traffic": "1200GB/月", "period": "按月结算"},
            {"name": "年付小包 (特别注意)", "price": "96 元/年", "traffic": "60GB/年 (全年总量)", "period": "年付预付"}
        ],
        "suitableFor": ["看重客服工单回复时效的用户", "追求低成本月付体验（9元）轻度者", "日常跨国协同办公主力"],
        "unsuitableFor": ["误将年付小包理解为每月 60GB 的粗心用户", "超大流量BT滥用者"],
        "aiSupport": "IEPL 专线网络抖动极低，AI 交互体验顺畅无卡顿。",
        "streaming": "支持主流地区 4K 流媒体播放与原理解锁。",
        "devices": "全平台支持，通用订阅多端无缝同步。",
        "pros": ["9 元轻量月付试错成本极低", "IEPL 专线质量扎实", "工单售后响应机制较健全"],
        "cons": ["年付 96 元档流量为全年总计 60GB 非每月", "大容量套餐单价较为稳固"],
        "checkTips": "年付小包流量为全年总量不应写成每月；售后时效、退款规则以当前条款为准。"
    },
    {
        "id": "14",
        "slug": "quanqiuyun",
        "name": "全球云",
        "affUrl": "https://hueue09.gcvipaff.com/#/?code=z8U9aaa4",
        "promoCode": "qq88",
        "promoDesc": "结算输入 qq88 享 8 折特惠",
        "minPrice": "20 元/月 · 120GB/月",
        "lineType": "多出口智能分流专线",
        "tags": ["8 折特惠", "TikTok/YouTube", "跨境电商多 IP", "灵活计费"],
        "summary": "优势在多国家与地区节点、智能分流和较灵活的计费思路，内容场景可突出 TikTok、YouTube 与跨境业务所需的多出口 IP。适合经常切换区域、兼顾短视频和外贸工作的用户。",
        "plans": [
            {"name": "轻量年付", "price": "99 元/年", "traffic": "59GB (以结算页说明为准)", "period": "年付预付"},
            {"name": "轻量版 (月付)", "price": "20 元/月 (折后 16 元)", "traffic": "120GB/月", "period": "按月结算"},
            {"name": "进阶版 (月付)", "price": "40 元/月 (折后 32 元)", "traffic": "300GB/月", "period": "按月结算"},
            {"name": "重度版 (月付)", "price": "100 元/月 (折后 80 元)", "traffic": "700GB/月", "period": "按月结算"},
            {"name": "大户版 (月付)", "price": "180 元/月 (折后 144 元)", "traffic": "1500GB/月", "period": "按月结算"},
            {"name": "私人专线", "price": "680 元/月", "traffic": "500GB/月", "period": "按月结算"},
            {"name": "一次性不限时", "price": "100元/100G · 360元/400G · 700元/800G", "traffic": "各档不限时流量", "period": "买断不限时"}
        ],
        "suitableFor": ["TikTok 短视频运营与跨境电商卖家", "多国家地区出口频繁切换业务", "喜欢使用优惠码锁定折扣的用户"],
        "unsuitableFor": ["只需单一固定香港节点的用户", "免费试用寻找者"],
        "aiSupport": "多国 IP 矩阵匹配不同区域 AI 限制，智能规则自动避开被封机房。",
        "streaming": "支持多地区 YouTube/TikTok/Netflix 高清原画流畅加载。",
        "devices": "标准个人多端支持，独享方案支持企业级定制。",
        "pros": ["输入 qq88 可立享 8 折，性价比立显", "多国家与地区出口覆盖全面", "计费形态极其灵活（月付/不限时/独享）"],
        "cons": ["轻量年付 99 元流量口径需二次核验", "高阶独享价格偏高"],
        "checkTips": "结算时输入 qq88 可享 8 折；适用套餐、有效期及能否与活动价叠加以结算页为准。"
    },
    {
        "id": "15",
        "slug": "feimaoyun",
        "name": "飞猫云",
        "affUrl": "https://quanqiu.flycatvipaff.cc/#/?code=7ZOeVmNS",
        "promoCode": "flycat888",
        "promoDesc": "新用户季付及以上输入立享 8 折",
        "minPrice": "7 元/月 · 50GB/月 (年付折算)",
        "lineType": "低价 IEPL 专线",
        "tags": ["7 元超低价", "IEPL 专线", "自研客户端", "晚高峰香港优化"],
        "summary": "低价小流量配 IEPL 是最醒目的组合。指定站的晚高峰实测显示香港节点表现较稳，同时提供自研客户端并宣传流媒体与 AI 解锁；适合轻量备用、主用香港或多设备家庭。",
        "plans": [
            {"name": "学生版年付", "price": "84 元/年 (折合 7 元/月)", "traffic": "50GB/月", "period": "年付预付"},
            {"name": "星耀版 (月付测试档)", "price": "25 元/月", "traffic": "150GB/月", "period": "按月结算"}
        ],
        "suitableFor": ["学生与预算紧张的轻量群体", "主用香港出口、追求低延迟影音者", "需要简单自研客户端的新手家庭"],
        "unsuitableFor": ["每月需消耗 300GB 以上的重度用户", "只接受月付 7 元（该档需年付）的用户"],
        "aiSupport": "香港及亚洲节点适配 ChatGPT 等工具，连接平顺。",
        "streaming": "晚高峰香港节点稳定，支持主流 4K 流媒体观影。",
        "devices": "提供自研客户端并兼容第三方开源工具通用订阅。",
        "pros": ["年付折算仅 7 元/月极其亲民", "IEPL 架构在晚高峰香港方向稳健", "新用户季付享 8 折码"],
        "cons": ["7 元档为年付总付 84 元", "未公开完整高阶阶梯，需在后台查看"],
        "checkTips": "新用户购买季付及以上套餐输入 flycat888 可享 8 折；需在邀请页确认当前阶梯与重置包规则。"
    },
    {
        "id": "16",
        "slug": "muguang",
        "name": "暮光加速",
        "affUrl": "https://quanqi12.twilightaff.com/#/?code=beAVqNPf",
        "promoCode": "mm88",
        "promoDesc": "结算输入 mm88 可享 8 折专属特惠",
        "minPrice": "20 元/月 · 120GB/月",
        "lineType": "满带宽晚高峰专线",
        "tags": ["8 折特惠", "晚高峰 4K 跑满", "多媒体全解锁", "ChatGPT 支持"],
        "summary": "晚高峰观看 YouTube 4K 视频依然流畅，下载视频可跑满带宽；同时突出多媒体全面解锁，以及 ChatGPT 等 AI 工具的可用性，适合重视高峰期影音体验的用户。",
        "plans": [
            {"name": "基础版 (120GB)", "price": "20 元/月 · 57 元/季 · 204 元/年", "traffic": "120GB/月", "period": "多周期可选"},
            {"name": "标准版 (300GB)", "price": "40 元/月 · 114 元/季 · 408 元/年", "traffic": "300GB/月", "period": "多周期可选"},
            {"name": "旗舰版 (700GB)", "price": "100 元/月 · 285 元/季 · 1020 元/年", "traffic": "700GB/月", "period": "多周期可选"},
            {"name": "至尊版 (1.5TB)", "price": "180 元/月 · 513 元/季 · 1836 元/年", "traffic": "1500GB/月", "period": "多周期可选"},
            {"name": "不限时流量包", "price": "219元/150G · 529元/400G · 959元/800G", "traffic": "各档不限时流量", "period": "买断不限时"}
        ],
        "suitableFor": ["晚高峰 20-23 点高频观看 4K 视频者", "需要满带宽下载影音的大吞吐用户", "看重 8 折码优惠并追求稳定体验者"],
        "unsuitableFor": ["只看网页的极轻度用户", "预算 10 元以下的极端低价寻觅者"],
        "aiSupport": "全节点优化，ChatGPT、Claude 等 AI 工具响应零卡顿。",
        "streaming": "多媒体全面解锁，YouTube 4K 拖拽即播，Netflix 原生解锁。",
        "devices": "标准多设备支持，提供高可用订阅路由。",
        "pros": ["输入 mm88 立享 8 折", "晚高峰带宽冗余足，4K 播放顺滑", "套餐梯度涵盖从 120GB 到 1.5TB"],
        "cons": ["不限时包价格门槛略高", "独享定制方案单月较贵"],
        "checkTips": "结算时输入 mm88 可享 8 折；适用套餐与有效期以结算页为准。"
    },
    {
        "id": "17",
        "slug": "wavenet",
        "name": "浪网（WaveNet）",
        "affUrl": "https://langwang.wavenetaff.com/#/?code=pYe3kzd4",
        "promoCode": "lw88",
        "promoDesc": "浪网专属福利码 lw88",
        "minPrice": "25 元/月 · 150GB/月",
        "lineType": "Shadowsocks 纯协议架构",
        "tags": ["开发者专用", "ChatGPT/Claude", "不限设备数量", "多端协同"],
        "summary": "重点面向 ChatGPT、Claude 等 AI 应用和开发工具访问，同时采用买即品软件版 Shadowsocks 协议，并且不限制同时在线设备数量，更适合需要多端协作的用户。",
        "plans": [
            {"name": "入门版 (用户确认价)", "price": "25 元/月", "traffic": "150GB/月", "period": "按月结算"},
            {"name": "常规进阶", "price": "70 元/月", "traffic": "400GB/月", "period": "按月结算"},
            {"name": "常规旗舰", "price": "120 元/月", "traffic": "800GB/月", "period": "按月结算"},
            {"name": "常规大客", "price": "200 元/月", "traffic": "2TB/月", "period": "按月结算"},
            {"name": "轻量年付", "price": "119 元/年", "traffic": "80GB/月", "period": "年付预付"},
            {"name": "一次性流量包", "price": "239元/180G · 569元/450G · 1099元/900G", "traffic": "不限时流量", "period": "一次性买断"}
        ],
        "suitableFor": ["AI 提示词工程师与独立开发者", "家庭或小团队多设备并发使用", "Claude、GitHub Copilot 重度调用者"],
        "unsuitableFor": ["只想找个免费或几块钱梯子玩玩的人", "不愿使用 Shadowsocks 生态的用户"],
        "aiSupport": "专属优化 AI 路由，Claude 与 ChatGPT 保持稳定长连接不掉线。",
        "streaming": "支持常见主流流媒体 1080P/4K 解锁与播放。",
        "devices": "明确宣传不限制同时在线设备数量，团队与多设备党利好。",
        "pros": ["不限同时在线设备数量", "AI 工具连接针对性优化极佳", "Shadowsocks 生态成熟兼容性广"],
        "cons": ["高阶一次性大包单价偏高", "不同历史记录中入门价存在 25 与 30 元口径"],
        "checkTips": "结算时输入 lw88；实际折扣、适用套餐与有效期以结算页为准。"
    },
    {
        "id": "18",
        "slug": "laddercloud",
        "name": "梯子云（LadderCloud）",
        "affUrl": "https://tiziyun3.ladderaff.com/#/?code=wI00rGj2",
        "promoCode": "tiziyun",
        "promoDesc": "结算输入 tiziyun 可享 8 折特惠",
        "minPrice": "25 元/月 · 125GB/月",
        "lineType": "全线 IEPL 企业专线",
        "tags": ["8 折特惠", "全线 IEPL 专线", "缓解高峰拥堵", "小白兼顾进阶"],
        "summary": "全线采用 IEPL 企业专线，侧重缓解晚高峰拥堵，并提供 ChatGPT、Netflix 解锁。既有自研小白客户端，也兼容主流开源订阅，兼顾新手易用性和进阶用户的客户端选择。",
        "plans": [
            {"name": "基础版 (125GB)", "price": "25 元/月 (折后 20 元) · 71.25 元/季 · 255 元/年", "traffic": "125GB/月", "period": "多周期可选"},
            {"name": "进阶版 (350GB)", "price": "60 元/月 (折后 48 元) · 171 元/季 · 612 元/年", "traffic": "350GB/月", "period": "多周期可选"},
            {"name": "高级版 (750GB)", "price": "110 元/月 (折后 88 元) · 313.5 元/季 · 1122 元/年", "traffic": "750GB/月", "period": "多周期可选"},
            {"name": "顶配版 (1.6TB)", "price": "190 元/月 (折后 152 元) · 541.5 元/季 · 1938 元/年", "traffic": "1600GB/月", "period": "多周期可选"},
            {"name": "年付轻量版", "price": "89 元/年", "traffic": "60GB/年 (以官方说明为准)", "period": "年付预付"}
        ],
        "suitableFor": ["看重全线 IEPL 专线低抖动的人群", "新手兼顾进阶客户端双重需求", "喜欢使用 8 折优惠码获得高性价比者"],
        "unsuitableFor": ["极端寻找 10 元以下廉价线路者", "只需要 10GB 临时测试者"],
        "aiSupport": "低延迟 IEPL 企业通道，ChatGPT/OpenAI 访问极其平稳。",
        "streaming": "支持 Netflix、Disney+ 等 4K 原生解锁，高峰期无缓冲卡顿。",
        "devices": "自研客户端一键登录，同时支持通用订阅导入。",
        "pros": ["输入 tiziyun 享 8 折，基础档折后仅 20 元", "全线 IEPL 专线晚高峰稳健", "自研小白端与开源订阅兼备"],
        "cons": ["年付轻量档流量需核对是按年还是按月", "顶配大户包总价偏高"],
        "checkTips": "结算时输入 tiziyun 可享 8 折；适用套餐与有效期以结算页为准。"
    },
    {
        "id": "19",
        "slug": "lingdongyun",
        "name": "灵动云",
        "affUrl": "https://lingdongyun.lingdongaff.com/#/?code=ibHQOYGt",
        "promoCode": "ld88",
        "promoDesc": "灵动云专属优惠码 ld88",
        "minPrice": "20 元/月 · 100GB/月",
        "lineType": "全线 VLESS 现代协议",
        "tags": ["VLESS 全线协议", "港台日新美出口", "晚高峰 4K 顺畅", "节点覆盖广"],
        "summary": "全线采用较新的 VLESS 协议，覆盖香港、台湾、日本、新加坡和美国等常用地区；晚高峰观看 YouTube 4K 视频依然顺畅，适合看重节点覆盖与影音体验的用户。",
        "plans": [
            {"name": "拂风版 (100GB)", "price": "20 元/月 · 57 元/季 · 204 元/年", "traffic": "100GB/月", "period": "多周期可选"},
            {"name": "驭浪版 (300GB)", "price": "50 元/月 · 142.5 元/季 · 510 元/年", "traffic": "300GB/月", "period": "多周期可选"},
            {"name": "破晓版 (700GB)", "price": "100 元/月 · 285 元/季 · 1020 元/年", "traffic": "700GB/月", "period": "多周期可选"},
            {"name": "凌霄版 (1.5TB)", "price": "180 元/月 · 513 元/季 · 1836 元/年", "traffic": "1500GB/月", "period": "多周期可选"},
            {"name": "不限时流量包", "price": "199元/150G · 499元/400G · 899元/800G", "traffic": "各档不限时流量", "period": "买断不限时"}
        ],
        "suitableFor": ["喜爱 VLESS 协议抗干扰特性的进阶玩家", "常用港台日新美多节点切换者", "晚高峰追求 4K 顺畅影音体验者"],
        "unsuitableFor": ["客户端不支持 VLESS 协议的老旧设备", "寻找免费测试通道的用户"],
        "aiSupport": "全线主流节点良好适配 AI 对话交互，低丢包率保连通。",
        "streaming": "YouTube 4K 流畅拖拽，港台日流媒体资源适配佳。",
        "devices": "标准个人多端支持，提供标准 VLESS 订阅链接。",
        "pros": ["全线现代化 VLESS 协议配置", "主流热门出口覆盖齐全", "价格阶梯与优惠码 ld88 体系健全"],
        "cons": ["老旧客户端需升级支持 VLESS", "私人专线单月费用较高"],
        "checkTips": "结算时输入 ld88；实际折扣、适用套餐与有效期以结算页为准。"
    },
    {
        "id": "20",
        "slug": "yinxingren",
        "name": "隐形人",
        "affUrl": "https://yinxingren1.invisibleaff.com/#/?code=ISH1y2IF",
        "promoCode": "yxr888",
        "promoDesc": "新用户专享优惠码 yxr888",
        "minPrice": "24 元/月 · 144GB/月",
        "lineType": "新加坡纯专线 / VLESS",
        "tags": ["新加坡团队", "全线纯专线", "8K 极速加载", "随用随续灵活"],
        "summary": "由新加坡团队打造，采用全线纯专线与 VLESS 协议；强调 8K 视频快速加载，以及 AI 和流媒体原生解锁。套餐可随用随续，适合关注专线质量与续费灵活性的用户。",
        "plans": [
            {"name": "白银纪元", "price": "24 元/月", "traffic": "144GB/月", "period": "按月结算"},
            {"name": "黄金序列", "price": "48 元/月", "traffic": "360GB/月", "period": "按月结算"},
            {"name": "铂金至臻", "price": "105 元/月", "traffic": "750GB/月", "period": "按月结算"},
            {"name": "钻石穹顶", "price": "185 元/月", "traffic": "1600GB/月", "period": "按月结算"},
            {"name": "星耀风暴年付", "price": "109 元/年", "traffic": "80GB/年", "period": "年付预付"},
            {"name": "不限时流量包", "price": "229元/160G(限1台) · 549元/420G(限2台) · 1199元/1000G(限3台)", "traffic": "一次性流量", "period": "买断不限时"}
        ],
        "suitableFor": ["海外背景专线诉求者", "8K 超高码率发烧友与视频剪辑师", "重视套餐随用随续灵活度用户"],
        "unsuitableFor": ["需要在不限时包中无限挂载多设备者（有设备台数限制）", "低预算用户"],
        "aiSupport": "原生纯净 IP 解锁，完美支持 ChatGPT、Midjourney 与 Claude。",
        "streaming": "支持 8K/4K 超高清原生流媒体解锁，带宽吞吐极充裕。",
        "devices": "常规月付允许多端并发，不限时包明确标注 1-3 台设备限制。",
        "pros": ["海外团队运营专线背景深厚", "8K 加载实力与 VLESS 结合", "月付 144GB 配额大度"],
        "cons": ["不限时包对并发设备台数有较严限制", "年付小包为 80GB/年"],
        "checkTips": "新用户结算时输入 yxr888；实际折扣、适用套餐与有效期以结算页为准。"
    },
    {
        "id": "21",
        "slug": "flyv",
        "name": "FlyV（飞V）",
        "affUrl": "https://feiv289.flyvaff.com/#/?code=qQCT0BeY",
        "promoCode": "fly20",
        "promoDesc": "结算输入 fly20 享专属优惠",
        "minPrice": "25 元/月 · 150GB/月",
        "lineType": "全线专线 1x 计费",
        "tags": ["全线专线 1x", "不限速不限设备", "4K/8K 流畅", "AI 工具支持"],
        "summary": "采用全线专线架构，所有节点按 1× 流量计费；支持 4K/8K 流媒体以及 ChatGPT 等 AI 工具，并强调不限速、不限制设备数量，适合多设备和高码率影音场景。",
        "plans": [
            {"name": "年付版", "price": "96 元/年 (折合 8 元/月)", "traffic": "60GB/月", "period": "年付预付"},
            {"name": "Lite (月付)", "price": "25 元/月", "traffic": "150GB/月", "period": "按月结算"},
            {"name": "Plus (月付)", "price": "45 元/月", "traffic": "300GB/月", "period": "按月结算"},
            {"name": "Blaze (月付)", "price": "85 元/月", "traffic": "600GB/月", "period": "按月结算"},
            {"name": "Nova (月付)", "price": "150 元/月", "traffic": "1000GB/月", "period": "按月结算"},
            {"name": "不限时流量包", "price": "100 元", "traffic": "100GB (不限时)", "period": "一次性买断"}
        ],
        "suitableFor": ["厌恶节点偷跑倍率（全线 1x）的用户", "家庭与工作室不限设备并发场景", "高码率视频与 AI 高频使用者"],
        "unsuitableFor": ["只想月付花 5-10 元的人", "不愿了解订阅导入的用户"],
        "aiSupport": "全线专线高可靠，ChatGPT/Claude 畅快调用。",
        "streaming": "支持 4K/8K 流媒体原生解锁，多路并发播放顺畅。",
        "devices": "宣传不限设备数量与不限速，多端接入极度友好。",
        "pros": ["所有专线节点严格 1x 计费，无暗坑", "宣传不限速、不限设备并发数", "100 元一次性不限时包门槛较低"],
        "cons": ["需在结算页确认与 Firefly 的入口对应关系", "年付版需一次性支付 96 元"],
        "checkTips": "结算时输入 fly20；实际折扣、适用套餐与有效期以结算页为准。发布前在结算页确认服务细节。"
    },
    {
        "id": "22",
        "slug": "breezenet",
        "name": "微风网络（BreezeNet）",
        "affUrl": "https://edp01.breezenetaff.com/#/?code=vxDUI8kY",
        "promoCode": "wfwl88",
        "promoDesc": "微风网络专属优惠码",
        "minPrice": "25 元/月 · 200GB/月",
        "lineType": "轻量 IEPL 专线",
        "tags": ["轻量 IEPL", "低流量年付可选", "自研客户端", "第三方通用订阅"],
        "summary": "资料页将其定位为轻量 IEPL 专线方案，重点是低流量年付、自研客户端与第三方订阅导入。公开价格记录存在差异，更适合将它视为轻度使用候选，并先在结算页确认实际流量与付款周期。",
        "plans": [
            {"name": "用户确认入门档", "price": "25 元/月", "traffic": "200GB/月", "period": "按月结算"},
            {"name": "年付备选档位", "price": "以官方当前实时结算页为准", "traffic": "待核验", "period": "年付预付"}
        ],
        "suitableFor": ["希望获得 200GB 较大月流量月付方案者", "希望配合自研客户端简化操作者", "轻度至中度日常网络使用"],
        "unsuitableFor": ["对公开价格历史绝对敏感苛刻者", "追求数百节点大机场者"],
        "aiSupport": "支持主流 AI 工具日常访问，专线通道避免公网阻断。",
        "streaming": "满足日常 1080P/4K 流媒体播放。",
        "devices": "支持自研客户端与通用第三方订阅导入。",
        "pros": ["25 元给到 200GB 流量性价比较高", "IEPL 专线架构加持", "支持自研客户端方便操作"],
        "cons": ["公开资料关于年付存在历史版本差异", "需在结算页二次确认准确参数"],
        "checkTips": "发布前在邀请页确认当前最低档、流量重置方式、季付及以上优惠、设备数与客户端支持。"
    },
    {
        "id": "23",
        "slug": "wuyoulianjie",
        "name": "无忧链接",
        "affUrl": "https://wep01.worryfreeaff.com/#/?code=fOCJz3E2",
        "promoCode": "wylj88",
        "promoDesc": "无忧链接专属优惠码",
        "minPrice": "12.92 元/月 · 100GB/月",
        "lineType": "通用订阅 / 多协议兼容",
        "tags": ["12.92 元低价", "通用订阅支持", "覆盖到 1TB", "一次性包可选"],
        "summary": "亮点在于通用订阅与主流客户端兼容，套餐从低频年付小包延伸到 1TB 月流量，并另有一次性流量包。服务商还宣称流媒体和 AI 工具可用，但具体节点与使用时段仍应由购买者自行核验。",
        "plans": [
            {"name": "mini 链接 (年付)", "price": "79 元/年 (折合 6.58 元/月)", "traffic": "40GB/月", "period": "年付预付"},
            {"name": "舒心链接 (100GB)", "price": "12.92 元/月 · 34.68 元/季 · 123.76 元/年", "traffic": "100GB/月", "period": "多周期可选"},
            {"name": "省心链接 (200GB)", "price": "22.44 元/月 · 60.52 元/季 · 214.88 元/年", "traffic": "200GB/月", "period": "多周期可选"},
            {"name": "随心链接 (500GB)", "price": "52.36 元/月 · 140.76 元/季 · 502.52 元/年", "traffic": "500GB/月", "period": "多周期可选"},
            {"name": "忘忧链接 (1TB)", "price": "117 元/月 · 315 元/季 · 1123 元/年", "traffic": "1000GB/月", "period": "多周期可选"},
            {"name": "一次性流量包", "price": "16.15 元", "traffic": "100GB (不限时)", "period": "一次性买断"}
        ],
        "suitableFor": ["追求 13 元左右高性价比月付者", "偶尔应急需要 16 元买断 100GB 流量者", "从轻量到 1TB 跨度需求用户"],
        "unsuitableFor": ["追求极度严苛 SLA 保障的金融级用户", "无法自行配置客户端的新手"],
        "aiSupport": "宣传支持 ChatGPT 等 AI 工具，以本地实际节点分流为准。",
        "streaming": "支持主流海外流媒体区域观看，需结合节点列表倍率选择。",
        "devices": "标准通用订阅导入，兼容各大主流客户端。",
        "pros": ["月付 12.92 元门槛极亲民", "一次性 100GB 仅 16.15 元超低价", "定价精细，季付年付梯度清晰"],
        "cons": ["协议与节点晚高峰具体指标以实际为准", "多协议支持需客户端内核较新"],
        "checkTips": "协议、节点和晚高峰表现仍以实时页面与本地测试为准；一次性流量包有效期需核实。"
    },
    {
        "id": "24",
        "slug": "civet",
        "name": "灵猫网络（Civet）",
        "affUrl": "https://vip02.civetaff.com/#/?code=MLVZXxQj",
        "promoCode": "lmwl88",
        "promoDesc": "灵猫网络专属优惠码",
        "minPrice": "25 元/月 · 150GB/月",
        "lineType": "IPLC 专线宣称",
        "tags": ["IPLC 专线宣称", "1x 流量计费", "不限设备并发", "通用订阅支持"],
        "summary": "服务商资料主打 IPLC、1 倍流量、不限设备与通用订阅，覆盖从年付小包到月付 300GB 的阶梯。协议描述与流量重置规则存在公开信息冲突，文章中应将这些能力写为服务商宣称，而非实测结论。",
        "plans": [
            {"name": "年付小包", "price": "85 元/年", "traffic": "45GB (重置口径待确认)", "period": "年付预付"},
            {"name": "月付 Small", "price": "25 元/月", "traffic": "150GB/月", "period": "按月结算"},
            {"name": "月付 Big", "price": "45 元/月", "traffic": "300GB/月", "period": "按月结算"},
            {"name": "季付 Small / Big", "price": "65 元/季 (150GB) · 125 元/季 (300GB)", "traffic": "对应季付档位", "period": "按季结算"},
            {"name": "年付 Small / Big", "price": "195 元/年 (150GB) · 295 元/年 (300GB)", "traffic": "对应年付档位", "period": "年付预付"}
        ],
        "suitableFor": ["多设备无拘束连接需求者", "看重 1 倍率专线宣称的月付用户", "需要 150GB-300GB 中度月流量者"],
        "unsuitableFor": ["要求公开信息 100% 毫无分歧的严苛用户", "需要 TB 级大流量大户"],
        "aiSupport": "宣传支持主流 AI 访问，实际使用建议先月付核实。",
        "streaming": "支持主流海外流媒体播放，多节点切换备用。",
        "devices": "宣称不限设备并发连接，多端共用友好。",
        "pros": ["宣称全节点 1 倍率专线不缩水", "宣称不限并发设备数", "月付 25 元享有 150GB 配额充裕"],
        "cons": ["协议描述与截图存在公开信息冲突", "年付小包 45GB 流量重置口径未完全说明"],
        "checkTips": "页面宣传的协议与节点截图存在不一致；付款币种、订阅格式、流量重置、设备并发须在结算页确认。"
    },
    {
        "id": "25",
        "slug": "flashleap",
        "name": "闪跃（FlashLeap）",
        "affUrl": "https://vip02.flashleapaff.com/#/?code=bsjhVp9y",
        "promoCode": "sy88",
        "promoDesc": "闪跃专属优惠码",
        "minPrice": "24 元/月 · 150GB/月",
        "lineType": "IPLC 专线宣称",
        "tags": ["IPLC 专线宣称", "低延迟通用订阅", "定制客户端", "高峰影音"],
        "summary": "公开资料将其描述为 IPLC 专线与 1 倍流量方案，兼顾低延迟、通用订阅和定制客户端。流媒体、原生 IP 与 AI 工具支持均属于页面宣称，适合重视高峰表现但愿意先用月付验证的人。",
        "plans": [
            {"name": "闪跃年付版", "price": "96 元/年 (折合 8 元/月)", "traffic": "60GB/月", "period": "年付预付"},
            {"name": "闪动 Flicker", "price": "24 元/月", "traffic": "150GB/月", "period": "按月结算"},
            {"name": "飞跃 Leap", "price": "44 元/月", "traffic": "300GB/月", "period": "按月结算"},
            {"name": "瞬移 Teleport", "price": "84 元/月", "traffic": "600GB/月", "period": "按月结算"},
            {"name": "跃迁 Warp", "price": "134 元/月", "traffic": "1000GB/月", "period": "按月结算"}
        ],
        "suitableFor": ["看重 IPLC 低延迟与 1 倍计费宣称者", "兼顾定制客户端与通用订阅导入者", "愿意先用月付 24 元验证服务品质的用户"],
        "unsuitableFor": ["盲目全额买年付不愿验证者", "极端免费测试寻找者"],
        "aiSupport": "宣传支持 ChatGPT 等 AI 工具，适合配合月付体验测试。",
        "streaming": "支持 4K 流媒体播放宣称，节点覆盖主要出口。",
        "devices": "定制客户端与通用订阅均支持，个人多端使用。",
        "pros": ["阶梯命名趣味且逻辑清晰", "月付 24 元给到 150GB 很有吸引力", "年付折算仅 8 元/月"],
        "cons": ["各项专线与原生宣称需实测验证", "价格数据源于公开资料非独立抓包"],
        "checkTips": "下单前核对当前折扣、设备数、流量周期与第三方客户端导入方式。"
    },
    {
        "id": "26",
        "slug": "firefly",
        "name": "Firefly",
        "affUrl": "https://vip02.fireflyaff.com/#/?code=lBPETX1d",
        "promoCode": "ff88",
        "promoDesc": "Firefly 专属优惠码",
        "minPrice": "25 元/月 · 150GB/月",
        "lineType": "IPLC + VLESS 架构",
        "tags": ["IPLC 架构", "VLESS 协议", "不限设备宣称", "独立套餐入口"],
        "summary": "服务商定位偏向 IPLC 与 VLESS，并宣传原生 IP、不限设备和企业定制。它与 FlyV 条目是不同的用户提供入口；套餐数据按 Firefly 独立资料页整理，流媒体与 AI 服务可用性不应写成独立验证。",
        "plans": [
            {"name": "年付版", "price": "96 元/年 (折合 8 元/月)", "traffic": "60GB/月", "period": "年付预付"},
            {"name": "Lite (月付)", "price": "25 元/月", "traffic": "150GB/月", "period": "按月结算"},
            {"name": "Plus (月付)", "price": "45 元/月", "traffic": "300GB/月", "period": "按月结算"},
            {"name": "Blaze (月付)", "price": "85 元/月", "traffic": "600GB/月", "period": "按月结算"},
            {"name": "Nova (月付)", "price": "150 元/月", "traffic": "1000GB/月", "period": "按月结算"},
            {"name": "一次性不限时", "price": "100 元", "traffic": "100GB (不限时)", "period": "一次性买断"}
        ],
        "suitableFor": ["对 IPLC + VLESS 组合有特定偏好者", "需要独立后台管理入口的用户", "多设备并发与不限时小包需求者"],
        "unsuitableFor": ["不想与客服沟通订阅链接格式的用户", "追求极致零成本体验者"],
        "aiSupport": "宣传兼容主流 AI 工具，不应写成长期稳定承诺。",
        "streaming": "支持主流海外流媒体区域观看，需关注节点连通性。",
        "devices": "宣传不限设备并发数量，通用客户端订阅适配。",
        "pros": ["独立控制台与专线架构宣称", "100 元一次性不限时包门槛友好", "不限设备并发宣称"],
        "cons": ["通用订阅可能需客服确认格式", "流媒体与 AI 可用性未做独立背书"],
        "checkTips": "购买前确认所需客户端、设备并发和公平使用条款；一次性包有效期以结算页为准。"
    },
    {
        "id": "27",
        "slug": "kuajieyun",
        "name": "跨界云",
        "affUrl": "https://vip02.kuajieaff.com/#/?code=Qu0GQkhP",
        "promoCode": "kjy88",
        "promoDesc": "跨界云专属优惠码",
        "minPrice": "20 元/月 · 120GB",
        "lineType": "全网专线升级宣称",
        "tags": ["专线升级宣称", "通用订阅支持", "120G-1500G 四档", "按需选购"],
        "summary": "核心信息是服务商所称的全网专线升级与通用订阅支持，套餐提供 120GB 至 1500GB 的四档流量选择。线路类型、流量重置与一次性套餐细则未被独立验证，更适合先从月付小档测试。",
        "plans": [
            {"name": "轻云 Lite", "price": "20 元/月 · 54 元/季 · 192 元/年", "traffic": "120GB (口径待确认)", "period": "多周期可选"},
            {"name": "跃云 Leap", "price": "40 元/月 · 108 元/季 · 384 元/年", "traffic": "300GB (口径待确认)", "period": "多周期可选"},
            {"name": "凌云 Soar", "price": "100 元/月 · 270 元/季 · 960 元/年", "traffic": "700GB (口径待确认)", "period": "多周期可选"},
            {"name": "无界 Infinity", "price": "180 元/月 · 486 元/季 · 1728 元/年", "traffic": "1500GB (口径待确认)", "period": "多周期可选"}
        ],
        "suitableFor": ["需要 120GB 起步通用月付梯子的用户", "喜欢季付有轻度优惠（54元）的人群", "轻度到中度海外社交与影音"],
        "unsuitableFor": ["要求每一项线路物理机房公开透明的用户", "未测试就盲目直接上年付者"],
        "aiSupport": "宣传支持常规 AI 访问，建议以月付实测为准。",
        "streaming": "支持常见流媒体访问，提供多节点备份。",
        "devices": "通用订阅导入，适配多操作系统客户端。",
        "pros": ["阶梯完整覆盖 120GB 到 1500GB", "季付 54 元门槛适中", "通用订阅适配广泛"],
        "cons": ["线路类型与流量重置口径待结算页核实", "一次性方案细节未公开列明"],
        "checkTips": "结算前应确认流量周期、设备并发、退款与当前专线规则。"
    },
    {
        "id": "28",
        "slug": "dalaoyun",
        "name": "大佬云",
        "affUrl": "https://adcua9104.dalaoyunaff.com/#/?code=J6GqQqk8",
        "promoCode": "dly88",
        "promoDesc": "大佬云专属优惠码",
        "minPrice": "20 元/月 · 120GB",
        "lineType": "通用专线多档阶梯",
        "tags": ["轻云跃云凌云", "多档流量选择", "月季年付灵活", "通用订阅支持"],
        "summary": "提供轻云、跃云、凌云、无界四档清晰阶梯，价格与跨界云具有相似结构，支持月付、季付与年付灵活订阅。流量重置口径与退款细则建议在下单结算时复核。",
        "plans": [
            {"name": "轻云 Lite", "price": "20 元/月 · 54 元/季 · 192 元/年", "traffic": "120GB (口径待确认)", "period": "多周期可选"},
            {"name": "跃云 Leap", "price": "40 元/月 · 108 元/季 · 384 元/年", "traffic": "300GB (口径待确认)", "period": "多周期可选"},
            {"name": "凌云 Soar", "price": "100 元/月 · 270 元/季 · 960 元/年", "traffic": "700GB (口径待确认)", "period": "多周期可选"},
            {"name": "无界 Infinity", "price": "180 元/月 · 486 元/季 · 1728 元/年", "traffic": "1500GB (口径待确认)", "period": "多周期可选"}
        ],
        "suitableFor": ["日常轻度至中度翻阅资料与影音", "喜欢 20 元月付低试错成本的用户", "需要大容量 1500GB 档位备选者"],
        "unsuitableFor": ["极度挑剔必须独立机房认证的用户", "只寻找免费服务者"],
        "aiSupport": "支持主流海外 AI 工具访问，以实际节点连接状态为准。",
        "streaming": "覆盖主流视频平台，提供基础节点解锁支持。",
        "devices": "标准通用订阅导入，兼容各大主流客户端。",
        "pros": ["阶梯价格透明公道（20元起）", "季付 54 元折算合理", "起步 120GB 日常完全够用"],
        "cons": ["流量重置口径需在结算后台二次确认", "暂未列明具体专线类型细节"],
        "checkTips": "购买前请核对结算页面当前可用节点列表、流量重置机制以及客服支持渠道。"
    }
]

with open('src/data/airports.json', 'w', encoding='utf-8') as f:
    json.dump(airports, f, ensure_ascii=False, indent=2)

print(f"Airports data written: {len(airports)} items")

# 2. 100 FAQs Data
faqs = []
for idx, (kw, q, a) in enumerate(faq_builder.raw_faqs, 1):
    faqs.append({
        "id": idx,
        "keyword": kw,
        "question": q,
        "answer": a,
        "category": "ladder-recommend-2026" if idx <= 25 else (
                    "stable-ladder" if idx <= 50 else (
                    "airport-ladder" if idx <= 75 else "ladder-vpn"))
    })

with open('src/data/faqs.json', 'w', encoding='utf-8') as f:
    json.dump(faqs, f, ensure_ascii=False, indent=2)

print(f"FAQs data written: {len(faqs)} items")

# 3. 60 Articles Data (Structured by category)
# Categories:
# ladder-recommend-2026: 14 articles
# stable-ladder: 14 articles
# airport-ladder: 14 articles
# ladder-vpn: 12 articles
# service: 6 articles

articles = []

# Category 1: 梯子推荐2026 (14 articles)
cat1_articles = [
    ("梯子推荐2026怎么看？从套餐、流量和服务规则开始", "ladder-recommend-2026-how-to-choose",
     "2026年挑选梯子推荐时，如何从套餐架构、月度流量重置和服务规则三大核心维度快速避坑选型。"),
    ("梯子推荐2026套餐怎么比较？单价与有效可用流量核对", "ladder-recommend-2026-plan-comparison",
     "对比不同梯子推荐套餐时，不能仅看标称总流量，必须深入核对计费倍率、高峰限速与差价升档机制。"),
    ("梯子推荐2026购买前确认什么？售后条款与月付试错清单", "ladder-recommend-2026-pre-purchase-checklist",
     "下单购买2026年梯子推荐方案前，必须逐项核查的6项硬指标：退款条款、工单响应、支付安全与月付策略。"),
    ("梯子推荐2026流量规则怎么核对？峰谷倍率与加油包区别", "ladder-recommend-2026-traffic-rules",
     "全面解读梯子推荐中的流量倍率陷阱：为什么标称 200GB 实际只够看几天？教你算清真实数据消耗成本。"),
    ("梯子推荐2026价格梯度怎么看？10至30元月付合理区间分析", "ladder-recommend-2026-price-tiers",
     "梳理2026年主流梯子推荐的市场价位模型：为什么过低月费往往伴随跑路风险？合理带宽成本如何计算。"),
    ("梯子推荐2026月付与年付怎么选？控制不可抗力风险决策", "ladder-recommend-2026-monthly-vs-yearly",
     "面对极具诱惑的年付折扣，为什么行业资深用户始终坚守小额月付？教你评估服务商稳定性与资金安全。"),
    ("梯子推荐2026服务规则注意事项？审计策略与多端封禁红线", "ladder-recommend-2026-service-rules",
     "深入剖析各大梯子推荐平台的用户服务协议（TOS）：哪些行为会导致立即封号不退款？安全使用边界在哪里。"),
    ("梯子推荐2026节点资料如何核验？落地机房与原生出口鉴别", "ladder-recommend-2026-node-verification",
     "如何核实梯子推荐服务商公开的节点资料真伪？教你结合延迟测试、IP 纯净度与晚高峰抗丢包表现做客观评估。"),
    ("梯子推荐2026维护记录从哪查？官方公告与故障恢复时效", "ladder-recommend-2026-maintenance-records",
     "零维护通告的服务商可靠吗？如何通过历史线路割接通知、官方频道与工单响应判断团队的真实技术运维实力。"),
    ("梯子推荐2026退款条款怎么确认？虚拟数字商品维权边界", "ladder-recommend-2026-refund-policy",
     "网络代理服务的退款规则通常有哪些苛刻限制？购买前如何核实无理由退款时效、手续费扣除标准及申诉通道。"),
    ("梯子推荐2026适合人群分类标准？轻度学术与重度影音精准匹配", "ladder-recommend-2026-target-audience",
     "从文科文献查阅、外贸跨国协同到 4K 流媒体发烧友，2026年不同用户群体应当如何精准匹配梯子推荐梯度。"),
    ("梯子推荐2026轻量套餐怎么评估？低月费低频使用场景选型", "ladder-recommend-2026-lightweight-plans",
     "月预算 10-15 元能买到靠谱的梯子吗？轻量套餐的流量限制、峰值带宽与适用日常工作场景深度剖析。"),
    ("梯子推荐2026大流量套餐对比？500GB以上滥用限速与共享池", "ladder-recommend-2026-heavy-traffic-plans",
     "针对每月消耗超过 500GB 的大流量重度用户，如何避开公平使用原则限速陷阱，挑选真高带宽方案。"),
    ("梯子推荐2026防踩坑核查清单？年度选型决策与关键自查表", "ladder-recommend-2026-pitfall-checklist",
     "拒绝营销噱头！2026年度梯子推荐最终防踩坑总核查清单，帮你用严谨的数据与事实做出最理性的购买决策。")
]

for title, slug, desc in cat1_articles:
    articles.append({
        "category": "ladder-recommend-2026",
        "categoryName": "梯子推荐2026",
        "slug": slug,
        "title": title,
        "description": desc,
        "date": "2026-10-12",
        "suitableFor": ["关注 2026 年度梯子推荐的中文读者", "希望通过数据横评挑选主力订阅的用户", "需要核查套餐真实流量与规则的新老用户"],
        "keyTakeaway": "坚持小额月付检验、核对节点真实倍率与维护公告、严禁盲信全网最低价与虚假绝对可用保证。",
        "checklist": ["确认当前结算页支持按月付款", "确认常用节点倍率为 1x 且无高峰限速", "确认官方公告频道近一个月有正常运维更新", "收藏 /airport-recommend/ 核心对比中心以备随时复核"]
    })

# Category 2: 稳定梯子 (14 articles)
cat2_articles = [
    ("稳定梯子推荐看什么？先核对维护信息和公开资料", "stable-ladder-maintenance-and-records",
     "寻找稳定梯子时，为什么运维透明度比宣传测速更重要？教你从故障通报与节点状态看清服务商运维底色。"),
    ("稳定梯子线路冗余怎么判断？多入口BGP与故障热备架构", "stable-ladder-redundancy-architecture",
     "什么是真正的线路高可用？深入剖析电信联通移动三网 BGP 边缘入口与境外多落地出口的热备容灾逻辑。"),
    ("稳定梯子晚高峰抗拥堵资料？骨干网QoS与专线冗余带宽", "stable-ladder-peak-hour-performance",
     "每晚 20 点至 23 点国际骨干网拥挤时，稳定梯子究竟靠什么保持不卡顿？深度解读独享专线与抗 QoS 技术。"),
    ("稳定梯子工单支持与售后范围？技术边界与服务响应时效", "stable-ladder-ticket-support-boundaries",
     "服务商的售后支持到底管哪些？明确线路故障与本地系统配置的责任边界，提升工单沟通效率与维权保障。"),
    ("稳定梯子价格与成本合理区间？带宽硬成本与低价跑路逻辑", "stable-ladder-reasonable-pricing",
     "国际专线与优质机房的真实带宽成本是多少？为什么月费低于 10 元的大流量平台具有极高的失联跑路风险。"),
    ("稳定梯子流量重置周期说明？自然月与账单日计算区别", "stable-ladder-traffic-reset-cycle",
     "月底突然断网怎么回事？弄清自然月 1 日重置与购买日重置的机制差异，合理安排月度流量消耗与加油包购买。"),
    ("稳定梯子并发连接数限制查询？个人多端与防滥用风控机制", "stable-ladder-concurrency-limits",
     "为什么同时连接多台设备会被踢下线？深入了解稳定梯子对在线 IP 数与连接数的限制规则，保障多端平稳。"),
    ("稳定梯子中转优化架构说明？国内BGP边缘接入原理剖析", "stable-ladder-relay-architecture",
     "中转服务器是如何改善跨国网络质量的？国内优质入口如何消除运营商互联互通瓶颈与公网丢包抖动。"),
    ("稳定梯子专线接入资料辨别？IPLC与IEPL内网传输真相", "stable-ladder-iplc-iepl-verification",
     "市面上宣称的 IPLC 与 IEPL 专线有何技术区别？如何通过延迟抖动和路由追踪辨别是真专线还是普通公网。"),
    ("稳定梯子非绝对可用原则理解？面对物理波动树立理性预期", "stable-ladder-no-absolute-guarantee",
     "海缆切断、极端天气与运营商割接客观存在。为什么诚信的服务商绝不承诺永不掉线？如何看待 SLA 可用性。"),
    ("稳定梯子掉线维护公告怎么查？突发故障标准排查与处置流程", "stable-ladder-outage-announcement-guide",
     "遇到连接中断时切忌盲目重装软件！教你标准三步法排查故障，第一时间通过官方公告获取恢复进展与备用节点。"),
    ("稳定梯子备用线路规划建议？主备双梯制保障核心业务连续", "stable-ladder-backup-strategy",
     "对于外贸、学术与跨境核心工作者，如何以最低持有成本配置主备双梯？科学分散单点故障风险的实战策略。"),
    ("稳定梯子日常办公场景核查？会议会议系统与文档低延迟", "stable-ladder-office-scenarios",
     "Google Workspace、Slack、Zoom 跨国协同办公对梯子稳定性有何苛刻要求？选型低抖动长连接专线的关键指南。"),
    ("稳定梯子资料核对日期重要性？动态网络环境下时效性价值", "stable-ladder-verification-date-importance",
     "半年前的梯子推荐测评为何在当下完全不适用？认准标有真实核验日期与更新日志的文档，避免依据过时信息踩坑。")
]

for title, slug, desc in cat2_articles:
    articles.append({
        "category": "stable-ladder",
        "categoryName": "稳定梯子",
        "slug": slug,
        "title": title,
        "description": desc,
        "date": "2026-10-12",
        "suitableFor": ["注重长期连接稳定性与低抖动的用户", "跨境远程办公与学术研究依赖者", "希望了解底层专线架构与运维逻辑的读者"],
        "keyTakeaway": "稳定性取决于真实的线路冗余与持续主动运维，拒绝夸大承诺，建立主备容灾意识。",
        "checklist": ["检查服务商是否有固定公开的维护状态页面", "核对高峰期延迟抖动在合理区间（低于 20ms 波动）", "备有一条不同机房架构的备用月付方案", "在 /airport-recommend/ 查看稳定型推荐归档"]
    })

# Category 3: 机场梯子 (14 articles)
cat3_articles = [
    ("机场梯子推荐怎么选？从节点覆盖与倍率计费科学对比", "airport-ladder-how-to-choose",
     "面对市面上琳琅满目的机场梯子，如何根据自身预算、主力出口国家与真实网络消耗进行科学横向筛选。"),
    ("机场梯子服务规则怎么核对？订阅格式与防封使用边界", "airport-ladder-terms-and-rules",
     "购买机场梯子前必看：服务商允许哪些协议？是否限制异地同时登录？如何避免触发系统防倒卖风控保护。"),
    ("机场梯子订阅说明怎么读？通用配置与更新机制深度解析", "airport-ladder-subscription-guide",
     "看懂机场后台的订阅说明：节点更新频率、流量清零规则与订阅防盗刷机制，确保设备跨平台无缝同步。"),
    ("机场梯子流量计费倍率怎么看？1倍率与高倍率节点成本测算", "airport-ladder-traffic-multiplier",
     "为什么有些节点看视频流量消耗飞快？详解 0.1x 观影节点、1x 标准节点与 3x 游戏专线的计费差异与搭配使用。"),
    ("机场梯子节点地区覆盖清单？港日新美热门与冷门出口权衡", "airport-ladder-node-coverage-list",
     "不仅看节点数量，更要看出口分布！亚洲低延迟与欧美原生 IP 的合理搭配，满足 95% 日常跨国访问需求。"),
    ("机场梯子入门套餐性价比比较？15元档位百G流量横向横评", "airport-ladder-budget-plan-comparison",
     "对标市场主流 15 元月付档位：如何计算每 GB 流量单价？专线与中转在入门档位下的真实可用性横评对比。"),
    ("机场梯子IPLC专线资料说明？点对点内网传输优势全解析", "airport-ladder-iplc-deep-dive",
     "彻底搞懂机场宣传的 IPLC 专线：为什么不过 GFW？为什么延迟始终平稳？哪些场景真正需要纯 IPLC 支撑。"),
    ("机场梯子BGP中转节点理解？三网智能分流就近接入技术", "airport-ladder-bgp-relay-nodes",
     "电信联通移动三网用户为什么延迟各不相同？BGP 多线入口如何自动选择最佳路由，消除跨运营商卡顿。"),
    ("机场梯子原生IP与解锁说明？流媒体与AI识别机制探究", "airport-ladder-native-ip-unlocking",
     "机房 IP 与住宅原生 IP 有何本质区别？流媒体平台和 ChatGPT 是如何识别代理服务器的，如何挑选高解锁率机场。"),
    ("机场梯子重置包与加油包规则？套餐耗尽后临时续命方案", "airport-ladder-traffic-reset-packs",
     "当月套餐流量提前用光怎么办？全面了解各大机场的流量重置包与加油包购买规则、生效时限与单价性价比。"),
    ("机场梯子团队与多用户并发规则？防倒卖风控与企业合规", "airport-ladder-team-concurrency-rules",
     "多人共用同一订阅为什么容易被封？小型工作室与团队如何合规选购支持高并发连接或团队定制的机场方案。"),
    ("机场梯子节点测速误差原因？单次跑分不代表长期稳定性", "airport-ladder-speedtest-fallacies",
     "为什么群里发的满带宽测速图不可全信？揭秘单次 Speedtest 测速与日常晚高峰连续连接体验之间的巨大偏差。"),
    ("机场梯子跑路风险与月付建议？资金沉没防范与信誉评估", "airport-ladder-avoiding-scams-and-monthly-pay",
     "行业沉浮，为什么老玩家始终坚持月付？如何识别即将跑路的小作坊机场，构建安全的资金防火墙。"),
    ("机场梯子官网入口与防假冒？正规资料库防钓鱼安全指南", "airport-ladder-official-portal-safety",
     "搜索引擎中充斥假冒机场与钓鱼推广！教你如何通过权威资料库识别真实官网入口，守护账号与支付安全。")
]

for title, slug, desc in cat3_articles:
    articles.append({
        "category": "airport-ladder",
        "categoryName": "机场梯子",
        "slug": slug,
        "title": title,
        "description": desc,
        "date": "2026-10-12",
        "suitableFor": ["关注机场梯子选型与节点倍率规则的用户", "需要弄清通用订阅与流媒体解锁的读者", "希望规避跑路风险与钓鱼入口的使用者"],
        "keyTakeaway": "认准 1 倍率主力节点，厘清通用订阅生态，防范钓鱼入口并坚守月付原则。",
        "checklist": ["核查节点列表中是否存在超高隐形倍率", "确认所用工具兼容机场提供的标准订阅格式", "通过权威聚合库确认服务商官方真实入口", "定期在 /airport-recommend/ 查阅最新机场测评"]
    })

# Category 4: 梯子 VPN (12 articles)
cat4_articles = [
    ("梯子vpn资料怎么看？中转分流与全局加密架构差异辨析", "ladder-vpn-architecture-and-data-guide",
     "梯子 VPN 与中转机场在网络拓扑上有何根本区别？全局强加密与国内 BGP 中转在延迟、速度和隐私上的权衡。"),
    ("梯子vpn流量规则怎么理解？定量配额与不限流量公平准则", "ladder-vpn-traffic-rules-fair-use",
     "宣称不限流量的 VPN 真的能无限用吗？深入剖析公平使用原则（FUP）限速机制，为什么定量套餐往往带宽更有保证。"),
    ("梯子vpn购买前核实要点？支持平台、退款期与支付途径", "ladder-vpn-pre-purchase-essentials",
     "下单选购梯子 VPN 前不可遗漏的 5 大核实点：全平台客户端适配、无理由退款时限及免敏感信息的支付方式。"),
    ("梯子vpn协议特征与中转区别？WireGuard与现代混淆协议", "ladder-vpn-protocol-features",
     "通用 VPN 协议在公网环境下特征明显吗？为什么现代机场更青睐 VLESS/Reality 等伪装抗主动探测技术。"),
    ("梯子vpn隐私保护政策核对？无日志承诺与司法管辖权", "ladder-vpn-privacy-and-no-logs",
     "服务商真的不留存访问日志吗？如何核查服务条款中的连接时间戳记录、源 IP 留存声明与离岸运营主体背景。"),
    ("梯子vpn节点稳定性评估依据？丢包率与长连接抗波动模型", "ladder-vpn-stability-evaluation-metrics",
     "如何科学评估 VPN 节点的可用性？摆脱单次测速误区，结合晚高峰丢包率中位数与多日连续连接稳定性建立评估模型。"),
    ("梯子vpn客服支持与工单范围？售前咨询与售后技术响应", "ladder-vpn-customer-support-boundaries",
     "遇到无法连接时客服能帮上忙吗？售后支持范围解析：如何区分节点服务器故障与本地客户端配置错误。"),
    ("梯子vpn套餐阶梯与适合人群？从轻度查阅到重度创作者", "ladder-vpn-plans-and-audiences",
     "不同预算与需求梯队如何匹配梯子 VPN？文字查阅、日常追剧与视频创作者的套餐梯度精准对标与选型指南。"),
    ("梯子vpn跨境业务连接需求？独立出口IP与电商防关联策略", "ladder-vpn-cross-border-business-demands",
     "亚马逊、TikTok 与外贸社媒运营对梯子 VPN 有哪些严苛要求？为什么必须避免频繁变动动态机房 IP。"),
    ("梯子vpnAI工具访问节点要求？纯净度与住宅IP降低风控", "ladder-vpn-ai-tools-access-requirements",
     "频繁弹出人机验证甚至封号？探究 OpenAI 等 AI 平台的风控机制，如何挑选高纯净度出口节点顺畅使用。"),
    ("梯子vpn流媒体服务匹配情况？主流海外视频库解锁与缓冲", "ladder-vpn-streaming-compatibility",
     "看 Netflix 提示使用代理？深度解析流媒体版权方与服务商之间的 IP 攻防，如何保持稳定的 4K 观影体验。"),
    ("梯子vpn常见误区与避坑指南？破除价格越高越好的迷信", "ladder-vpn-common-myths-and-pitfalls",
     "买梯子最容易踩的 3 大坑：盲目相信越贵越稳、盲目相信节点越多越好、轻信永久不限时年付。教你理性避坑。")
]

for title, slug, desc in cat3_articles:
    pass

for title, slug, desc in cat4_articles:
    articles.append({
        "category": "ladder-vpn",
        "categoryName": "梯子 VPN",
        "slug": slug,
        "title": title,
        "description": desc,
        "date": "2026-10-12",
        "suitableFor": ["关注梯子 VPN 隐私机制与网络拓扑的用户", "从事跨境电商与海外社媒运营的从业者", "经常使用 ChatGPT 与流媒体需要纯净 IP 的读者"],
        "keyTakeaway": "根据实际业务权衡延迟与加密等级，业务运营优选纯净出口，日常影音首选低抖动专线。",
        "checklist": ["确认节点出口 IP 纯净度无滥用黑名单记录", "检查服务商隐私条款中对访问日志的处理承诺", "确认支付方式安全，避免开启不必要的自动扣款", "结合 /airport-recommend/ 挑选已核验的专用节点方案"]
    })

# Category 5: 服务资料 (6 articles)
cat5_articles = [
    ("梯子服务资料怎么看？文档更新时效与数据核对基准", "service-documentation-verification-standards",
     "如何阅读和使用梯子玩资料库的服务资料？了解我们的数据采集标准、更新时间戳机制与第三方独立核验边界。"),
    ("梯子订阅说明怎么读？通用订阅转换与格式兼容指引", "service-subscription-conversion-and-formats",
     "通用订阅链接包含哪些参数？Base64、Clash YAML 与 V2Ray 格式差异解析，保障多设备导入零失误。"),
    ("梯子维护信息公开标准？故障通告、线路割接与可用性指标", "service-maintenance-disclosure-guidelines",
     "正规服务商应当如何公开维护信息？线路割接预告标准、临时备用入口提供机制与历史 SLA 可用性透明度。"),
    ("梯子购买前核对清单？6项核心条款与支付前最后确认", "service-pre-purchase-six-step-checklist",
     "付款前花 2 分钟对照自查：月付周期、退款条款、流量重置日、设备并发、优惠码减免与官方联系渠道。"),
    ("梯子退款与支持边界说明？虚拟数字资产维权常识普及", "service-refund-boundaries-and-consumer-rights",
     "客观认识网络代理服务的售后与退款边界：服务商责任与用户自身网络环境责任划分，合规合法维护权益。"),
    ("梯子玩资料库编辑部原则？透明评测、商业披露与免责声明", "service-editorial-principles-and-disclosures",
     "梯子玩资料库的立站初心：恪守客观中立原则，全面披露赞助返利关系，拒绝虚假绝对保证，为读者提供真实资料。")
]

for title, slug, desc in cat5_articles:
    articles.append({
        "category": "service",
        "categoryName": "服务资料",
        "slug": slug,
        "title": title,
        "description": desc,
        "date": "2026-10-12",
        "suitableFor": ["需要了解梯子玩资料库评测标准与服务边界的读者", "希望掌握通用订阅与购买前自查核对的用户", "注重平台中立性与商业透明度的受众"],
        "keyTakeaway": "以客观数据与真实协议为准绳，严守安全合规底线，知晓售后支持边界与透明披露。",
        "checklist": ["认真查阅每篇资料的最新核对日期", "下单前严格执行 6 步购买前核对法则", "认准官方认证的通用订阅地址", "遇有疑问可随时通过 /faq/ 检索 100 组独立问答"]
    })

with open('src/data/articles.json', 'w', encoding='utf-8') as f:
    json.dump(articles, f, ensure_ascii=False, indent=2)

print(f"Articles data written: {len(articles)} items across 5 categories")
