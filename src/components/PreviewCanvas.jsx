import { forwardRef, useMemo } from 'react'

const PreviewCanvas = forwardRef(({ image, imageSize, config }, ref) => {
  // 计算阴影样式
  const shadowStyle = useMemo(() => {
    if (!config.shadow) return 'none'
    const intensity = {
      light: '0 4px 12px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)',
      medium: '0 8px 30px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.08)',
      heavy: '0 16px 48px rgba(0,0,0,0.25), 0 8px 16px rgba(0,0,0,0.12)',
    }
    return intensity[config.shadowIntensity] || intensity.medium
  }, [config.shadow, config.shadowIntensity])

  // 背景样式
  const bgStyle = useMemo(() => {
    if (config.bgType === 'gradient') return { background: config.bgGradient }
    if (config.bgType === 'solid') return { backgroundColor: config.bgSolid }
    if (config.bgType === 'image' && config.bgImage) return { backgroundImage: `url(${config.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    return { background: config.bgGradient }
  }, [config.bgType, config.bgGradient, config.bgSolid, config.bgImage])

  // 计算预览图尺寸（限制最大宽度）
  const previewMaxWidth = 800
  const scale = imageSize.width > previewMaxWidth ? previewMaxWidth / imageSize.width : 1
  const displayWidth = Math.min(imageSize.width, previewMaxWidth)
  const displayHeight = imageSize.height * scale

  return (
    <div className="flex items-center justify-center p-8 overflow-auto">
      <div
        ref={ref}
        style={{
          ...bgStyle,
          padding: `${config.padding}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: displayWidth + config.padding * 2,
          minHeight: displayHeight + config.padding * 2,
          position: 'relative',
        }}
      >
        {/* 截图主体 */}
        <img
          src={image}
          alt="screenshot"
          style={{
            width: displayWidth,
            height: displayHeight,
            borderRadius: `${config.borderRadius}px`,
            boxShadow: shadowStyle,
            display: 'block',
            objectFit: 'contain',
          }}
          draggable={false}
        />

        {/* 水印 */}
        {config.watermark && (
          <div
            style={{
              position: 'absolute',
              bottom: config.padding + 8,
              right: config.padding + 8,
              opacity: config.watermarkOpacity,
              fontSize: `${config.watermarkSize}px`,
              color: config.darkMode ? '#fff' : '#666',
              fontWeight: 500,
              userSelect: 'none',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            {config.watermark}
          </div>
        )}
      </div>
    </div>
  )
})

PreviewCanvas.displayName = 'PreviewCanvas'

export default PreviewCanvas
