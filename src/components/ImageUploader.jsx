import { useState, useRef } from 'react'

function ImageUploader({ onUpload, darkMode }) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      onUpload(file)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      onUpload(file)
    }
  }

  // 粘贴图片
  const handlePaste = (e) => {
    const items = e.clipboardData?.items
    if (items) {
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) onUpload(file)
          break
        }
      }
    }
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onPaste={handlePaste}
      tabIndex={0}
    >
      <div
        className={`w-full max-w-2xl border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-200 cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-[1.02]' 
            : darkMode 
              ? 'border-zinc-700 hover:border-zinc-500 bg-zinc-900' 
              : 'border-gray-300 hover:border-blue-400 bg-white hover:bg-blue-50/30'
          }`}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="text-6xl mb-6">📸</div>
        <h2 className="text-2xl font-bold mb-3">上传你的截图</h2>
        <p className="text-gray-500 mb-6 text-lg">
          拖拽图片到此处 · 点击选择 · 或 <kbd className="px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded text-sm font-mono">Ctrl+V</kbd> 粘贴
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
          <span>支持 PNG</span>
          <span>·</span>
          <span>JPG</span>
          <span>·</span>
          <span>WebP</span>
          <span>·</span>
          <span>GIF</span>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* 特性展示 */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl w-full">
        <Feature icon="🎨" title="精美背景" desc="12款渐变 + 6款纯色" />
        <Feature icon="⚡" title="即用即走" desc="无需注册，浏览器本地处理" />
        <Feature icon="🔒" title="隐私安全" desc="图片不上传服务器" />
      </div>
    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div className="text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold text-sm">{title}</h3>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </div>
  )
}

export default ImageUploader
