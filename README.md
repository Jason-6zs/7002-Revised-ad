# Ganga Pharmaceuticals — Careers (v20)

当前确认版本：复古招聘广告、Rahul / Niraj 配音、静态钞票组合、India/Russia 换装、牛群路线与俄罗斯小建筑、现代招聘网站和虚拟鼠标自动导览。

## 上传 GitHub Pages

1. 解压 ZIP，把里面的所有文件和 `assets`、`docs` 文件夹上传到仓库根目录。不要只上传 ZIP，也不要额外套一层文件夹。
2. 根目录必须直接看到 `index.html`、`app.js`、`tour.js`、样式文件和 `assets/`。
3. 如果更新旧仓库，用本包同名文件覆盖旧文件；新增的 `assets` 文件也需要上传。
4. 在仓库 **Settings → Pages**，选择 **Deploy from a branch → main → /(root)**，保存。实际分支名不同则选实际分支。
5. 发布成功后打开 Pages 显示的网址。

如果仍用原仓库 `Jason-6zs/7002-Project`，默认网站地址为：
https://jason-6zs.github.io/7002-Project/

强制播放开场广告：
https://jason-6zs.github.io/7002-Project/?intro=1

## 播放时长

- 招聘广告主体约 46.6 秒；包含宣传单和电视转场约 51.8 秒。
- 完整自动播放（广告、转场、欢迎、五个页面讲解和虚拟鼠标点击）约 3.33 分钟，即约 3 分 20 秒。
- 默认静音预览。点击 **PLAY WITH SOUND** 会从广告开头开始有声播放。
- 手动操作、暂停、浏览器切到后台、加载速度会改变总耗时。完整导览结束停在 Careers。

## 本版内容

- business 场景保留 “LET’S GET TO BUSINESS”，人物及全部钞票按原图排列去底，静态显示。
- “From India to Russia” 局部放慢，在 Russia 发音时切换俄式冬装。
- 产品讲解中取消自动停止旋转。
- 已删除 full job description 的配音、字幕和提示框；俄罗斯视频占位框已删除。
- 旧 GitHub 包没有这些最新修改，请使用本包。

## 本地预览

直接打开 `index.html`。也可以在此文件夹运行静态文件服务器，再打开它显示的本地地址。无需依赖安装、构建、后端或 API 密钥。

页面图片、音频、音乐和音效全部附在 `assets/`，使用相对路径；Google Fonts 不可用时使用系统字体。没有账号凭据、模型缓存和中间试听文件。

`docs/playback-timing.json`：音频实测时长与完整播放估算。
`docs/hr-tour-script.json`：当前导览脚本。
`docs/asset-sha256.json`：素材校验值。
`docs/music-edit-notes.json`：BGM 编辑记录。

素材沿用用户提供的图片与音乐；HR 衍生图像使用 imagegen 去底，保留人物服饰、手势及指定排列；配音为 ElevenLabs Niraj。第三方素材的权利属于原权利人。
