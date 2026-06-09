import { Link } from 'react-router-dom'

export default function SimplePage({ title }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 bg-surface py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-3xl">
        🎨
      </div>
      <h1 className="text-3xl font-extrabold text-on-surface">{title}</h1>
      <p className="max-w-sm text-sm leading-relaxed text-muted">
        이 페이지는 준비 중입니다. <br />
        곧 업데이트될 예정입니다.
      </p>
      <Link to="/" className="btn-point">
        홈으로 돌아가기
      </Link>
    </div>
  )
}
