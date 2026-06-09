// ============================================================
// 드로잉타운 — 전역 데이터
// ============================================================

export const company = {
  name: '드로잉타운',
  nameEn: 'DrawingTown',
  tagline: '그림 그리는 즐거움을 나눠요',
  desc: '예비 일러스트레이터와 인스타툰 작가를 위한 드로잉 학습 커뮤니티. 현직 작가들의 유튜브 영상을 모아 소개하고, 챌린지와 스터디로 함께 성장해요.',
  email: 'hello@drawingtown.kr',
  instagram: 'https://instagram.com/drawingtown_kr',
  youtube: 'https://youtube.com/@drawingtown',
  copyright: '© 2026 드로잉타운 All rights reserved.',
  footerLinks: [
    { label: '이용약관', to: '/terms' },
    { label: '개인정보처리방침', to: '/privacy', strong: true },
    { label: '문의하기', to: '/support' },
  ],
}

export const nav = [
  {
    label: '추천 영상',
    to: '/videos',
    children: [
      { label: '전체 영상', to: '/videos' },
      { label: 'Studio MEI', to: '/videos/mei' },
      { label: 'illustrator윰마', to: '/videos/yumma' },
      { label: '은지 Eunji', to: '/videos/eunji' },
    ],
  },
  {
    label: '멤버',
    to: '/members',
    children: [
      { label: '멤버 목록', to: '/members' },
      { label: '게시물 작성', to: '/members/post' },
    ],
  },
  {
    label: '참고 채널',
    to: '/artists',
    children: [
      { label: '채널 목록', to: '/artists' },
    ],
  },
  {
    label: '챌린지',
    to: '/challenge',
    children: [
      { label: '진행 중인 챌린지', to: '/challenge' },
      { label: '챌린지 결과', to: '/challenge/results' },
    ],
  },
  {
    label: '커뮤니티',
    to: '/community',
    children: [
      { label: '공지사항', to: '/community' },
      { label: '작품 갤러리', to: '/community/gallery' },
    ],
  },
  {
    label: '고객센터',
    to: '/support',
    children: [
      { label: 'FAQ', to: '/support' },
      { label: '문의하기', to: '/support/contact' },
    ],
  },
]

// 팔레트 정보
export const PALETTES = [
  { id: '1', name: '드림',  colors: ['#D7BFFF', '#FFB8F0'] },
  { id: '2', name: '코튼',  colors: ['#B8DEFF', '#FFD6E8'] },
  { id: '3', name: '민트',  colors: ['#B8FFE4', '#C8B8FF'] },
  { id: '4', name: '피치',  colors: ['#FFD9B8', '#FFB8D9'] },
  { id: '5', name: '로즈',  colors: ['#FFB8C8', '#D7BFFF'] },
]

// ── 참고 유튜브 채널 ──────────────────────────────────────────
export const channels = [
  {
    id: 'mei',
    name: 'Studio MEI',
    nameKo: '스튜디오 메이',
    handle: '@Studiomeidesign',
    url: 'https://www.youtube.com/@Studiomeidesign',
    specialty: 'Adobe Illustrator · Photoshop · Procreate',
    desc: '경험을 공유하고 함께 성장해요. Adobe Illustrator, Photoshop, Procreate 스킬과 기능을 다양하고 예쁜 아트워크로 배울 수 있는 채널입니다.',
    tags: ['일러스트레이터', '포토샵', '프로크리에이트', '디지털툴'],
    gradient: 'linear-gradient(135deg, #D7BFFF 0%, #9747FF 100%)',
    videoCount: 6,
  },
  {
    id: 'yumma',
    name: 'illustrator윰마',
    nameKo: 'illustrator윰마',
    handle: '@illustrator',
    url: 'https://www.youtube.com/@illustrator',
    specialty: '타임랩스 · 힐링 일러스트 · 초보자 튜토리얼',
    desc: '아름다운 섬 제주도에서 그림을 그리는 일러스트레이터 윰마. 초보자를 위한 그림 튜토리얼과 힐링 타임랩스 영상을 올립니다.',
    tags: ['타임랩스', '힐링', '초보자', '제주'],
    gradient: 'linear-gradient(135deg, #FFD9B8 0%, #FFB8F0 100%)',
    videoCount: 6,
  },
  {
    id: 'eunji',
    name: '은지 Eunji Illustration',
    nameKo: '은지',
    handle: '@Eunji.illustration',
    url: 'https://www.youtube.com/@Eunji.illustration',
    specialty: '창작 커리어 · 작업 과정 · 일러스트레이터 성장',
    desc: '지속 가능한 창작자 커리어에 대해 이야기합니다. 캐나다에서 그림 그리며 사는 일러스트레이터의 작업과정, 커리어 노하우, 일상을 공유합니다.',
    tags: ['커리어', '작업과정', '성장', '프리랜서'],
    gradient: 'linear-gradient(135deg, #B8FFE4 0%, #B8DEFF 100%)',
    videoCount: 6,
  },
]

// ── 챌린지 참여 중인 드로잉타운 멤버들 (가상) ────────────────────
export const members = [
  {
    id: 'suzy',
    name: '수지',
    handle: '@suzy_draws',
    level: '중급',
    desc: '캐릭터 일러스트를 연습 중인 예비 인스타툰 작가. 드로잉타운 챌린지 개근 중.',
    challengeCount: 3,
    gradient: 'linear-gradient(135deg, #D7BFFF 0%, #FFB8F0 100%)',
    tags: ['캐릭터', '인스타툰'],
  },
  {
    id: 'minha',
    name: '민하',
    handle: '@minha_watercolor',
    level: '초급',
    desc: '수채화에 입문한 지 6개월 차. 꽃과 자연을 그리는 게 취미. 매일 드로잉 실천 중.',
    challengeCount: 2,
    gradient: 'linear-gradient(135deg, #B8DEFF 0%, #D7BFFF 100%)',
    tags: ['수채화', '자연'],
  },
  {
    id: 'jino',
    name: '지노',
    handle: '@jino_digital',
    level: '고급',
    desc: '클립스튜디오로 판타지 캐릭터를 그리는 디지털 아티스트. 챌린지 우수 참가자.',
    challengeCount: 5,
    gradient: 'linear-gradient(135deg, #2D1B69 0%, #7C3AED 60%, #D7BFFF 100%)',
    tags: ['디지털', '판타지'],
  },
  {
    id: 'areum',
    name: '아름',
    handle: '@areum_goods',
    level: '중급',
    desc: '내 그림으로 굿즈를 만드는 게 꿈. 아크릴 키링 제작을 준비하며 열심히 그리는 중.',
    challengeCount: 4,
    gradient: 'linear-gradient(135deg, #FFD9B8 0%, #FFB8D9 100%)',
    tags: ['굿즈', '캐릭터'],
  },
]

// ── 추천 유튜브 영상 (실제 영상 ID) ──────────────────────────────
export const videos = [
  // Studio MEI
  {
    id: 1,
    title: '어도비 일러스트레이터 Tiff 파일을 사용한 텍스쳐 테크닉',
    channel: 'mei',
    youtubeId: 'qgPqEygLlwI',
    date: '2026.05',
    category: '일러스트레이터',
  },
  {
    id: 2,
    title: '스캐너 없이 손그림을 프로 퀄리티로 — 배경 투명하게 디지털 변환',
    channel: 'mei',
    youtubeId: 'uob243wJQRA',
    date: '2026.04',
    category: '포토샵',
  },
  {
    id: 3,
    title: '포토샵 AI로 프로모션 워크플로우 따라하기',
    channel: 'mei',
    youtubeId: 'PyfVAquiJCE',
    date: '2026.04',
    category: '포토샵',
  },
  {
    id: 4,
    title: '일러스트레이션 메이킹 리뷰 — 시골쥐는 왜 자동차를 타게 되었는가?',
    channel: 'mei',
    youtubeId: 'v6DM2bI60JY',
    date: '2026.03',
    category: '메이킹',
  },
  {
    id: 5,
    title: '선을 빠르고 쉽게 부드럽게 — Smooth Tool 사용법 (초보)',
    channel: 'mei',
    youtubeId: 'Uy6tJzycV-c',
    date: '2026.03',
    category: '일러스트레이터',
  },
  {
    id: 6,
    title: '투명도 패널의 모든 것 — 불투명도 마스크부터 녹아웃 그룹까지',
    channel: 'mei',
    youtubeId: 'epTHt7c6nD4',
    date: '2026.02',
    category: '일러스트레이터',
  },
  // illustrator윰마
  {
    id: 7,
    title: '15년간 칩거하며 그림을 그리며 얻은 것과 잃은 것',
    channel: 'yumma',
    youtubeId: 'bh5H5mrMU-I',
    date: '2026.05',
    category: '브이로그',
  },
  {
    id: 8,
    title: '힐링영상 — 아이패드로 그리는 색연필 일러스트 타임랩스',
    channel: 'yumma',
    youtubeId: 'cJnf0m4ImrM',
    date: '2026.05',
    category: '타임랩스',
  },
  {
    id: 9,
    title: '강아지랑 제주도에서 스냅촬영한 이유 / 제주 여행 추천',
    channel: 'yumma',
    youtubeId: 'HYzVKoQbTho',
    date: '2026.04',
    category: '브이로그',
  },
  {
    id: 10,
    title: '학연·지연 없이 일러스트레이터가 되는 방법',
    channel: 'yumma',
    youtubeId: 'f6Qz9FlwMwM',
    date: '2026.04',
    category: '커리어',
  },
  {
    id: 11,
    title: '6박 7일 방콕여행 브이로그 — 방콕을 왜 이제야 갔지?',
    channel: 'yumma',
    youtubeId: 'SFSRyGItpsM',
    date: '2026.03',
    category: '브이로그',
  },
  {
    id: 12,
    title: '무기력·우울·슬럼프에서 다시 일어서는 나의 이야기',
    channel: 'yumma',
    youtubeId: '4IKICd3j0_w',
    date: '2026.03',
    category: '커리어',
  },
  // 은지 Eunji
  {
    id: 13,
    title: '그림책 작업 문의부터 출간까지 — 외주받는 일러스트레이터 되기',
    channel: 'eunji',
    youtubeId: '6ilbboYbWV8',
    date: '2026.05',
    category: '커리어',
  },
  {
    id: 14,
    title: '공유오피스 한 달 써본 리얼 후기 — 데스크 투어 브이로그',
    channel: 'eunji',
    youtubeId: 'XdMAfrag2-s',
    date: '2026.05',
    category: '브이로그',
  },
  {
    id: 15,
    title: '그림 실력과 인스타 성장을 한번에 — 21데이 드로잉 클럽',
    channel: 'eunji',
    youtubeId: '4BBcpzbyspY',
    date: '2026.04',
    category: '성장',
  },
  {
    id: 16,
    title: '나만의 그림체는 어떻게 만들어질까? 다 따라했는데도 내 것 같지 않다면',
    channel: 'eunji',
    youtubeId: 'fD0Jh7OndDE',
    date: '2026.04',
    category: '성장',
  },
  {
    id: 17,
    title: '일러스트 계정 팔로워 급상승했던 4가지 방법',
    channel: 'eunji',
    youtubeId: '20y0mDLLG1c',
    date: '2026.03',
    category: '인스타그램',
  },
  {
    id: 18,
    title: '그림은 예쁜데 왜 외주가 안 들어올까?',
    channel: 'eunji',
    youtubeId: '_QXuvcWd29I',
    date: '2026.03',
    category: '커리어',
  },
]

// 챌린지 프로그램
export const challenges = [
  {
    id: 'c1',
    title: '30일 드로잉 챌린지',
    subtitle: '매일 하나씩, 한 달 완주',
    desc: '하루 10분, 30가지 주제를 따라 그리며 드로잉 습관을 만들어보세요. 참여자 전원에게 수료 배지를 드립니다.',
    period: '2026.06.01 ~ 2026.06.30',
    participants: 1240,
    status: 'active',
    tags: ['입문', '매일드로잉', '습관'],
    color: 'from-primary to-secondary',
  },
  {
    id: 'c2',
    title: '인물 드로잉 챌린지',
    subtitle: '표정과 감정을 담는 캐릭터',
    desc: '다양한 표정과 포즈의 인물을 그려보는 2주 챌린지. 참가자끼리 서로 피드백을 주고받아요.',
    period: '2026.06.15 ~ 2026.06.28',
    participants: 874,
    status: 'active',
    tags: ['인물', '표정', '중급'],
    color: 'from-secondary to-primary',
  },
  {
    id: 'c3',
    title: '굿즈 아이디어 챌린지',
    subtitle: '내 그림으로 굿즈 기획하기',
    desc: '내 캐릭터나 그림을 활용한 굿즈 아이디어를 기획하고 공유해보세요. 우수작에게는 굿즈 제작 지원 혜택을 드립니다.',
    period: '2026.07.01 ~ 2026.07.14',
    participants: 0,
    status: 'upcoming',
    tags: ['굿즈', '기획', '공모'],
    color: 'from-[#FFD9B8] to-[#FFB8D9]',
  },
]

// 멤버 게시물
export const posts = [
  {
    id: 1,
    memberId: 'suzy',
    title: '30일 챌린지 5일차 — 눈 그리기 연습',
    content: '오늘은 Studio MEI 영상 보고 눈 그리기 연습을 했어요. 처음보다 훨씬 나아지고 있는 것 같아서 뿌듯해요! 눈 밑 그림자 표현이 아직 어렵지만 매일 조금씩 개선되는 게 느껴져요.',
    tags: ['챌린지', '눈그리기', '연습'],
    date: '2026.06.05',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    memberId: 'minha',
    title: '수채화 장미 완성 🌹',
    content: 'illustrator윰마 채널 힐링 타임랩스 보고 따라 그렸어요. 수채화 번짐이 생각보다 잘 됐어요! 물 조절이 가장 어려운데 이번엔 비교적 성공한 것 같습니다.',
    tags: ['수채화', '장미', '힐링'],
    date: '2026.06.04',
    likes: 31,
    comments: 12,
  },
  {
    id: 3,
    memberId: 'jino',
    title: '판타지 캐릭터 채색 과정 공유',
    content: '클립스튜디오 라이팅 기법 영상 보고 빛과 그림자 연습해봤습니다. 완성도가 많이 올랐어요. 광원 위치에 따라 분위기가 완전히 달라지는 게 재미있어요.',
    tags: ['디지털', '채색', '판타지'],
    date: '2026.06.03',
    likes: 47,
    comments: 15,
  },
  {
    id: 4,
    memberId: 'areum',
    title: '첫 번째 아크릴 키링 시안 완성!',
    content: '드디어 굿즈 디자인 파일 완성했어요! 은지 Eunji 영상 보고 외주 준비도 시작하려고요. 사이즈는 5cm 예정이고, 색상은 아직 고민 중이에요.',
    tags: ['굿즈', '키링', '디자인'],
    date: '2026.06.02',
    likes: 38,
    comments: 20,
  },
  {
    id: 5,
    memberId: 'suzy',
    title: '인스타툰 첫 컷 드로잉 완료 ✏️',
    content: '인스타툰 구성법 영상 보고 드디어 첫 컷을 완성했어요. 아직 어색하지만 계속 올릴 예정이에요. 고양이 캐릭터 이름은 "솜이"로 정했답니다!',
    tags: ['인스타툰', '캐릭터', '챌린지'],
    date: '2026.06.01',
    likes: 56,
    comments: 23,
  },
  {
    id: 6,
    memberId: 'jino',
    title: '클립스튜디오 브러시 세팅 공유',
    content: '브러시 커스터마이징 영상 보고 제 브러시 세팅을 정리해봤어요. 디지털 특유의 딱딱한 느낌 없애는 데 많이 도움이 됐어요. 필요하신 분들 댓글 달아주세요!',
    tags: ['클립스튜디오', '브러시', '팁'],
    date: '2026.05.30',
    likes: 62,
    comments: 31,
  },
  {
    id: 7,
    memberId: 'minha',
    title: '봄꽃 수채화 스케치 🌸',
    content: '은지 Eunji님 영상에서 힌트를 얻어 봄꽃 드로잉 연습을 했어요. 매일 조금씩 느는 것 같아 기뻐요! 스케치북 한 권이 꽉 찰 때까지 계속 그릴 예정이에요.',
    tags: ['수채화', '스케치', '봄'],
    date: '2026.05.28',
    likes: 44,
    comments: 17,
  },
  {
    id: 8,
    memberId: 'areum',
    title: '굿즈 색상 시안 — 어떤 색이 좋을까요?',
    content: '키링 색상을 골라야 하는데 고민이 많아요. 파스텔 핑크 vs 라벤더 중에 어떤 게 더 예쁠까요? 댓글로 의견 주시면 정말 감사할 것 같아요 🎨',
    tags: ['굿즈', '투표', '색상'],
    date: '2026.05.26',
    likes: 52,
    comments: 28,
  },
]

// 커뮤니티 공지
export const notices = [
  { id: 9, title: '드로잉타운 그랜드 오픈 기념 이벤트 안내', date: '2026.06.01', category: '공지' },
  { id: 8, title: '6월 30일 드로잉 챌린지 참여 방법 안내', date: '2026.05.30', category: '챌린지' },
  { id: 7, title: 'Studio MEI · 은지 Eunji 채널 신규 영상 추가', date: '2026.05.25', category: '영상' },
  { id: 6, title: '5월 챌린지 우수 참가자 발표', date: '2026.05.20', category: '챌린지' },
  { id: 5, title: '[공지] 사이트 이용약관 및 개인정보방침 안내', date: '2026.05.15', category: '공지' },
]
