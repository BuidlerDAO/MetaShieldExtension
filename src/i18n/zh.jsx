/* eslint-disable camelcase */
const translation_zh = {
    popup: {
        switch_language: '切换语言',
        slogan_part1: '识别钓鱼网站',
        slogan_part2: '保护加密资产',
        start_protection: '开启保护',
        agree_policy_part1: '点击上方按钮即表示您同意',
        agree_policy_part2_private_policy: '隐私协议',
        agree_policy_part3_and: '与',
        agree_policy_part4_disclaimer: '使用条款',
        footer_buidlerDAO: '@BuidlerDAO',
        how_dose_metashield_work: 'MetaShield 如何工作',
        metashield_explanation_part1: '钓鱼网站通常会伪装成知名NFT网站，诱导您点击某些按钮如 mint 等。实际上会诱导您使用 approve 或 send 方法将授权或转移您的资产。',
        metashield_explanation_part2: 'MetaShield 可以有效识别 approve 和 send 交易，并通过黑白名单的方式以及检查被授权地址的状态，帮助您进行预警和拦截钓鱼网站。',
        report_phishing_website: '报告钓鱼网站'
    },

    footer: {
        detail: '版权所有 @ React'
    },
    home: {
        hot_recommended: '爆款推荐',
        new_arrival: '新品上市',
        joint_venture: '合作企业'
    },
    drawer: {
        warning: '警告：未收录该页面，请谨慎操作',
        success: '成功',
        error: '危险：当前页面被标记为黑名单，已为您拦截本次交易',
        completed_scan: '交易可信任，此网址处于 MetaShield 白名单',
        completed_scan_error: 'MetaShield 扫描失败',
        you_are_authorizing: '您正试图将资产授权给地址',
        you_are_trying_to: '您正试图将',
        to_address: '给地址',
        assets: '资产',
        transfer_explanation: '本次交易会要求您将 ETH 发送给某个地址，这是一种高危行为，如果您正在进行 mint 等非发送行为，说明该网站存在欺诈行为。',
        transfer: '发送',
        authorize: '授权',
        authorize_explanation: '本次交易会要求您将资产授权给某个地址，授权后对方可以转移你的资产，这是一种高危行为，如果您正在进行 mint 等非授权行为，说明该网站存在欺诈行为。',
        contract_not_verified: '经检测该合约未完成验证与开源',
        contract_verified: '经检测该合约已完成验证与开源',
        contract_unknown: '未检测到该地址的验证与开源状态',
        report_button: '报告异常',
        still_continue: '仍要继续',
        ok: '好的',
        i_got_it: '我知道了',
        cancel_authorization: '取消授权',
        continue_authorization: '仍要授权',
        website_unknown: '本网站或合约地址不存在于 MetaShield 白名单中',
        website_on_blacklist: '本网站或合约地址已被标记为 MetaShield 黑名单',
        please_authorize_carefully: '请谨慎授权',
        high_risk_transaction: '高危交易风险',
        transfer_remind: '对方有可能转移您的资产，请谨慎授权！',
        continue_auth_remind: '仍然授权将会有极大的风险，请谨慎操作！',
        auto_block: '系统已自动为您拦截此次交易',
        eth_sign: '转移资产，通过废弃的不安全接口盲签: eth_sign'
    },
    comma: '，',
    colon: '：',
    dot: '。',
    exclamation_mark: '！'
};

export default translation_zh;
