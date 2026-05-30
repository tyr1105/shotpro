function Footer({ darkMode }) {
  const tools = [
    { name: 'AI Tools Box', href: 'https://tyr1105.github.io/ai-tools-box/' },
    { name: 'DevKit Tools', href: 'https://tyr1105.github.io/devkit-tools/' },
    { name: 'PicTool', href: 'https://tyr1105.github.io/pictool/' },
    { name: 'QRGen', href: 'https://tyr1105.github.io/qrgen/' },
    { name: 'RedCover', href: 'https://tyr1105.github.io/redcover/' },
    { name: 'ResumeCraft', href: 'https://tyr1105.github.io/resumecraft/' },
    { name: 'ShotPro', href: 'https://tyr1105.github.io/shotpro/' },
    { name: 'WriteBoom', href: 'https://tyr1105.github.io/writeboom/' },
    { name: 'PDFKit', href: 'https://tyr1105.github.io/pdfkit/' },
  ]

  return (
    <footer className={`border-t mt-8 ${darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-gray-50'}`}>
      {/* Google AdSense Placeholder */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className={`border border-dashed rounded-lg p-4 text-center text-xs ${
          darkMode ? 'bg-white/5 border-white/10 text-white/20' : 'bg-gray-100 border-gray-300 text-gray-400'
        }`}>
          {"Google AdSense 广告位"}
        </div>
      </div>

      {/* Tool Network Links */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h3 className={`text-sm font-semibold mb-3 text-center ${
          darkMode ? 'text-white/40' : 'text-gray-700'
        }`}>🛠️ Tool Network</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {tools.map(tool => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1.5 rounded-full border text-xs transition-colors ${
                darkMode
                  ? 'bg-white/5 border-white/10 text-white/40 hover:text-blue-400 hover:border-blue-400/30'
                  : 'bg-white border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300'
              }`}
            >
              {tool.name}
            </a>
          ))}
        </div>
      </div>

      {/* 支持作者 */}
      <div className="max-w-7xl mx-auto px-4 pb-6 text-center">
        <p className={`text-sm mb-2 ${darkMode ? 'text-white/30' : 'text-gray-500'}`}>☕ 支持作者</p>
        <p className={`text-xs ${darkMode ? 'text-white/20' : 'text-gray-400'}`}>
          如果这些工具对你有帮助，欢迎分享给朋友或 Star 支持！
        </p>
      </div>

      <div className={`border-t py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs ${
        darkMode ? 'border-zinc-800 text-white/20' : 'border-gray-200 text-gray-400'
      }`}>
        <p>© 2026 ShotPro · 100% 免费开源</p>
        <p>所有图片处理均在浏览器本地完成，不上传任何数据</p>
      </div>
    </footer>
  )
}

export default Footer
