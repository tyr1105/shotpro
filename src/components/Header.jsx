function Header({ darkMode }) {
  return (
    <header className={`border-b ${darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-gray-200 bg-white'} sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
            S
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              ShotPro
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
              截图美化工具 · 让截图赏心悦目
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="hidden sm:inline">免费使用</span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            无需注册
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
