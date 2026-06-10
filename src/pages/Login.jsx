import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function KakaoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 3C11.163 3 4 8.952 4 16.3c0 4.634 2.852 8.702 7.148 11.16L9.5 34.5l8.05-5.248A20.093 20.093 0 0 0 20 29.6c8.837 0 16-5.952 16-13.3S28.837 3 20 3z"
        fill="#191919"
      />
    </svg>
  )
}

export default function Login() {
  const { signIn, signInWithKakao } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error: err } = await signIn(form.email, form.password)
    setLoading(false)
    if (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    } else {
      navigate(from, { replace: true })
    }
  }

  const handleKakao = async () => {
    setError('')
    const { error: err } = await signInWithKakao()
    if (err) setError('카카오 로그인 중 오류가 발생했습니다.')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-extrabold text-on-surface">로그인</h1>
          <p className="mt-2 text-sm text-muted">드로잉타운에 오신 걸 환영해요!</p>
        </div>

        {/* 카카오 로그인 */}
        <button
          type="button"
          onClick={handleKakao}
          className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl bg-[#FEE500] py-3 text-sm font-bold text-[#191919] transition hover:brightness-95"
        >
          <KakaoIcon />
          카카오 계정으로 로그인
        </button>

        <div className="relative mb-4 flex items-center">
          <div className="flex-1 border-t border-stroke" />
          <span className="mx-3 text-xs text-muted">또는 이메일로 로그인</span>
          <div className="flex-1 border-t border-stroke" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-on-surface" htmlFor="email">
              이메일
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
            <label className="text-sm font-bold text-on-surface" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={set('password')}
              placeholder="비밀번호 입력"
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
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          아직 계정이 없으신가요?{' '}
          <Link to="/signup" className="font-bold text-point hover:opacity-80">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  )
}
