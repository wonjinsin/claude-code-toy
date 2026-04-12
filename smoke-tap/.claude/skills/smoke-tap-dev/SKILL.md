---
name: smoke-tap-dev
description: "Smoke Tap iOS 앱 개발 오케스트레이터. 기능 추가, 네이티브 통합, 빌드, 배포, 위젯, 디자인 수정, 버그 수정 등 모든 개발 작업을 조율한다. '기능', '화면', '위젯', '빌드', '설치', '수정', '추가', '고쳐줘', '만들어줘', '업데이트', '다시', '네이티브', 'Swift', 'prebuild' 키워드 시 사용. 후속 작업: 결과 수정, 부분 재실행, 이전 결과 개선 요청 시에도 사용."
---

# Smoke Tap Dev Orchestrator

Smoke Tap iOS 앱의 전문가 풀을 조율하여 개발 작업을 수행하는 오케스트레이터.

## 실행 모드: 서브 에이전트

## 에이전트 구성

| 에이전트 | subagent_type | 역할 | 스킬 | 호출 조건 |
|---------|--------------|------|------|----------|
| feature-dev | feature-dev | RN/TS 기능 개발 | feature-dev | 화면, 컴포넌트, 상태 관리, UI |
| native-bridge | native-bridge | iOS 네이티브 통합 | native-bridge | Swift, 위젯, Config Plugin, 네이티브 모듈 |
| build-deploy | build-deploy | 빌드/배포 | build-deploy | 빌드, 설치, 기기 테스트 |

## 워크플로우

### Phase 0: 컨텍스트 확인

1. `_workspace/` 존재 여부 확인
2. 실행 모드 결정:
   - `_workspace/` 미존재 → 초기 실행. Phase 1 진행
   - `_workspace/` 존재 + 부분 수정 요청 → 해당 에이전트만 재호출
   - `_workspace/` 존재 + 새 입력 → `_workspace/`를 `_workspace_{timestamp}/`로 이동 후 Phase 1

### Phase 1: 요청 분류

사용자 요청을 분석하여 전문가를 선택한다:

| 키워드/패턴 | 전문가 | 예시 |
|-----------|--------|------|
| 화면, 컴포넌트, 상태, store, 탭, UI, 디자인, 스타일 | feature-dev | "통계 화면에 월간 차트 추가해줘" |
| Swift, 위젯, widget, 네이티브, config plugin, App Groups, pbxproj | native-bridge | "위젯에서 탭이 앱에 반영안돼" |
| 빌드, build, 설치, install, 기기, device, prebuild, run | build-deploy | "iPhone에 설치해줘" |
| 복합 (기능 + 네이티브) | feature-dev → native-bridge 순차 | "위젯에서 데이터 동기화 추가" |
| 복합 (모든 변경 + 빌드) | 해당 전문가 → build-deploy 마무리 | "기능 추가하고 빌드해줘" |

### Phase 2: 전문가 호출

단일 전문가 작업:
```
Agent(
  description: "{작업 요약}",
  subagent_type: "{agent-name}",
  model: "opus",
  prompt: "{사용자 요청 + 프로젝트 컨텍스트}"
)
```

복합 작업 (순차):
```
1. Agent(subagent_type: "feature-dev", ...) → JS 코드 작성
2. Agent(subagent_type: "native-bridge", ...) → 네이티브 코드 작성
3. Agent(subagent_type: "build-deploy", ...) → 빌드/배포
```

병렬 가능 작업:
```
Agent(subagent_type: "feature-dev", run_in_background: true, ...)
Agent(subagent_type: "native-bridge", run_in_background: true, ...)
→ 결과 수집 후 → Agent(subagent_type: "build-deploy", ...)
```

### Phase 3: 결과 통합

1. 에이전트 반환값 수집
2. 변경된 파일 목록 정리
3. 빌드 필요 여부 판단
4. 사용자에게 결과 요약 보고

## 데이터 흐름

```
[사용자 요청]
    ↓ 분류
[오케스트레이터] → Agent(feature-dev)    → 코드 변경
              → Agent(native-bridge)  → 네이티브 변경
              → Agent(build-deploy)   → 빌드/설치
    ↓ 통합
[결과 보고]
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| 전문가 1개 실패 | 에러 메시지를 분석하고 1회 재시도 |
| 재시도 실패 | 사용자에게 에러 보고, 수동 개입 요청 |
| 분류 불확실 | 가장 관련성 높은 전문가를 호출하되, 실패 시 다른 전문가 시도 |
| 복합 작업 중간 실패 | 완료된 단계까지의 결과를 보존하고 실패 단계부터 재시도 |

## 테스트 시나리오

### 정상 흐름
1. 사용자: "통계 화면에 월간 요약 카드를 추가해줘"
2. Phase 1: feature-dev로 분류
3. Phase 2: feature-dev 에이전트 호출
4. Phase 3: 변경 파일 목록 + 요약 보고
5. 예상: `app/(tabs)/stats.tsx` 수정, 새 컴포넌트 생성

### 에러 흐름
1. 사용자: "위젯 탭이 앱에 반영안돼"
2. Phase 1: native-bridge로 분류
3. Phase 2: native-bridge 에이전트 호출 → Swift 컴파일 에러
4. 에러 분석 후 native-bridge 재호출 (수정된 프롬프트)
5. 재시도 성공 → build-deploy로 빌드 확인
