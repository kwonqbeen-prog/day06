import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'

import Home from './pages/Home'
import Videos from './pages/Videos'
import Artists from './pages/Artists'
import Challenge from './pages/Challenge'
import Community from './pages/Community'
import Members from './pages/Members'
import MemberPost from './pages/MemberPost'
import Board from './pages/Board'
import BoardWrite from './pages/BoardWrite'
import PostDetail from './pages/PostDetail'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SimplePage from './pages/SimplePage'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <div className="min-w-[320px] bg-surface">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/videos/:artist" element={<Videos />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/post" element={<MemberPost />} />
          <Route path="/members/:id" element={<Members />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/challenge/results" element={<Challenge tab="results" />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/gallery" element={<Community tab="gallery" />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:id" element={<PostDetail />} />
          <Route
            path="/board/write"
            element={
              <PrivateRoute>
                <BoardWrite />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/support" element={<SimplePage title="고객센터" />} />
          <Route path="/support/contact" element={<SimplePage title="문의하기" />} />
          <Route path="/terms" element={<SimplePage title="이용약관" />} />
          <Route path="/privacy" element={<SimplePage title="개인정보처리방침" />} />
          <Route path="*" element={<SimplePage title="페이지를 찾을 수 없습니다" />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
