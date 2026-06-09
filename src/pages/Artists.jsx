import { Link } from 'react-router-dom'
import { channels } from '../data/site'

function ChannelCard({ channel }) {
  return (
    <div className="card group overflow-hidden">
      {/* 커버 배너 */}
      <div
        className="h-28 w-full transition-transform duration-300 group-hover:scale-105"
        style={{ background: channel.gradient }}
      />

      <div className="flex flex-col gap-5 p-5 md:p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-extrabold text-on-surface">{channel.name}</h3>
              <p className="mt-0.5 text-sm text-muted">{channel.handle}</p>
            </div>
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[#FF0000] px-3 py-1.5 text-xs font-bold text-white transition hover:opacity-85"
            >
              <svg width="14" height="10" viewBox="0 0 28 20" fill="white">
                <path d="M27.9727 3.12C27.6435 1.89 26.6768 0.93 25.4468 0.6C23.2197 0 14.285 0 14.285 0S5.35 0 3.12 0.6C1.89 0.93 0.93 1.89 0.6 3.12C0 5.35 0 10 0 10S0 14.65 0.6 16.88C0.93 18.11 1.89 19.07 3.12 19.4C5.35 20 14.285 20 14.285 20S23.22 20 25.45 19.4C26.68 19.07 27.64 18.11 27.97 16.88C28.57 14.65 28.57 10 28.57 10S28.57 5.35 27.97 3.12Z" fill="#FF0000"/>
                <polygon fill="white" points="11.43,14.29 18.85,10 11.43,5.71"/>
              </svg>
              구독
            </a>
          </div>
          <span className="mt-2 inline-block rounded-full bg-primary/40 px-3 py-0.5 text-xs font-semibold text-on-surface">
            {channel.specialty.split(' · ')[0]}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-muted">{channel.desc}</p>

        <div className="flex flex-wrap gap-2">
          {channel.tags.map((t) => (
            <span key={t} className="rounded-full border border-stroke px-3 py-0.5 text-xs text-muted">
              #{t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-stroke pt-4">
          <span className="text-sm font-semibold text-on-surface">
            수록 영상 {channel.videoCount}개
          </span>
          <Link
            to={`/videos/${channel.id}`}
            className="btn-point text-sm"
          >
            영상 보기 →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Artists() {
  return (
    <div className="min-h-screen bg-surface">
      {/* 헤더 */}
      <div className="bg-support py-12 md:py-16">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Reference Channels</p>
          <h1 className="text-3xl font-extrabold text-on-surface md:text-4xl">참고 채널</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            드로잉타운이 선정한 현직 일러스트레이터들의 유튜브 채널입니다.
            멤버들이 함께 참고하며 공부하는 유튜브 채널들을 소개해요.
          </p>
        </div>
      </div>

      {/* 채널 그리드 */}
      <div className="mx-auto max-w-container section-x py-12 md:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {channels.map((ch) => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>
      </div>

      {/* 채널 추천 CTA */}
      <div className="bg-support py-16 text-center">
        <p className="mb-3 text-lg font-bold text-on-surface">좋은 채널을 발견했나요?</p>
        <p className="mb-8 text-sm text-muted">
          드로잉타운 멤버들에게 소개하고 싶은 채널이 있다면 제보해주세요.
        </p>
        <a
          href="mailto:hello@drawingtown.kr"
          className="btn-point"
        >
          채널 추천하기 →
        </a>
      </div>
    </div>
  )
}
