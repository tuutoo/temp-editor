# Temp Editor

English | [中文](./README-CN.md)

An online rich text editor based on [UMO Editor](https://github.com/umodoc/editor), supporting multi-language, dark mode, file upload and more.

[![Made with Nuxt](https://img.shields.io/badge/Made%20with-Nuxt-00DC82?logo=nuxt&labelColor=020420)](https://nuxt.com)
[![Made with Nuxt UI](https://img.shields.io/badge/Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

## ✨ Features

- 📝 **Powerful Editing** - Built on UMO Editor, providing complete rich text editing capabilities
- 🌍 **Multi-language Support** - Support for Chinese and English interfaces with one-click switching
- 🎨 **Dark Mode** - Built-in light/dark themes with automatic system preference adaptation
- 📱 **Mobile Friendly** - Responsive design optimized for mobile devices and tablets
- 📁 **File Management** - Support for uploading and managing images, videos and other files
- 💾 **Auto-save** - Document content automatically saved to browser local storage
- 🔄 **State Persistence** - Automatically save and restore editing content when switching languages or themes
- 🐳 **Docker Deployment** - Support for Docker containerized deployment
- 📊 **Google Analytics** - Optional visitor analytics

## 🎉 Screenshots
<img width="806" height="427" alt="image" src="https://github.com/user-attachments/assets/a4799422-bfb3-48ce-9871-7ed66f69ddeb" />

Mobile view

<img width="223" height="418" alt="image" src="https://github.com/user-attachments/assets/4d38b4fb-a8c1-463d-b2fa-edba930a5685" />


## 🎯 File Storage Modes

### Local Mode (Default)
- Files stored as browser Blob URLs
- No server storage required
- Suitable for development and testing environments

### Directus Mode
- Files uploaded to Directus CMS
- Requires Directus instance
- Suitable for production environments with persistent storage

## 🚀 Quick Start

### Docker Deployment (Recommended)

For detailed Docker deployment guide, see [README.Docker.md](./README.Docker.md)

#### Option 1: Deploy from Docker Hub (Easiest)

Pull and run the latest pre-built image directly from Docker Hub:

```bash
docker run -d -p 3131:3131 tuutoo/temp-editor
```

#### Option 2: Build from Source

```bash
# Clone and build locally
git clone https://github.com/tuutoo/temp-editor.git
cd temp-editor
docker build -t temp-editor .
docker run -d -p 3131:3131 temp-editor
```

#### Option 3: Using Docker Compose

```bash
docker-compose up -d
```

Visit http://localhost:3131

### Vercel Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftuutoo%2Ftemp-editor)

### Local Development

#### Requirements

- Node.js 20+
- pnpm 10+

#### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tuutoo/temp-editor.git
   cd temp-editor
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables (optional)**
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file:
   ```env
   # File storage mode: local or directus
   FILE_STORAGE=local

   # If using Directus mode, configure the following variables
   # DIRECTUS_URL=https://your-directus-instance.com
   # DIRECTUS_TOKEN=your-api-token
   # DIRECTUS_FOLDER_ID=your-folder-id

   # Google Analytics (optional)
   # NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

   Visit http://localhost:3131

#### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📖 Usage

### Basic Operations

1. **Edit Document** - Type and format content in the editor
2. **Insert Media** - Click toolbar buttons to insert images, videos, etc.
3. **Switch Language** - Click the language switch button in the top right (EN/CN)
4. **Switch Theme** - Click the theme switch button (light/dark)
5. **Auto-save** - Content automatically saved to browser local storage

### File Upload

#### Local Mode
- Pasted or uploaded files generate browser Blob URLs
- Files only stored in browser memory
- Need to re-upload after page refresh

#### Directus Mode
- Files uploaded to Directus server
- Supports persistent storage
- Requires Directus configuration in `.env`

### Keyboard Shortcuts

The editor supports standard rich text editing shortcuts:
- `Ctrl/Cmd + B` - Bold
- `Ctrl/Cmd + I` - Italic
- `Ctrl/Cmd + U` - Underline
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- See editor help documentation for more shortcuts

## 🛠️ Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/)
- **Editor**: [UMO Editor](https://github.com/umodoc/editor)
- **i18n**: [@nuxtjs/i18n](https://i18n.nuxtjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Analytics**: [Vue Gtag Next](https://github.com/MatteoGabriele/vue-gtag-next)

## 📝 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FILE_STORAGE` | File storage mode (`local` or `directus`) | `local` | No |
| `DIRECTUS_URL` | Directus API URL | - | Required when using Directus |
| `DIRECTUS_TOKEN` | Directus API Token | - | Required when using Directus |
| `DIRECTUS_FOLDER_ID` | Directus folder ID | - | Required when using Directus |
| `NUXT_PUBLIC_GA_ID` | Google Analytics ID | - | No |
| `HOST` | Server host address | `0.0.0.0` | No |
| `PORT` | Server port | `3131` | No |

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License

## 🔗 Related Links

- [UMO Editor Documentation](https://github.com/umodoc/editor)
- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt UI Documentation](https://ui.nuxt.com/docs)
