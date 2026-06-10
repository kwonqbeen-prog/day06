import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function formatDate(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
}

function PostRow({ post }) {
  return (
    <li className="border-b border-stroke last:border-0">
      <Link
        to={`/board/${post.id}`}
        className="flex items-center justify-between gap-4 py-4 transition hover:text-point"
      >
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-on-surface md:text-base">
              {post.title}
            </span>
            {post.comment_count > 0 && (
              <span className="shrink-0 text-xs font-bold text-point">
                [{post.comment_count}]
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{post.profiles?.display_name || '익명'}</span>
            <span>❤️ {post.like_count}</span>
          </div>
        </div>
        <span className="shrink-0 text-xs text-muted">{formatDate(post.created_at)}</span>
      </Link>
    </li>
  )
}

const PAGE_SIZE = 15

export default function Board() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchPosts()
  }, [page])

  async function fetchPosts() {
    setLoading(true)
    const from = page * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const { data, count, error } = await supabase
      .from('posts')
      .select('id, title, created_at, user_id, profiles(display_name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) { setLoading(false); return }

    const postIds = (data || []).map((p) => p.id)

    const [{ data: likeCounts }, { data: commentCounts }] = await Promise.all([
      supabase.from('likes').select('post_id').in('post_id', postIds),
      supabase.from('comments').select('post_id').in('post_id', postIds),
    ])

    const likeMap = {}
    const commentMap = {}
    ;(likeCounts || []).forEach((l) => { likeMap[l.post_id] = (likeMap[l.post_id] || 0) + 1 })
    ;(commentCounts || []).forEach((c) => { commentMap[c.post_id] = (commentMap[c.post_id] || 0) + 1 })

    const enriched = (data || []).map((p) => ({
      ...p,
      like_count: likeMap[p.id] || 0,
      comment_count: commentMap[p.id] || 0,
    }))

    setPosts(enriched)
    setTotal(count || 0)
    setLoading(false)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="min-h-screen bg-surface">
      <div className="bg-support py-12 md:py-16">
        <div className="mx-auto max-w-container section-x">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted">Board</p>
          <h1 className="text-3xl font-extrabold text-on-surface md:text-4xl">자유 게시판</h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            드로잉 과정, 완성작, 자유 주제로 멤버들과 이야기를 나눠요.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-container section-x py-10 md:py-14">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted">전체 {total}개</p>
          {user ? (
            <Link to="/board/write" className="btn-point text-sm">
              글쓰기 →
            </Link>
          ) : (
            <Link to="/login" state={{ from: '/board/write' }} className="btn-outline text-sm">
              로그인 후 글쓰기
            </Link>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-muted">불러오는 중...</div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <span className="text-5xl">✏️</span>
            <p className="font-bold text-on-surface">아직 게시물이 없어요</p>
            {user ? (
              <Link to="/board/write" className="text-sm text-point hover:opacity-80">
                첫 게시물 작성하기 →
              </Link>
            ) : (
              <Link to="/login" className="text-sm text-point hover:opacity-80">
                로그인하고 첫 게시물 작성하기 →
              </Link>
            )}
          </div>
        ) : (
          <>
            <ul>
              {posts.map((p) => (
                <PostRow key={p.id} post={p} />
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i)}
                    className={[
                      'h-9 w-9 rounded-lg text-sm font-semibold transition',
                      page === i
                        ? 'bg-point text-white'
                        : 'border border-stroke text-muted hover:bg-support',
                    ].join(' ')}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
