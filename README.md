![image](https://user-images.githubusercontent.com/34613360/173281927-208ab47c-d249-42b9-a2f8-8553d8ff9d64.png)
# MetaShield
Metashield 是由 BuidlerDAO 孵化的第一个项目，我们发现大量用户的加密资产遭受到了钓鱼网站的威胁，在全球范围内，每年有价值数亿美金的加密资产被钓鱼网站偷走，包括大量的 BAYC, Moonbird 等。经过成员提案，我们开发了插件 MetaShield ，可以有效预警并拦截钓鱼网站的盗窃行为，在 Web3.0 黑暗森林中保护用户资产安全。

## 技术原理
### 钓鱼网站原理？
钓鱼网站通常会伪装成知名 NFT 网站，诱导您点击某些按钮如 mint 等。实际上会诱导您使用 approve 方法将资产授权给某个地址，从而该地址可以转移走你的 NFT。或者诱导你使用 send 方法直接将资产发送给某个地址
### 插件如何保护？
MetaShield 可以有效识别 approve 和 send 交易，及时准确的告诉您点击的后果，告知您将加密资产授权或发送给哪个地址，并通过黑白名单的方式检查它的安全状态，以触发必要的预警和拦截。

我们收录了现有许多钓鱼网站到黑名单，我们发现大多数钓鱼网站基本是一把梭哈，钓完就跑路，因此在本项目中采取了如下设计：
* 黑名单：强制拦截提醒，定期检查是否有黑名单中网站再次上线
* 白名单：提示正处于官网，交易安全
* 未收录黑白名单：提示交易存在一定风险，并在能拿到数据的情况下告知用户该地址合约是否经过开源


## 参与贡献
* 提交 [白名单](https://github.com/DAOBuidler/MetaShieldExtension/blob/main/function/data/domain_whitelist.json) 或 [黑名单](https://github.com/DAOBuidler/MetaShieldExtension/blob/main/function/data/domain_blacklist.json) PR
* [提交 bug 或建议](https://github.com/DAOBuidler/MetaShieldExtension/issues/new)

## 关于 BuidlerDAO
BuidlerDAO 由孵化、技术、投研、教育和运营五大公会组成。我们坚信区块链技术的底层创新，对组织结构、创作者经济、乃至生产关系都会带来长期的、革命性的影响。我们欢迎长期主义者和实干家，快速迭代、勇于尝试。[加入我们](https://tally.so/r/wA7LlN)

