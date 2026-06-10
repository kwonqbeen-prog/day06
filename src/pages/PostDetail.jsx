import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function HeartIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [loadingPost, setLoadingPost] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [liking, setLiking] = useState(false)

  useEffect(() => {
    fetchAll()
  }, [id, user])

  async function fetchAll() {
    setLoadingPost(true)

    const [
      { data: postData },
      { data: commentData },
      { count: lc },
      { data: myLikeData },
    ] = await Promise.all([
      supabase
        .from('posts')
        .select('*, profiles(display_name, avatar_url)')
        .eq('id', id)
        .single(),
      supabase
        .from('comments')
        .select('*, profiles(display_name)')
        .eq('post_id', id)
        .order('created_at', { ascending: true }),
      supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', id),
      user
        ? supabase.from('likes').select('post_id').eq('post_id', id).eq('user_id', user.id).maybeSingle()
        : Promise.resolve({ data: null }),
    ])

    setPost(postData)
    setComments(commentData || [])
    setLikeCount(lc || 0)
    setLiked(!!myLikeData)
    setLoadingPost(false)
  }

  const toggleLike = async () => {
    if (!user) { navigate('/login', { state: { from: `/board/${id}` } }); return }
    if (liking) return
    setLiking(true)

    if (liked) {
      await supabase.from('likes').delete().eq('post_id', id).eq('user_id', user.id)
      setLiked(false)
      setLikeCount((c) => c - 1)
    } else {
      await supabase.from('likes').insert({ post_id: id, user_id: user.id })
      setLiked(true)
      setLikeCount((c) => c + 1)
    }
    setLiking(false)
  }

  const submitComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim() || submitting) return
    setSubmitting(true)

    const { data, error } = await supabase
      .from('comments')
      .insert({ post_id: id, user_id: user.id, content: commentText.trim() })
      .select('*, profiles(display_name)')
      .single()

    setSubmitting(false)
    if (!error) {
      setComments((prev) => [...prev, data])
      setCommentText('')
    }
  }

  const deleteComment = async (commentId) => {
    await supabase.from('comments').delete().eq('id', commentId)
    setComments((prev) => prev.filter((c) => c.id !== commentId))
  }

  const deletePost = async () => {
    if (!window.confirm('게시물을 삭제할까요?')) return
    await supabase.from('posts').delete().eq('id', id)
    navigate('/board', { replace: true })
  }

  if (loadingPost) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-sm text-muted">불러오는 중...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <div className="text-center">
          <p className="font-bold text-on-surface">게시물을 찾을 수 없습니다.</p>
          <Link to="/board" className="mt-4 inline-block text-sm text-point hover:opacity-80">
            ← 게시판으로
          </Link>
        </div>
      </div>
    )
  }

  const isAuthor = user?.id === post.user_id

  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-container section-x py-10 md:py-14">
        {/* 뒤로가기 */}
        <Link
          to="/board"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-on-surface"
        >
          ← 게시판으로
        </Link>

        {/* 게시물 본문 */}
        <article className="card p-6 md:p-8">
          <div className="mb-4 flex items-start justify-between gap-4">
            <h1 className="text-xl font-extrabold leading-snug text-on-surface md:text-2xl">
              {post.title}
            </h1>
            {isAuthor && (
              <button
                type="button"
                onClick={deletePost}
                className="shrink-0 rounded-lg border border-stroke px-3 py-1.5 text-xs text-muted transition hover:border-red-300 hover:text-red-500"
              >
                삭제
              </button>
            )}
          </div>

          <div className="mb-6 flex items-center gap-3 text-xs text-muted">
            <span className="font-semibold text-on-surface">
              {post.profiles?.display_name || '익명'}
            </span>
            <span>{formatDate(post.created_at)}</span>
          </div>

          <div className="prose-sm min-h-[8rem] whitespace-pre-wrap text-sm leading-relaxed text-on-surface">
            {post.content}
          </div>

          {post.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-1.5">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-stroke px-2.5 py-0.5 text-xs text-muted"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* 좋아요 */}
          <div className="mt-6 flex items-center border-t border-stroke pt-5">
            <button
              type="button"
              onClick={toggleLike}
              disabled={liking}
              className={[
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition',
                liked
                  ? 'border-point bg-point/5 text-point'
                  : 'border-stroke text-muted hover:border-point hover:text-point',
              ].join(' ')}
            >
              <HeartIcon filled={liked} />
              <span>{likeCount}</span>
            </button>
          </div>
        </article>

        {/* 댓글 */}
        <section className="mt-8">
          <h2 className="mb-4 text-base font-extrabold text-on-surface">
            댓글 <span className="font-normal text-muted">{comments.length}</span>
          </h2>

          {comments.length > 0 && (
            <ul className="mb-6 flex flex-col gap-3">
              {comments.map((c) => (
                <li key={c.id} className="card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2 text-xs">
                        <span className="font-bold text-on-surface">
                          {c.profiles?.display_name || '익명'}
                        </span>
                        <span className="text-muted">{formatDate(c.created_at)}</span>
                      </div>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-on-surface">
                        {c.content}
                      </p>
                    </div>
                    {user?.id === c.user_id && (
                      <button
                        type="button"
                        onClick={() => deleteComment(c.id)}
                        className="shrink-0 text-xs text-muted transition hover:text-red-500"
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* 댓글 작성 */}
          {user ? (
            <form onSubmit={submitComment} className="card p-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={3}
                placeholder="댓글을 입력해주세요..."
                className="w-full resize-none bg-transparent text-sm text-on-surface placeholder:text-muted focus:outline-none"
              />
              <div className="mt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={!commentText.trim() || submitting}
                  className="btn-point text-sm disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? '등록 중...' : '댓글 등록'}
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-xl border border-dashed border-stroke p-6 text-center">
              <p className="text-sm text-muted">
                댓글을 작성하려면{' '}
                <Link
                  to="/login"
                  state={{ from: `/board/${id}` }}
                  className="font-bold text-point hover:opacity-80"
                >
                  로그인
                </Link>
                이 필요합니다.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
