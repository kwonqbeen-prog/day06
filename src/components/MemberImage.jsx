import { useState } from 'react'

// 멤버 프로필 이미지 — 이미지 없으면 그라데이션으로 폴백
export default function MemberImage({ member, className }) {
  const [err, setErr] = useState(false)
  if (err) {
    return <div className={className} style={{ background: member.gradient }} />
  }
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/members/${member.id}.jpg`}
      alt={member.name}
      className={`object-cover object-top ${className}`}
      onError={() => setErr(true)}
    />
  )
}
