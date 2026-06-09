import { useState, useMemo } from 'react'
import { Link, useParams, NavLink } from 'react-router-dom'
import { videos, channels } from '../data/site'

const PER_PAGE = 6

function VideoCard({ video }) {
  const ch = channels.find((c) => c.id === video.channel)
  return (
    <a
      href={`https://youtube.com/watch?v=${video.youtubeId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group card block"
    >
      {/* 썸네일 — 실제 YouTube 이미지 */}
      <div className="relative aspect-video overflow-hidden bg-surface-alt">
        <img
          src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/25">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-point">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>
        <div className="absolute top-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white">
          {video.category}
        </div>
        {/* YouTube 로고 배지 */}
        <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5">
          <svg width="32" height="10" viewBox="0 0 90 20" fill="white">
            <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35042 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
            <polygon fill="white" points="11.4253,14.2854 18.8477,10 11.4253,5.71463"/>
          </svg>
        </div>
      </div>

      {/* 정보 */}
      <div className="p-4">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-on-surface transition group-hover:text-point md:text-base">
          {video.title}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span
            className="h-5 w-5 shrink-0 rounded-full"
            style={{ background: ch?.gradient }}
          />
          <span className="truncate text-xs font-semibold text-muted">{ch?.name}</span>
          <span className="ml-auto shrink-0 text-xs text-muted">{video.date}</span>
        </div>
      </div>
    </a>
  )
}

export default function Videos() {
  const { artist: channelParam } = useParams()
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!channelParam) return videos
    return videos.filter((v) => v.channel === channelParam)
  }, [channelParam])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const currentChannel = channels.find((c) => c.id === channelParam)

  return (
    <div className="min-h-screen bg-surface">
      {/* 페이지 헤더 */}
      <div className="bg-support py-12 md:py-16">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Recommended Videos</p>
          <h1 className="text-3xl font-extrabold text-on-surface md:text-4xl">
            {currentChannel ? currentChannel.name : '추천 영상'}
          </h1>
          {currentChannel ? (
            <div className="mt-3 flex flex-col gap-1">
              <p className="text-sm text-muted">{currentChannel.specialty}</p>
              <p className="max-w-lg text-sm leading-relaxed text-muted">{currentChannel.desc}</p>
              <a
                href={currentChannel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-point hover:opacity-80 transition"
              >
                유튜브 채널 바로가기 →
              </a>
            </div>
          ) : (
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              드로잉타운이 선정한 현직 일러스트레이터들의 유튜브 영상을 모아 소개합니다.
              참고해서 공부하고, 챌린지로 함께 성장해요.
            </p>
          )}
        </div>
      </div>

      {/* 채널 필터 탭 */}
      <div className="sticky top-[72px] z-20 border-b border-stroke bg-surface/95 backdrop-blur">
        <div className="mx-auto max-w-container section-x">
          <ul className="flex overflow-x-auto">
            <li className="shrink-0">
              <NavLink
                to="/videos"
                end
                onClick={() => setPage(1)}
                className={({ isActive }) =>
                  [
                    'block whitespace-nowrap border-b-2 px-5 py-4 text-sm font-semibold transition',
                    !channelParam
                      ? 'border-point text-point'
                      : 'border-transparent text-muted hover:text-on-surface',
                  ].join(' ')
                }
              >
                전체 ({videos.length})
              </NavLink>
            </li>
            {channels.map((ch) => (
              <li key={ch.id} className="shrink-0">
                <NavLink
                  to={`/videos/${ch.id}`}
                  onClick={() => setPage(1)}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-2 whitespace-nowrap border-b-2 px-5 py-4 text-sm font-semibold transition',
                      isActive
                        ? 'border-point text-point'
                        : 'border-transparent text-muted hover:text-on-surface',
                    ].join(' ')
                  }
                >
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ background: ch.gradient }}
                  />
                  {ch.name}
                  <span className="text-[11px] text-muted">({ch.videoCount})</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 영상 그리드 (2열) */}
      <div className="mx-auto max-w-container section-x py-10 md:py-14">
        {paged.length === 0 ? (
          <p className="py-20 text-center text-muted">영상이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-7">
            {paged.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-muted transition enabled:hover:bg-support disabled:opacity-30"
              aria-label="이전 페이지"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={[
                  'flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition',
                  n === page
                    ? 'bg-point text-white'
                    : 'border border-stroke text-muted hover:bg-support',
                ].join(' ')}
                aria-label={`${n}페이지`}
                aria-current={n === page ? 'page' : undefined}
              >
                {n}
              </button>
            ))}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-muted transition enabled:hover:bg-support disabled:opacity-30"
              aria-label="다음 페이지"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
