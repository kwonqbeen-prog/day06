import { useState } from 'react'
import { Link } from 'react-router-dom'
import { members } from '../data/site'

export default function MemberPost() {
  const [form, setForm] = useState({ memberId: '', title: '', content: '', tags: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.memberId) errs.memberId = '멤버를 선택해주세요.'
    if (!form.title.trim()) errs.title = '제목을 입력해주세요.'
    if (!form.content.trim()) errs.content = '내용을 입력해주세요.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-4 p-8 text-center">
          <span className="text-6xl">🎨</span>
          <h2 className="text-2xl font-extrabold text-on-surface">게시물이 등록됐어요!</h2>
          <p className="text-sm text-muted">멤버 프로필에서 확인할 수 있어요.</p>
          <div className="mt-2 flex gap-3">
            <Link to={`/members/${form.memberId}`} className="btn-point">
              내 게시물 보기
            </Link>
            <button
              type="button"
              onClick={() => { setForm({ memberId: '', title: '', content: '', tags: '' }); setSubmitted(false) }}
              className="btn-outline"
            >
              새 게시물 작성
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-support py-12 md:py-16">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Members</p>
          <h1 className="text-3xl font-extrabold text-on-surface md:text-4xl">게시물 작성</h1>
          <p className="mt-3 text-sm text-muted">
            나의 드로잉 과정과 완성작을 멤버들과 공유해요.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-container section-x py-12 md:py-16">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-6">
          {/* 멤버 선택 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="memberId">
              멤버 선택 <span className="text-point">*</span>
            </label>
            <select
              id="memberId"
              value={form.memberId}
              onChange={set('memberId')}
              className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface focus:border-point focus:outline-none"
            >
              <option value="">멤버를 선택해주세요</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.handle})
                </option>
              ))}
            </select>
            {errors.memberId && <p className="text-xs text-red-500">{errors.memberId}</p>}
          </div>

          {/* 제목 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="title">
              제목 <span className="text-point">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="게시물 제목을 입력해주세요"
              value={form.title}
              onChange={set('title')}
              className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          {/* 내용 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="content">
              내용 <span className="text-point">*</span>
            </label>
            <textarea
              id="content"
              rows={6}
              placeholder="오늘의 드로잉 과정이나 완성작에 대한 이야기를 써주세요..."
              value={form.content}
              onChange={set('content')}
              className="resize-none rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
            {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
          </div>

          {/* 태그 */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="tags">
              태그 <span className="font-normal text-muted">(쉼표로 구분)</span>
            </label>
            <input
              id="tags"
              type="text"
              placeholder="예: 챌린지, 수채화, 드로잉"
              value={form.tags}
              onChange={set('tags')}
              className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
          </div>

          {/* 이미지 업로드 안내 */}
          <div className="rounded-xl border border-dashed border-stroke bg-support p-6 text-center">
            <p className="text-sm font-semibold text-on-surface">📷 이미지 첨부</p>
            <p className="mt-1 text-xs text-muted">이미지 업로드 기능은 준비 중입니다.</p>
          </div>

          {/* 제출 버튼 */}
          <div className="flex items-center gap-3 border-t border-stroke pt-4">
            <button type="submit" className="btn-point">
              게시물 등록 →
            </button>
            <Link to="/members" className="btn-outline">
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
