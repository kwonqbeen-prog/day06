import { Link } from 'react-router-dom'
import { company, PALETTES } from '../data/site'
import { useTheme } from '../context/ThemeContext'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function YoutubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

export default function Footer() {
  const { palette, setPalette } = useTheme()

  return (
    <footer className="bg-surface-alt border-t border-stroke">
      {/* 상단 */}
      <div className="mx-auto max-w-container px-4 py-16 md:px-10 lg:px-40">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* 브랜드 */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-2xl font-extrabold text-point">{company.name}</p>
              <p className="text-sm font-medium text-muted">{company.nameEn}</p>
            </div>
            <p className="max-w-xs text-sm leading-7 text-muted">{company.tagline}</p>
            <div className="flex items-center gap-3">
              <a
                href={company.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-muted transition hover:bg-primary hover:text-on-surface hover:border-primary"
                aria-label="인스타그램"
              >
                <InstagramIcon />
              </a>
              <a
                href={company.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-muted transition hover:bg-secondary hover:text-on-surface hover:border-secondary"
                aria-label="유튜브"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* 팔레트 선택 */}
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted">컬러 팔레트</p>
            <div className="flex flex-col gap-2">
              {PALETTES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPalette(p.id)}
                  className={[
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-support',
                    palette === p.id ? 'text-point' : 'text-muted',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'h-5 w-5 shrink-0 rounded-full',
                      palette === p.id ? 'ring-2 ring-point ring-offset-1' : '',
                    ].join(' ')}
                    style={{
                      background: `linear-gradient(135deg, ${p.colors[0]} 50%, ${p.colors[1]} 50%)`,
                    }}
                  />
                  {p.name}
                  {palette === p.id && <span className="ml-auto text-xs">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* 링크 */}
          <div className="flex flex-col gap-6 text-sm">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">강의</p>
              <ul className="flex flex-col gap-2">
                {['전체 강의', '캐릭터', '수채화', '디지털', '굿즈'].map((l) => (
                  <li key={l}>
                    <Link to="/videos" className="text-muted hover:text-on-surface transition">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-sm">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted">서비스</p>
              <ul className="flex flex-col gap-2">
                {[
                  { label: '작가 소개', to: '/artists' },
                  { label: '챌린지', to: '/challenge' },
                  { label: '커뮤니티', to: '/community' },
                  { label: '고객센터', to: '/support' },
                ].map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-muted hover:text-on-surface transition">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div className="border-t border-stroke px-4 py-6 md:px-10 lg:px-40">
        <div className="mx-auto flex max-w-container flex-col justify-between gap-4 md:flex-row md:items-center">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {company.footerLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className={l.strong ? 'font-bold text-on-surface' : 'text-muted hover:text-on-surface transition'}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted">{company.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
