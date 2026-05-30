import { useState, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import ImageUploader from './components/ImageUploader'
import PreviewCanvas from './components/PreviewCanvas'
import ControlPanel from './components/ControlPanel'
import Header from './components/Header'
import Footer from './components/Footer'

// 预设渐变背景
const GRADIENT_PRESETS = [
  { name: '日落橙', value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { name: '深海蓝', value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { name: '薰衣草', value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { name: '翡翠绿', value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { name: '极光紫', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { name: '焦糖棕', value: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' },
  { name: '暗夜黑', value: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)' },
  { name: '蜜桃粉', value: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { name: '星空蓝', value: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' },
  { name: '薄荷绿', value: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' },
  { name: '珊瑚红', value: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  { name: '深邃蓝', value: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' },
]

// 纯色背景
const SOLID_PRESETS = [
  { name: '纯净白', value: '#ffffff' },
  { name: '暖灰', value: '#f5f5f4' },
  { name: '深黑', value: '#18181b' },
  { name: '品牌蓝', value: '#3b82f6' },
  { name: '活力红', value: '#ef4444' },
  { name: '森林绿', value: '#22c55e' },
]

function App() {
  const [image, setImage] = useState(null)
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const previewRef = useRef(null)

  // 编辑参数
  const [config, setConfig] = useState({
    bgType: 'gradient',        // 'gradient' | 'solid' | 'image'
    bgGradient: GRADIENT_PRESETS[0].value,
    bgSolid: '#ffffff',
    bgImage: null,
    padding: 48,
    borderRadius: 16,
    shadow: true,
    shadowIntensity: 'medium', // 'light' | 'medium' | 'heavy'
    watermark: '',
    watermarkOpacity: 0.3,
    watermarkSize: 14,
    darkMode: false,
  })

  // 处理图片上传
  const handleImageUpload = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        setImage(e.target.result)
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight })
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
  }, [])

  // 导出图片
  const handleExport = useCallback(async () => {
    if (!previewRef.current) return
    
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
      })
      
      const link = document.createElement('a')
      link.download = `shotpro-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('导出失败:', err)
      alert('导出失败，请重试')
    }
  }, [])

  // 复制到剪贴板
  const handleCopyToClipboard = useCallback(async () => {
    if (!previewRef.current) return
    
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
      })
      
      const response = await fetch(dataUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      alert('已复制到剪贴板！')
    } catch (err) {
      console.error('复制失败:', err)
      alert('复制失败，请重试')
    }
  }, [])

  return (
    <div className={`min-h-screen flex flex-col ${config.darkMode ? 'bg-zinc-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header darkMode={config.darkMode} />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {!image ? (
          <ImageUploader onUpload={handleImageUpload} darkMode={config.darkMode} />
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 左侧：预览区 */}
            <div className="flex-1 min-w-0">
              <PreviewCanvas
                ref={previewRef}
                image={image}
                imageSize={imageSize}
                config={config}
              />
              {/* 操作按钮 */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleExport}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity cursor-pointer text-lg shadow-lg shadow-blue-500/25"
                >
                  📥 导出 PNG
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="py-3 px-6 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  📋 复制
                </button>
                <button
                  onClick={() => setImage(null)}
                  className="py-3 px-6 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-xl font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  🔄 换图
                </button>
              </div>
            </div>

            {/* 右侧：控制面板 */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <ControlPanel
                config={config}
                setConfig={setConfig}
                gradientPresets={GRADIENT_PRESETS}
                solidPresets={SOLID_PRESETS}
                darkMode={config.darkMode}
              />
            </div>
          </div>
        )}
      </main>
      
      <Footer darkMode={config.darkMode} />
    </div>
  )
}

export default App
