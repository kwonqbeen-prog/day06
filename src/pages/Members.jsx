import { Link, useParams } from 'react-router-dom'
import { members, posts } from '../data/site'
import MemberImage from '../components/MemberImage'

const LEVEL_COLOR = {
  '초급': 'bg-primary/50 text-on-surface',
  '중급': 'bg-secondary/60 text-on-surface',
  '고급': 'bg-point/10 text-point',
}

// ── 멤버 목록 ─────────────────────────────────────────────────
function MemberCard({ member }) {
  const count = posts.filter((p) => p.memberId === member.id).length
  return (
    <Link to={`/members/${member.id}`} className="card group block p-0 overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <MemberImage
          member={member}
          className="h-full w-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-white">{member.name}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${LEVEL_COLOR[member.level] ?? 'bg-support text-muted'}`}>
              {member.level}
            </span>
          </div>
          <p className="text-xs text-white/80">{member.handle}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs leading-relaxed text-muted line-clamp-2">{member.desc}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {member.tags.map((t) => (
            <span key={t} className="rounded-full border border-stroke px-2 py-0.5 text-[10px] text-muted">
              #{t}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-stroke pt-3 text-xs">
          <span className="font-semibold text-point">챌린지 {member.challengeCount}회 참여</span>
          <span className="text-muted">게시물 {count}개</span>
        </div>
      </div>
    </Link>
  )
}

function MemberList() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-support py-12 md:py-16">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Members</p>
          <h1 className="text-3xl font-extrabold text-on-surface md:text-4xl">멤버 목록</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            드로잉타운 챌린지에 참여 중인 멤버들을 만나보세요. 각 멤버의 게시물과 성장 스토리를 확인할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-container section-x py-12 md:py-16">
        <div className="mb-8 flex items-center justify-between">
          <p className="text-sm text-muted">총 {members.length}명이 활동 중입니다.</p>
          <Link to="/members/post" className="btn-point text-sm">
            게시물 작성 →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {members.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── 멤버 개별 프로필 ────────────────────────────────────────────
function PostCard({ post }) {
  return (
    <div className="card p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-bold text-on-surface md:text-lg leading-snug">{post.title}</h3>
        <span className="shrink-0 text-xs text-muted">{post.date}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-3">{post.content}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <span key={t} className="rounded-full border border-stroke px-2.5 py-0.5 text-[11px] text-muted">
            #{t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-5 border-t border-stroke pt-4 text-xs text-muted">
        <span>❤️ {post.likes}</span>
        <span>💬 {post.comments}</span>
      </div>
    </div>
  )
}

function MemberProfile({ id }) {
  const member = members.find((m) => m.id === id)

  if (!member) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <p className="text-lg font-bold text-on-surface">멤버를 찾을 수 없습니다.</p>
          <Link to="/members" className="mt-4 inline-block text-sm font-semibold text-point hover:opacity-80">
            ← 멤버 목록으로
          </Link>
        </div>
      </div>
    )
  }

  const memberPosts = posts.filter((p) => p.memberId === id)

  return (
    <div className="min-h-screen bg-surface">
      {/* 배너 + 프로필 */}
      <div className="relative overflow-hidden">
        <div className="h-48 w-full md:h-64" style={{ background: member.gradient }} />
        <div className="mx-auto max-w-container section-x">
          <div className="relative -mt-16 flex flex-col gap-4 pb-8 md:-mt-20 md:flex-row md:items-end md:gap-6">
            {/* 프로필 이미지 */}
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl shadow-lg ring-4 ring-surface md:h-40 md:w-40">
              <MemberImage member={member} className="h-full w-full" />
            </div>

            {/* 프로필 정보 */}
            <div className="flex flex-col gap-2 pb-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl font-extrabold text-on-surface md:text-3xl">{member.name}</h1>
                <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${LEVEL_COLOR[member.level] ?? 'bg-support text-muted'}`}>
                  {member.level}
                </span>
              </div>
              <p className="text-sm font-semibold text-muted">{member.handle}</p>
              <p className="max-w-lg text-sm leading-relaxed text-muted">{member.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {member.tags.map((t) => (
                  <span key={t} className="rounded-full border border-stroke px-3 py-0.5 text-xs text-muted">
                    #{t}
                  </span>
                ))}
              </div>
              <p className="text-xs font-semibold text-point">
                챌린지 {member.challengeCount}회 참여 · 게시물 {memberPosts.length}개
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 게시물 목록 */}
      <div className="mx-auto max-w-container section-x py-10 md:py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-on-surface">{member.name}의 게시물</h2>
          <Link to="/members/post" className="btn-point text-sm">
            게시물 작성 →
          </Link>
        </div>

        {memberPosts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <span className="text-5xl">✏️</span>
            <p className="font-bold text-on-surface">아직 게시물이 없어요</p>
            <Link to="/members/post" className="text-sm text-point hover:opacity-80">
              첫 게시물 작성하기 →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {memberPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}

        <div className="mt-8 border-t border-stroke pt-8">
          <Link to="/members" className="text-sm font-semibold text-muted transition hover:text-on-surface">
            ← 멤버 목록으로
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Members() {
  const { id } = useParams()
  return id ? <MemberProfile id={id} /> : <MemberList />
}
