import { Link } from 'react-router-dom'
import { notices } from '../data/site'

function NoticeRow({ notice }) {
  return (
    <li>
      <Link
        to="/community"
        className="flex items-center justify-between gap-4 py-4 transition hover:text-point"
      >
        <div className="flex items-center gap-3">
          <span
            className={[
              'shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold',
              notice.category === '공지'    ? 'bg-primary text-on-surface' :
              notice.category === '챌린지'  ? 'bg-secondary text-on-surface' :
              notice.category === '강의'    ? 'bg-point/10 text-point' :
              'bg-support text-muted',
            ].join(' ')}
          >
            {notice.category}
          </span>
          <span className="text-sm font-medium text-on-surface md:text-base">{notice.title}</span>
        </div>
        <span className="shrink-0 text-xs text-muted">{notice.date}</span>
      </Link>
    </li>
  )
}

function GalleryPlaceholder() {
  const items = Array.from({ length: 6 }, (_, i) => i + 1)
  const gradients = [
    'linear-gradient(135deg, #D7BFFF, #FFB8F0)',
    'linear-gradient(135deg, #B8DEFF, #D7BFFF)',
    'linear-gradient(135deg, #FFD9B8, #FFB8D9)',
    'linear-gradient(135deg, #B8FFE4, #C8B8FF)',
    'linear-gradient(135deg, #FFB8C8, #D7BFFF)',
    'linear-gradient(135deg, #D7BFFF, #B8DEFF)',
  ]
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
      {items.map((i) => (
        <div
          key={i}
          className="card aspect-square"
          style={{ background: gradients[i - 1] }}
        />
      ))}
    </div>
  )
}

export default function Community({ tab }) {
  return (
    <div className="min-h-screen bg-surface">
      {/* 헤더 */}
      <div className="bg-support py-12 md:py-16">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Community</p>
          <h1 className="text-3xl font-extrabold text-on-surface md:text-4xl">커뮤니티</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            드로잉타운의 공지사항과 챌린지 참가자들의 작품 갤러리를 확인하세요.
          </p>
        </div>
      </div>

      {/* 탭 */}
      <div className="sticky top-[72px] z-20 border-b border-stroke bg-surface/95 backdrop-blur">
        <div className="mx-auto max-w-container section-x">
          <ul className="flex">
            <li>
              <Link
                to="/community"
                className={[
                  'block border-b-2 px-6 py-4 text-sm font-semibold transition',
                  !tab ? 'border-point text-point' : 'border-transparent text-muted hover:text-on-surface',
                ].join(' ')}
              >
                공지사항
              </Link>
            </li>
            <li>
              <Link
                to="/community/gallery"
                className={[
                  'block border-b-2 px-6 py-4 text-sm font-semibold transition',
                  tab === 'gallery' ? 'border-point text-point' : 'border-transparent text-muted hover:text-on-surface',
                ].join(' ')}
              >
                작품 갤러리
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-container section-x py-10 md:py-14">
        {tab === 'gallery' ? (
          <div>
            <p className="mb-6 text-sm text-muted">챌린지 참가자들의 작품을 모아놓은 갤러리입니다.</p>
            <GalleryPlaceholder />
          </div>
        ) : (
          <div>
            <ul className="divide-y divide-stroke">
              {notices.map((n) => (
                <NoticeRow key={n.id} notice={n} />
              ))}
            </ul>

            {/* 더보기 */}
            <div className="mt-10 text-center">
              <button type="button" className="btn-outline">
                더 보기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
