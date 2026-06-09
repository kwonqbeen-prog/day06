import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, company, PALETTES } from '../data/site'
import { useTheme } from '../context/ThemeContext'

function PaletteIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 .88 0 1.594-.715 1.594-1.594v-.178c0-.44-.178-.862-.49-1.174a1.594 1.594 0 0 1 1.127-2.718h1.895A4.531 4.531 0 0 0 20.5 11.5C20.5 6.253 16.747 2 12 2z" />
      <circle cx="7.5" cy="12.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="8.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="13" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const { theme, toggleTheme, palette, setPalette } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="bg-surface/95 backdrop-blur border-b border-stroke"
        onMouseLeave={() => setHovered(null)}
      >
        <div className="mx-auto flex h-18 max-w-container items-center justify-between px-4 md:px-10 lg:px-20 h-[72px]">
          {/* 로고 */}
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-point">
            <PaletteIcon />
            <span>{company.name}</span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map((item) => (
              <li
                key={item.label}
                className="group flex items-center"
                onMouseEnter={() => setHovered(item.label)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-5 py-6 text-base font-semibold transition-colors',
                      isActive ? 'text-point' : 'text-on-surface hover:text-point',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 우측 컨트롤 */}
          <div className="flex items-center gap-3">
            {/* 팔레트 선택기 (데스크탑) */}
            <div className="hidden items-center gap-1.5 lg:flex" aria-label="컬러 팔레트 선택">
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`${p.name} 팔레트`}
                  title={p.name}
                  onClick={() => setPalette(p.id)}
                  className={[
                    'h-5 w-5 rounded-full transition-all hover:scale-110',
                    palette === p.id ? 'ring-2 ring-offset-2 ring-on-surface scale-110' : '',
                  ].join(' ')}
                  style={{
                    background: `linear-gradient(135deg, ${p.colors[0]} 50%, ${p.colors[1]} 50%)`,
                  }}
                />
              ))}
            </div>

            {/* 다크모드 토글 */}
            <button
              type="button"
              aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-on-surface transition hover:bg-support"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* 햄버거 (모바일) */}
            <button
              type="button"
              aria-label="메뉴 열기"
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <span className="h-0.5 w-5 rounded bg-on-surface" />
              <span className="h-0.5 w-5 rounded bg-on-surface" />
              <span className="h-0.5 w-5 rounded bg-on-surface" />
            </button>
          </div>
        </div>

        {/* 데스크탑 드롭다운 서브메뉴 */}
        <div
          className={[
            'hidden overflow-hidden border-b border-stroke bg-surface/98 backdrop-blur transition-all duration-200 lg:block',
            hovered ? 'max-h-48 opacity-100' : 'max-h-0 border-b-0 opacity-0',
          ].join(' ')}
        >
          <div className="mx-auto flex max-w-container justify-end px-20">
            {nav.map((item) => (
              <ul
                key={item.label}
                className="flex w-40 flex-col gap-2 py-6"
                onMouseEnter={() => setHovered(item.label)}
              >
                {hovered === item.label &&
                  item.children.map((c) => (
                    <li key={c.label + c.to}>
                      <Link
                        to={c.to}
                        className="block py-1 text-center text-sm font-medium text-muted transition hover:font-semibold hover:text-point"
                        onClick={() => setHovered(null)}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            ))}
          </div>
        </div>
      </nav>

      {/* 모바일 패널 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto bg-surface p-6 shadow-2xl">
            {/* 패널 헤더 */}
            <div className="mb-6 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xl font-extrabold text-point">
                <PaletteIcon />
                {company.name}
              </span>
              <button
                type="button"
                aria-label="메뉴 닫기"
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-support text-muted"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* 메뉴 */}
            <ul className="flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.label} className="border-b border-stroke pb-1">
                  <Link
                    to={item.to}
                    className="block py-2.5 text-base font-bold text-on-surface hover:text-point"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <ul className="flex flex-col pl-3">
                    {item.children.map((c) => (
                      <li key={c.label + c.to}>
                        <Link
                          to={c.to}
                          className="block py-1.5 text-sm text-muted hover:text-point"
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            {/* 팔레트 + 테마 */}
            <div className="mt-8 flex flex-col gap-4">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">컬러 팔레트</p>
                <div className="flex items-center gap-3">
                  {PALETTES.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`${p.name} 팔레트`}
                      title={p.name}
                      onClick={() => setPalette(p.id)}
                      className={[
                        'h-8 w-8 rounded-full transition-all hover:scale-110',
                        palette === p.id ? 'ring-2 ring-offset-2 ring-on-surface scale-110' : '',
                      ].join(' ')}
                      style={{
                        background: `linear-gradient(135deg, ${p.colors[0]} 50%, ${p.colors[1]} 50%)`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  {PALETTES.map((p) => (
                    <span
                      key={p.id}
                      className={['text-[10px] font-medium', palette === p.id ? 'text-point' : 'text-muted'].join(' ')}
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-3 rounded-xl border border-stroke px-4 py-3 text-sm font-semibold text-on-surface hover:bg-support"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
                {theme === 'dark' ? '라이트 모드' : '다크 모드'}로 전환
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
