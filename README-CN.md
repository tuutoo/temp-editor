# Temp Editor

[English](./README.md) | 中文

一个基于 [UMO Editor](https://github.com/umodoc/editor) 的在线富文本编辑器，支持多语言、深色模式、文件上传等功能。

[![Made with Nuxt](https://img.shields.io/badge/Made%20with-Nuxt-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com)
[![Made with Nuxt UI](https://img.shields.io/badge/Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

## ✨ 功能特性

- 📝 **强大的编辑功能** - 基于 UMO Editor，提供完整的富文本编辑能力
- 🌍 **多语言支持** - 支持中文和英文界面，可一键切换
- 🎨 **深色模式** - 内置浅色/深色主题，自动适配系统偏好
- 📁 **文件管理** - 支持图片、视频等文件的上传和管理
- 💾 **自动保存** - 文档内容自动保存到浏览器本地存储
- 🔄 **状态持久化** - 切换语言或主题时自动保存并恢复编辑内容
- 🐳 **Docker 部署** - 支持 Docker 容器化部署
- 📊 **Google Analytics** - 可选的访问统计功能

## 🎯 文件存储模式

### Local 模式（默认）
- 文件存储为浏览器 Blob URL
- 无需服务器存储
- 适合开发和测试环境

### Directus 模式
- 文件上传到 Directus CMS
- 需要 Directus 实例
- 适合生产环境持久化存储

## 🚀 快速开始

### Docker 部署（推荐）

详细的 Docker 部署指南请参考 [README.Docker.md](./README.Docker.md)

#### 方式1：从 Docker Hub 部署（最简单）

直接拉取并运行最新的预构建镜像：

```bash
docker run -d -p 3131:3131 tuutoo/temp-editor
```

#### 方式2：从源码构建

```bash
# 克隆并本地构建
git clone https://github.com/tuutoo/temp-editor.git
cd temp-editor
docker build -t temp-editor .
docker run -d -p 3131:3131 temp-editor
```

#### 方式3：使用 Docker Compose

```bash
docker-compose up -d
```

访问 http://localhost:3131

### Vercel 部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftuutoo%2Ftemp-editor)

### 本地开发

#### 环境要求

- Node.js 20+
- pnpm 10+

#### 配置步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/tuutoo/temp-editor.git
   cd temp-editor
   ```

2. **安装依赖**
   ```bash
   pnpm install
   ```

3. **配置环境变量（可选）**
   ```bash
   cp .env.example .env
   ```

   编辑 `.env` 文件配置：
   ```env
   # 文件存储模式：local 或 directus
   FILE_STORAGE=local

   # 如果使用 Directus 模式，需要配置以下变量
   # DIRECTUS_URL=https://your-directus-instance.com
   # DIRECTUS_TOKEN=your-api-token
   # DIRECTUS_FOLDER_ID=your-folder-id

   # Google Analytics（可选）
   # NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **启动开发服务器**
   ```bash
   pnpm dev
   ```

   访问 http://localhost:3131

#### 生产构建

```bash
# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 📖 使用说明

### 基本操作

1. **编辑文档** - 在编辑器中输入和格式化内容
2. **插入媒体** - 点击工具栏按钮插入图片、视频等
3. **切换语言** - 点击右上角语言切换按钮（中/英）
4. **切换主题** - 点击主题切换按钮（浅色/深色）
5. **自动保存** - 内容自动保存到浏览器本地存储

### 文件上传

#### Local 模式
- 粘贴或上传的文件会生成浏览器 Blob URL
- 文件仅存储在浏览器内存中
- 刷新页面后需要重新上传

#### Directus 模式
- 文件上传到 Directus 服务器
- 支持持久化存储
- 需要在 `.env` 中配置 Directus 相关参数

### 快捷键

编辑器支持标准的富文本编辑快捷键：
- `Ctrl/Cmd + B` - 加粗
- `Ctrl/Cmd + I` - 斜体
- `Ctrl/Cmd + U` - 下划线
- `Ctrl/Cmd + Z` - 撤销
- `Ctrl/Cmd + Shift + Z` - 重做
- 更多快捷键请参考编辑器帮助文档

## 🛠️ 技术栈

- **框架**: [Nuxt 4](https://nuxt.com/)
- **UI 库**: [Nuxt UI](https://ui.nuxt.com/)
- **编辑器**: [UMO Editor](https://github.com/umodoc/editor)
- **国际化**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/)
- **分析**: [Vue Gtag Next](https://github.com/MatteoGabriele/vue-gtag-next)

## 📝 配置说明

### 环境变量

| 变量 | 说明 | 默认值 | 必需 |
|------|------|--------|------|
| `FILE_STORAGE` | 文件存储模式（`local` 或 `directus`） | `local` | 否 |
| `DIRECTUS_URL` | Directus API 地址 | - | 使用 Directus 时必需 |
| `DIRECTUS_TOKEN` | Directus API Token | - | 使用 Directus 时必需 |
| `DIRECTUS_FOLDER_ID` | Directus 文件夹 ID | - | 使用 Directus 时必需 |
| `NUXT_PUBLIC_GA_ID` | Google Analytics ID | - | 否 |
| `HOST` | 服务器主机地址 | `0.0.0.0` | 否 |
| `PORT` | 服务器端口 | `3131` | 否 |


## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [UMO Editor 文档](https://github.com/umodoc/editor)
- [Nuxt 文档](https://nuxt.com/docs)
- [Nuxt UI 文档](https://ui.nuxt.com/docs)
