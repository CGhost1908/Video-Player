# 🎬 React Custom Video Player Component

A customizable, lightweight, and modern **HTML5 Video Player component for React**. Featuring custom video controls, configurable aspect ratios, thumbnail previews, progress scrubbing, volume sliders, and fullscreen toggle.

---

## 🌟 Key Features

- 🎨 **Custom Video Controls**: Clean, modern overlay controls that smoothly hide during active playback.
- 📐 **Configurable Aspect Ratio & Sizing**: Supports flexible widths and aspect ratios (e.g. `16/9`, `4/3`, `21/9`).
- 🖼️ **Poster / Thumbnail Support**: Display a custom poster thumbnail prior to video initialization.
- ⏩ **Interactive Timeline**: Smooth timeline scrubbing and real-time buffer progress indication.
- 🔊 **Volume & Mute Toggle**: Integrated volume slider with instant mute/unmute shortcuts.
- ⛶ **Native Fullscreen**: Seamless fullscreen mode handling across modern browsers.
- ⚡ **Zero External Bloat**: Built with pure React hooks and standard CSS without heavy third-party player dependencies.

---

## 📁 Repository Structure

```text
Video-Player/
├── player/
│   ├── to_src/             # Components and styles to include in your React src folder
│   │   ├── videoPlayer.js  # Main React Video Player component
│   │   ├── videoPlayer.css # Styling, animations, control bar & slider themes
│   │   └── videoSource.js  # Helper utility for video source path resolution
│   └── to_public/          # Icons, play/pause SVGs, and sample video assets
├── example/                # Full sample integration project
└── README.md               # Component documentation & quick-start guide
```

---

## 🚀 Quick Start Guide

### 1. Copy Files to Your React Project

1. Copy the contents of `player/to_src/` into your project's `src/components/videoPlayer/` directory:
   - `videoPlayer.js`
   - `videoPlayer.css`
   - `videoSource.js`

2. Copy the icon assets from `player/to_public/` into your React project's `public/` directory.

### 2. Import & Use in Your Component

```jsx
import React from 'react';
import VideoPlayer from './components/videoPlayer/videoPlayer';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <VideoPlayer
        src="/videos/sample_video.mp4"
        thumbnail="/images/thumbnail.jpg"
        width="800px"
        aspectRatio="16/9"
        autoPlay={false}
      />
    </div>
  );
}

export default App;
```

---

## ⚙️ Component Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | *(Required)* | The URL or relative path to the video file |
| `thumbnail` | `string` | `""` | Image URL displayed before playback starts |
| `width` | `string` | `"100%"` | Player container width (e.g. `800px`, `100%`) |
| `aspectRatio`| `string` | `"16/9"` | CSS aspect ratio value |
| `autoPlay` | `boolean` | `false` | Whether video should start automatically |

---

## 📄 License

This project is licensed under the MIT License.
