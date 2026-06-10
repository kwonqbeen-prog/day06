import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signUp } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) { setError('닉네임을 입력해주세요.'); return }
    if (form.password.length < 6) { setError('비밀번호는 6자 이상이어야 합니다.'); return }
    if (form.password !== form.confirm) { setError('비밀번호가 일치하지 않습니다.'); return }
    setLoading(true)
    const { error: err } = await signUp(form.email, form.password, form.name)
    setLoading(false)
    if (err) {
      if (err.message.includes('already')) setError('이미 사용 중인 이메일입니다.')
      else setError(err.message)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="text-center">
          <span className="text-5xl">🎨</span>
          <h2 className="mt-4 text-2xl font-extrabold text-on-surface">가입을 환영해요!</h2>
          <p className="mt-2 text-sm text-muted">
            {form.email}로 인증 메일을 발송했어요.
            <br />
            이메일 확인 후 로그인하세요.
          </p>
          <Link to="/login" className="btn-point mt-6 inline-block">
            로그인하러 가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-on-surface">회원가입</h1>
          <p className="mt-2 text-sm text-muted">드로잉타운 멤버가 되어보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="name">
              닉네임 <span className="text-point">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={set('name')}
              placeholder="닉네임 입력"
              required
              className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="email">
              이메일 <span className="text-point">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="이메일 주소 입력"
              required
              className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="pw">
              비밀번호 <span className="text-point">*</span>
            </label>
            <input
              id="pw"
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="6자 이상 입력"
              required
              className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="confirm">
              비밀번호 확인 <span className="text-point">*</span>
            </label>
            <input
              id="confirm"
              type="password"
              value={form.confirm}
              onChange={set('confirm')}
              placeholder="비밀번호 재입력"
              required
              className="rounded-xl border border-stroke bg-surface px-4 py-3 text-sm text-on-surface placeholder:text-muted focus:border-point focus:outline-none"
            />
          </div>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn-point w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? '처리 중...' : '회원가입'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-bold text-point hover:opacity-80">
            로그인
          </Link>
        </p>
      </div>
    </div>
  )
}
