# Plan: TECHNOLOGIES 섹션 이미지 교체

## Context
현재 TECHNOLOGIES 카드 3개의 아이콘이 이모지(🐹, 🛠️, 🗄️)로 되어 있다.
Golang 관련 이미지로 교체하여 더 전문적인 느낌을 준다.

## 대상 파일
`/Users/WonjinSin/Documents/project/claude-code-toy/practice/index.html`

---

## 변경 계획

### 현재 상태
- Golang 카드: `🐹` 이모지
- APIs 카드: `🛠️` 이모지
- Databases 카드: `🗄️` 이모지

### 변경 방식
**Simple Icons CDN** `img` 태그 사용:
- `https://cdn.simpleicons.org/go/00ACD7` — Go 공식 로고 (파란색)
- `https://cdn.simpleicons.org/postgresql/336791` — PostgreSQL 로고
- `https://cdn.simpleicons.org/redis/FF4438` — Redis 로고

### 각 카드별 변경 내용
| 카드 | 현재 | 변경 후 |
|------|------|---------|
| Golang | `🐹` | Go 공식 로고 SVG (`cdn.simpleicons.org/go`) |
| APIs | `🛠️` | gRPC 로고 or Go 로고 흰배경 버전 |
| Databases | `🗄️` | PostgreSQL 로고 (`cdn.simpleicons.org/postgresql`) |

### 구현 방법
이모지 `<div class="text-5xl mb-4">🐹</div>` 를 아래로 교체:

```html
<div class="mb-4 w-14 h-14">
  <img src="https://cdn.simpleicons.org/go/00ACD7" alt="Go" class="w-full h-full object-contain" />
</div>
```

---

## Verification
1. `practice/index.html` 브라우저에서 열기
2. TECHNOLOGIES 섹션에서 3개 카드 이미지 로드 확인
3. 이미지가 카드 레이아웃 안에서 올바른 크기로 표시되는지 확인
