import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { channels, members, videos, challenges, notices, company } from '../data/site'
import MemberImage from '../components/MemberImage'

// 슬라이드: 추천 영상 3개 + 멤버 2명 (각 채널 대표 1개씩)
const HERO_SLIDES = [
  { type: 'video',  key: 'v1',  youtubeId: videos[0].youtubeId,  label: videos[0].title,    badge: videos[0].category,  channelId: videos[0].channel },
  { type: 'member', key: 'm1',  memberId: members[0].id, gradient: members[0].gradient,   label: members[0].name,     badge: `${members[0].level} · ${members[0].handle}`, tags: members[0].tags },
  { type: 'video',  key: 'v2',  youtubeId: videos[6].youtubeId,  label: videos[6].title,    badge: videos[6].category,  channelId: videos[6].channel },
  { type: 'member', key: 'm2',  memberId: members[2].id, gradient: members[2].gradient,   label: members[2].name,     badge: `${members[2].level} · ${members[2].handle}`, tags: members[2].tags },
  { type: 'video',  key: 'v3',  youtubeId: videos[12].youtubeId, label: videos[12].title,   badge: videos[12].category, channelId: videos[12].channel },
]

// ── Hero 풀스크린 슬라이더 ──────────────────────────────────
function Hero() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_SLIDES.length), 4500)
    return () => clearInterval(t)
  }, [])

  const current = HERO_SLIDES[idx]

  return (
    <section className="relative h-[calc(100svh-72px)] min-h-[520px] overflow-hidden">
      {/* 슬라이드 배경 */}
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={slide.key}
          className={[
            'absolute inset-0 transition-opacity duration-1000',
            i === idx ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        >
          {slide.type === 'video' ? (
            <img
              src={`https://img.youtube.com/vi/${slide.youtubeId}/maxresdefault.jpg`}
              alt={slide.label}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.src = `https://img.youtube.com/vi/${slide.youtubeId}/hqdefault.jpg`
              }}
            />
          ) : (
            <div className="relative h-full w-full overflow-hidden" style={{ background: slide.gradient }}>
              {/* 프로필 이미지 — 우측 배치, 없으면 그라데이션만 표시 */}
              <img
                src={`${import.meta.env.BASE_URL}images/members/${slide.memberId}.jpg`}
                alt={slide.label}
                className="absolute inset-y-0 right-0 h-full w-[55%] object-cover object-top opacity-90 md:w-2/5"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
              {/* 왼쪽으로 자연스럽게 페이드 */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[55%] bg-gradient-to-r from-black/30 to-transparent md:w-2/5" />
            </div>
          )}
        </div>
      ))}

      {/* 다크 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />

      {/* 히어로 텍스트 — 좌하단 */}
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="mx-auto w-full max-w-container section-x pb-20 md:pb-24">
          <div className="flex flex-col items-start gap-5 md:gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              ✏️ {company.tagline}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow md:text-6xl lg:text-7xl">
              그림으로 <br />
              <span style={{ color: 'var(--c-primary)' }}>연결되는</span> <br />
              우리의 이야기
            </h1>

            <p className="max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
              예비 일러스트레이터와 인스타툰 작가를 위한 드로잉 학습 커뮤니티.
              <br className="hidden md:block" />
              현직 작가들의 유튜브 영상을 모아보고, 챌린지로 함께 성장해요.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/videos" className="btn-point">
                추천 영상 보기 →
              </Link>
              <Link
                to="/challenge"
                className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              >
                챌린지 참여하기
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 현재 슬라이드 정보 — 우하단 */}
      <div className="absolute bottom-20 right-4 hidden flex-col items-end gap-1.5 md:flex md:right-8 md:bottom-24">
        <span className="rounded-full bg-white/15 px-3 py-0.5 text-[11px] font-bold text-white/90 backdrop-blur-sm">
          {current.type === 'video' ? '📹 추천 영상' : '👤 멤버'}
        </span>
        <p className="max-w-[240px] text-right text-xs font-medium text-white/70 line-clamp-1">
          {current.label}
        </p>
      </div>

      {/* 인디케이터 — 하단 중앙 */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`슬라이드 ${i + 1}`}
            onClick={() => setIdx(i)}
            className={[
              'h-1.5 rounded-full transition-all duration-300',
              i === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60',
            ].join(' ')}
          />
        ))}
      </div>
    </section>
  )
}

// ── 참여 중인 멤버들 ──────────────────────────────────────
function ActiveMembers() {
  const levelColor = {
    '초급': 'bg-primary/50 text-on-surface',
    '중급': 'bg-secondary/60 text-on-surface',
    '고급': 'bg-point/10 text-point',
  }

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Members</p>
            <h2 className="text-3xl font-extrabold text-on-surface md:text-4xl">참여 중인 멤버들</h2>
            <p className="mt-2 text-sm text-muted">현재 챌린지에 참여하며 함께 성장하고 있는 드로잉타운 멤버들입니다.</p>
          </div>
          <Link to="/members" className="text-sm font-semibold text-point hover:opacity-80 transition">
            멤버 전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {members.map((m) => (
            <Link key={m.id} to={`/members/${m.id}`} className="card p-0 group block">
              <div className="aspect-square w-full overflow-hidden">
                <MemberImage
                  member={m}
                  className="h-full w-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-on-surface">{m.name}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${levelColor[m.level] ?? 'bg-support text-muted'}`}>
                    {m.level}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted">{m.handle}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">{m.desc}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {m.tags.map((t) => (
                    <span key={t} className="rounded-full border border-stroke px-2 py-0.5 text-[10px] text-muted">#{t}</span>
                  ))}
                </div>
                <p className="mt-3 text-xs font-semibold text-point">챌린지 {m.challengeCount}회 참여</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 최신 추천 영상 ────────────────────────────────────────
function LatestVideos() {
  const latest = videos.slice(0, 4)

  return (
    <section className="bg-support py-20 md:py-28">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Recommended</p>
            <h2 className="text-3xl font-extrabold text-on-surface md:text-4xl">이번 주 추천 영상</h2>
            <p className="mt-2 text-sm text-muted">드로잉타운이 선정한 현직 작가들의 유튜브 영상입니다.</p>
          </div>
          <Link to="/videos" className="text-sm font-semibold text-point hover:opacity-80 transition">
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {latest.map((v) => {
            const ch = channels.find((c) => c.id === v.channel)
            return (
              <a
                key={v.id}
                href={`https://youtube.com/watch?v=${v.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group card block"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-alt">
                  <img
                    src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                    alt={v.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 bg-black/25">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-point">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white">
                    {v.category}
                  </div>
                </div>
                <div className="p-4">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug text-on-surface transition group-hover:text-point">
                    {v.title}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="h-4 w-4 shrink-0 rounded-full"
                      style={{ background: ch?.gradient }}
                    />
                    <span className="text-xs font-medium text-muted truncate">{ch?.name}</span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Challenge CTA ─────────────────────────────────────────
function ChallengeBanner() {
  const active = challenges.find((c) => c.status === 'active')
  if (!active) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary via-surface to-secondary opacity-50" />
      <div className="relative mx-auto max-w-container section-x">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-point/10 px-3 py-1 text-xs font-bold text-point">
              🔥 진행 중인 챌린지
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface md:text-4xl">{active.title}</h2>
            <p className="max-w-md text-sm leading-relaxed text-muted">{active.desc}</p>
            <p className="text-xs font-medium text-muted">📅 {active.period} · 👥 {active.participants.toLocaleString()}명 참여 중</p>
          </div>
          <Link to="/challenge" className="btn-point shrink-0">
            챌린지 참여하기 →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── 참고 채널 소개 ─────────────────────────────────────────
function FeaturedChannels() {
  return (
    <section className="bg-surface-alt py-20 md:py-28">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Reference Channels</p>
            <h2 className="text-3xl font-extrabold text-on-surface md:text-4xl">참고 유튜브 채널</h2>
            <p className="mt-2 text-sm text-muted">드로잉타운이 선정한 현직 작가들의 유튜브 채널을 소개합니다.</p>
          </div>
          <Link to="/artists" className="text-sm font-semibold text-point hover:opacity-80 transition">
            전체 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {channels.map((ch) => (
            <a
              key={ch.id}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group card block p-0"
            >
              <div
                className="h-24 w-full"
                style={{ background: ch.gradient }}
              />
              <div className="p-5">
                <p className="font-bold text-on-surface group-hover:text-point transition">{ch.name}</p>
                <p className="mt-0.5 text-xs text-muted">{ch.handle}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">{ch.specialty}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {ch.tags.slice(0, 3).map((t) => (
                    <span key={t} className="rounded-full border border-stroke px-2 py-0.5 text-[10px] text-muted">#{t}</span>
                  ))}
                </div>
                <p className="mt-3 text-xs font-semibold text-point">영상 {ch.videoCount}개 수록 →</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Notices ───────────────────────────────────────────────
function NoticeList() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Community</p>
            <h2 className="text-3xl font-extrabold text-on-surface md:text-4xl">공지사항</h2>
          </div>
          <Link to="/community" className="text-sm font-semibold text-point hover:opacity-80 transition">
            전체 보기 →
          </Link>
        </div>

        <ul className="divide-y divide-stroke">
          {notices.map((n) => (
            <li key={n.id}>
              <Link
                to="/community"
                className="flex items-center justify-between gap-4 py-4 transition hover:text-point"
              >
                <div className="flex items-center gap-3">
                  <span className={[
                    'shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold',
                    n.category === '공지'   ? 'bg-primary text-on-surface' :
                    n.category === '챌린지' ? 'bg-secondary text-on-surface' :
                    n.category === '영상'   ? 'bg-point/10 text-point' :
                    'bg-support text-muted',
                  ].join(' ')}>
                    {n.category}
                  </span>
                  <span className="text-sm font-medium text-on-surface md:text-base">{n.title}</span>
                </div>
                <span className="shrink-0 text-xs text-muted">{n.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <LatestVideos />
      <ActiveMembers />
      <ChallengeBanner />
      <FeaturedChannels />
      <NoticeList />
    </>
  )
}
