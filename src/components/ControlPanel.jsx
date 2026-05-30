import { useRef } from 'react'

function ControlPanel({ config, setConfig, gradientPresets, solidPresets, darkMode }) {
  const bgImageInputRef = useRef(null)

  const update = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  // 处理自定义背景图
  const handleBgImageUpload = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        update('bgImage', ev.target.result)
        update('bgType', 'image')
      }
      reader.readAsDataURL(file)
    }
  }

  const sectionClass = `p-4 rounded-xl ${darkMode ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-white border border-gray-200'}`
  const labelClass = 'text-sm font-medium mb-2 block'

  return (
    <div className="space-y-4">
      {/* 背景类型选择 */}
      <div className={sectionClass}>
        <label className={labelClass}>🎨 背景类型</label>
        <div className="flex gap-2 mb-3">
          {['gradient', 'solid', 'image'].map(type => (
            <button
              key={type}
              onClick={() => update('bgType', type)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer
                ${config.bgType === type
                  ? 'bg-blue-500 text-white shadow-md'
                  : darkMode
                    ? 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {type === 'gradient' ? '渐变' : type === 'solid' ? '纯色' : '自定义'}
            </button>
          ))}
        </div>

        {/* 渐变预设 */}
        {config.bgType === 'gradient' && (
          <div className="grid grid-cols-4 gap-2">
            {gradientPresets.map((preset, i) => (
              <button
                key={i}
                onClick={() => update('bgGradient', preset.value)}
                className={`h-12 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                  config.bgGradient === preset.value ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
                style={{ background: preset.value }}
                title={preset.name}
              />
            ))}
          </div>
        )}

        {/* 纯色预设 */}
        {config.bgType === 'solid' && (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {solidPresets.map((preset, i) => (
                <button
                  key={i}
                  onClick={() => update('bgSolid', preset.value)}
                  className={`h-12 rounded-lg cursor-pointer border transition-all hover:scale-105 ${
                    config.bgSolid === preset.value ? 'ring-2 ring-blue-500 ring-offset-2' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: preset.value }}
                  title={preset.name}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={config.bgSolid}
                onChange={(e) => update('bgSolid', e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={config.bgSolid}
                onChange={(e) => update('bgSolid', e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border text-sm font-mono"
                placeholder="#ffffff"
              />
            </div>
          </div>
        )}

        {/* 自定义背景图 */}
        {config.bgType === 'image' && (
          <div>
            {config.bgImage ? (
              <div className="relative">
                <img src={config.bgImage} alt="bg" className="w-full h-24 object-cover rounded-lg" />
                <button
                  onClick={() => { update('bgImage', null); update('bgType', 'gradient') }}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button
                onClick={() => bgImageInputRef.current?.click()}
                className={`w-full py-6 border-2 border-dashed rounded-lg text-sm cursor-pointer
                  ${darkMode ? 'border-zinc-600 hover:border-zinc-500' : 'border-gray-300 hover:border-blue-400'}`}
              >
                点击上传背景图
              </button>
            )}
            <input
              ref={bgImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleBgImageUpload}
              className="hidden"
            />
          </div>
        )}
      </div>

      {/* 间距与圆角 */}
      <div className={sectionClass}>
        <label className={labelClass}>📐 间距与形状</label>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>内边距</span>
              <span>{config.padding}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="120"
              value={config.padding}
              onChange={(e) => update('padding', Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>圆角</span>
              <span>{config.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={config.borderRadius}
              onChange={(e) => update('borderRadius', Number(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 阴影 */}
      <div className={sectionClass}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">💫 阴影效果</label>
          <button
            onClick={() => update('shadow', !config.shadow)}
            className={`w-10 h-6 rounded-full transition-colors cursor-pointer relative
              ${config.shadow ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-sm
              ${config.shadow ? 'translate-x-5' : 'translate-x-1'}`}
            />
          </button>
        </div>
        
        {config.shadow && (
          <div className="flex gap-2">
            {['light', 'medium', 'heavy'].map(level => (
              <button
                key={level}
                onClick={() => update('shadowIntensity', level)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all
                  ${config.shadowIntensity === level
                    ? 'bg-blue-500 text-white'
                    : darkMode ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-100 text-gray-600'
                  }`}
              >
                {level === 'light' ? '轻柔' : level === 'medium' ? '适中' : '强烈'}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 水印 */}
      <div className={sectionClass}>
        <label className={labelClass}>✏️ 水印文字</label>
        <input
          type="text"
          value={config.watermark}
          onChange={(e) => update('watermark', e.target.value)}
          placeholder="例如：@你的ID"
          className={`w-full px-3 py-2 rounded-lg border text-sm mb-3
            ${darkMode ? 'bg-zinc-700 border-zinc-600' : 'bg-gray-50 border-gray-200'}`}
        />
        
        {config.watermark && (
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>透明度</span>
                <span>{Math.round(config.watermarkOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.05"
                value={config.watermarkOpacity}
                onChange={(e) => update('watermarkOpacity', Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>字号</span>
                <span>{config.watermarkSize}px</span>
              </div>
              <input
                type="range"
                min="10"
                max="32"
                value={config.watermarkSize}
                onChange={(e) => update('watermarkSize', Number(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 深色模式 */}
      <div className={sectionClass}>
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">🌙 深色界面</label>
          <button
            onClick={() => update('darkMode', !config.darkMode)}
            className={`w-10 h-6 rounded-full transition-colors cursor-pointer relative
              ${config.darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-sm
              ${config.darkMode ? 'translate-x-5' : 'translate-x-1'}`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel
