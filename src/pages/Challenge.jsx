import { Link } from 'react-router-dom'
import { challenges } from '../data/site'

function StatusBadge({ status }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-bold',
        status === 'active'
          ? 'bg-point/10 text-point'
          : 'bg-support text-muted',
      ].join(' ')}
    >
      {status === 'active' ? '🔥 진행 중' : '🕐 예정'}
    </span>
  )
}

function ChallengeCard({ challenge }) {
  return (
    <div className="card relative overflow-hidden">
      {/* 배경 그라데이션 */}
      <div
        className={`absolute inset-0 opacity-10 bg-gradient-to-br ${challenge.color}`}
        aria-hidden
      />

      <div className="relative flex flex-col gap-5 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <StatusBadge status={challenge.status} />
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted">드로잉타운 운영</span>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-extrabold text-on-surface md:text-2xl">{challenge.title}</h3>
          <p className="mt-1 text-sm font-medium text-muted">{challenge.subtitle}</p>
        </div>

        <p className="text-sm leading-relaxed text-muted">{challenge.desc}</p>

        <div className="flex flex-wrap gap-2">
          {challenge.tags.map((t) => (
            <span key={t} className="rounded-full border border-stroke px-3 py-0.5 text-xs text-muted">
              #{t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-stroke pt-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs text-muted">📅 {challenge.period}</span>
            {challenge.participants > 0 && (
              <span className="text-xs font-semibold text-point">
                👥 {challenge.participants.toLocaleString()}명 참여 중
              </span>
            )}
          </div>
          {challenge.status === 'active' && (
            <button
              type="button"
              className="btn-point text-sm"
            >
              지금 참여 →
            </button>
          )}
          {challenge.status === 'upcoming' && (
            <button
              type="button"
              className="btn-outline text-sm"
            >
              알림 받기
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function HowToJoin() {
  const steps = [
    { num: '01', title: '챌린지 선택', desc: '참여하고 싶은 챌린지를 골라 참여 버튼을 눌러보세요.' },
    { num: '02', title: '그림 그리기', desc: '주어진 주제나 조건에 맞춰 나만의 그림을 완성하세요.' },
    { num: '03', title: '해시태그 업로드', desc: '인스타그램에 #드로잉타운 해시태그와 함께 올려주세요.' },
    { num: '04', title: '피드백 받기', desc: '작가의 피드백과 함께 다른 참가자들의 작품을 감상하세요.' },
  ]

  return (
    <div className="bg-support py-16 md:py-20">
      <div className="mx-auto max-w-container section-x">
        <h2 className="mb-10 text-2xl font-extrabold text-on-surface md:text-3xl">참여 방법</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col gap-3">
              <span className="text-4xl font-extrabold text-primary-deep opacity-80">{s.num}</span>
              <h3 className="text-base font-bold text-on-surface">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Challenge({ tab }) {
  return (
    <div className="min-h-screen bg-surface">
      {/* 헤더 */}
      <div className="bg-support py-12 md:py-16">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Challenge</p>
          <h1 className="text-3xl font-extrabold text-on-surface md:text-4xl">챌린지</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            함께 그리고, 함께 성장해요. 드로잉타운 챌린지에 참여하고 작가에게 직접 피드백을 받아보세요.
          </p>
        </div>
      </div>

      {/* 챌린지 목록 */}
      <div className="mx-auto max-w-container section-x py-12 md:py-16">
        <div className="mb-8 flex gap-4">
          <Link
            to="/challenge"
            className={[
              'rounded-full border px-5 py-2 text-sm font-semibold transition',
              !tab ? 'bg-point text-white border-point' : 'border-stroke text-muted hover:bg-support',
            ].join(' ')}
          >
            진행 중 & 예정
          </Link>
          <Link
            to="/challenge/results"
            className={[
              'rounded-full border px-5 py-2 text-sm font-semibold transition',
              tab === 'results' ? 'bg-point text-white border-point' : 'border-stroke text-muted hover:bg-support',
            ].join(' ')}
          >
            챌린지 결과
          </Link>
        </div>

        {tab === 'results' ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <span className="text-5xl">🎨</span>
            <p className="text-lg font-bold text-on-surface">완료된 챌린지 결과가 곧 공개됩니다</p>
            <p className="text-sm text-muted">첫 번째 챌린지가 끝난 후 우수작을 발표할 예정입니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {challenges.map((c) => (
              <ChallengeCard key={c.id} challenge={c} />
            ))}
          </div>
        )}
      </div>

      <HowToJoin />
    </div>
  )
}
