import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function BoardWrite() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', content: '', tags: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.title.trim()) errs.title = '제목을 입력해주세요.'
    if (!form.content.trim()) errs.content = '내용을 입력해주세요.'
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setLoading(true)
    setSubmitError('')

    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const { data, error } = await supabase.from('posts').insert({
      user_id: user.id,
      title: form.title.trim(),
      content: form.content.trim(),
      tags,
    }).select('id').single()

    setLoading(false)

    if (error) {
      setSubmitError('게시물 등록 중 오류가 발생했습니다. 다시 시도해주세요.')
    } else {
      navigate(`/board/${data.id}`, { replace: true })
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-support py-12 md:py-16">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Board</p>
          <h1 className="text-3xl font-extrabold text-on-surface md:text-4xl">글쓰기</h1>
          <p className="mt-3 text-sm text-muted">나의 드로잉 과정과 완성작을 멤버들과 공유해요.</p>
        </div>
      </div>

      <div className="mx-auto max-w-container section-x py-12 md:py-16">
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="title">
              제목 <span className="text-point">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={set('title')}
              placeholder="게시물 제목을 입력해주세요"
              className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="content">
              내용 <span className="text-point">*</span>
            </label>
            <textarea
              id="content"
              rows={10}
              value={form.content}
              onChange={set('content')}
              placeholder="오늘의 드로잉 과정이나 완성작에 대한 이야기를 써주세요..."
              className="resize-none rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
            {errors.content && <p className="text-xs text-red-500">{errors.content}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="tags">
              태그 <span className="font-normal text-muted">(쉼표로 구분)</span>
            </label>
            <input
              id="tags"
              type="text"
              value={form.tags}
              onChange={set('tags')}
              placeholder="예: 챌린지, 수채화, 드로잉"
              className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
          </div>

          {submitError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{submitError}</p>
          )}

          <div className="flex items-center gap-3 border-t border-stroke pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-point disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? '등록 중...' : '게시물 등록 →'}
            </button>
            <Link to="/board" className="btn-outline">
              취소
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
