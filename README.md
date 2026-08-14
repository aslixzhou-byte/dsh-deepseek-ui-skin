# deepseek-whale · DeepSeek 蓝鲸

DeepSeek Harness Web GUI 的 **DeepSeek 品牌风格**皮肤：品牌鲸鱼背景、深海蓝渐变界面与蓝色玻璃质感。纯展示层客户端插件——`apply()` 设置 `data-dsh-deepseek-whale` 作用域、按亮/暗主题切换鲸鱼背景、挂载侧边栏鲸鱼吉祥物、装饰无边框标题栏品牌字标，并为加载/思考/工具运行状态预留稳定动画钩子。effect 销毁器还原全部 CSS/DOM 写入；不注入服务、不发出 Cordis 事件、不触达模型请求。

## 特性

- DeepSeek 品牌蓝（`#4D6BFE` / `#2E4DE6`）配色令牌，覆盖整套 `--dsw-alias-*` 设计令牌
- 品牌鲸鱼 SVG 背景（亮/暗自动切换，深海蓝夜空带星点与波浪）
- 侧边栏深海蓝渐变 + 漂浮鲸鱼吉祥物
- 蓝色玻璃质感输入框、品牌蓝主按钮、选中会话高亮
- 素材全部内嵌于 client bundle（SVG data URI），激活不依赖任何临时文件/远程 URL/资源服务器

## 安装

```sh
git clone https://github.com/aslixzhou-byte/dsh-deepseek-ui-skin
cd <harness>
dsh plugin --profile web add ../dsh-deepseek-ui-skin
```

或直接引用 Git 地址：

```sh
dsh plugin --profile web add https://github.com/aslixzhou-byte/dsh-deepseek-ui-skin
```

加载即生效、卸载即复原（与皮肤中心/dsh-skin 的互斥切换兼容，`wiring.id` 为 `ui-skin-deepseek-whale`）。


## 许可

CC BY-NC-SA 4.0。见 `LICENSE` 与 `NOTICE`。
