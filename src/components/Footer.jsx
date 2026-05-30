function Footer({ darkMode }) {
  return (
    <footer className={`border-t ${darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-white'} py-4 mt-8`}>
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
        <p>© 2026 ShotPro · 100% 免费开源</p>
        <p>所有图片处理均在浏览器本地完成，不上传任何数据</p>
      </div>
    </footer>
  )
}

export default Footer
