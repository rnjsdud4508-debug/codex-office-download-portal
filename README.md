# Codex Office Download Portal

사무실에서 사용할 업무 프로그램 다운로드 포털입니다.

## 구조

- `index.html`
- `style.css`
- `main.js`
- `apps.json`
- `files/<app-slug>/...`

## 새 프로그램 추가 방법

1. `files/<app-slug>/` 폴더를 만듭니다.
2. `zip`, `exe`, `PDF` 등을 넣습니다.
3. `apps.json`에 카드 정보를 추가합니다.
4. `main` 브랜치에 push 합니다.

## 배포

GitHub Pages로 배포합니다.
