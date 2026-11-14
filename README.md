# 好好日常 · 完整源码

这是当前已发布版本的完整静态网站源码，包含待办、饮食推荐、照片记录、个人食品库、互动吉祥物和音效。

## 在 Windows 本地运行

1. 将压缩包内容解压到 `C:\Users\RAY\Desktop\project\chatgtp`。
2. 安装 Python 3（如果已安装则跳过）。
3. 双击 `start-local.bat`，保持窗口开启。
4. 在浏览器访问 http://127.0.0.1:8765 。

也可以在此目录的终端运行：

```powershell
py -3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

按 Ctrl+C 停止服务。若端口占用，可换一个端口；不同端口被浏览器视为不同的存储来源。

## 文件

- `dist/index.html`：页面和表单。
- `dist/style.css`：界面、响应式布局和动画。
- `dist/app.js`：待办、食物推荐、照片存储和吉祥物互动。
- `dist/sounds.js`：本地合成音效与声音开关。
- `dist/mascot.png`、`dist/mascot-sprites.png`：吉祥物素材。
- `.openai/hosting.json`：现有 Sites 站点的部署标识和静态目录配置。

## 数据与部署

无需 Node.js、构建工具或后端。任何静态网站服务器都可托管 `dist` 目录。
待办与餐食元数据使用 localStorage；照片使用 IndexedDB；数据只保存在各自浏览器中。
线上网站的个人记录不会包含在源码内，也不会自动迁移到本地网址。可从线上页面导出备份；当前版本没有备份导入功能。
请使用 HTTP 本地服务，不建议直接双击 HTML，以免 file:// 来源限制影响照片存储。
食物示例图片使用 Unsplash 外链，字体使用 Google Fonts；这些外部资源需要网络，吉祥物与音效在本地。
源码包不包含 Git 历史、访问凭据或个人饮食数据。
