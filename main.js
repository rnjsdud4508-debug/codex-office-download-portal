async function loadApps() {
  const response = await fetch("./apps.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("프로그램 목록을 불러오지 못했습니다.");
  }
  return response.json();
}

function createTagChip(label) {
  const span = document.createElement("span");
  span.className = "tag-chip";
  span.textContent = label;
  return span;
}

function createDownloadLink(download) {
  const anchor = document.createElement("a");
  anchor.className = "download-link";
  anchor.href = download.href;
  anchor.download = "";
  anchor.innerHTML = `
    <span>${download.label}</span>
    <span class="download-kind">${download.kind}</span>
  `;
  return anchor;
}

function renderCards(apps) {
  const grid = document.getElementById("app-grid");
  const countBadge = document.getElementById("app-count");
  const template = document.getElementById("app-card-template");

  grid.innerHTML = "";
  countBadge.textContent = `${apps.length}개 프로그램`;

  if (!apps.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "조건에 맞는 프로그램이 없습니다.";
    grid.appendChild(empty);
    return;
  }

  apps.forEach((app) => {
    const node = template.content.firstElementChild.cloneNode(true);

    node.querySelector(".app-category").textContent = app.category;
    node.querySelector(".app-title").textContent = app.title;
    node.querySelector(".app-subtitle").textContent = app.subtitle;
    node.querySelector(".app-status").textContent = app.status;
    node.querySelector(".meta-version").textContent = `버전 ${app.version}`;
    node.querySelector(".meta-date").textContent = `업데이트 ${app.updated}`;
    node.querySelector(".app-summary").textContent = app.summary;

    const tagList = node.querySelector(".tag-list");
    app.tags.forEach((tag) => tagList.appendChild(createTagChip(tag)));

    const downloadList = node.querySelector(".download-list");
    app.downloads.forEach((download) => {
      downloadList.appendChild(createDownloadLink(download));
    });

    const noteList = node.querySelector(".note-list");
    app.notes.forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note;
      noteList.appendChild(li);
    });

    grid.appendChild(node);
  });
}

function makeSearchableText(app) {
  return [
    app.title,
    app.subtitle,
    app.summary,
    app.category,
    ...(app.tags || []),
    ...(app.notes || []),
  ]
    .join(" ")
    .toLowerCase();
}

function setupSearch(apps) {
  const input = document.getElementById("app-search");
  input.addEventListener("input", () => {
    const keyword = input.value.trim().toLowerCase();
    if (!keyword) {
      renderCards(apps);
      return;
    }
    const filtered = apps.filter((app) => makeSearchableText(app).includes(keyword));
    renderCards(filtered);
  });
}

async function main() {
  try {
    const apps = await loadApps();
    renderCards(apps);
    setupSearch(apps);
  } catch (error) {
    const grid = document.getElementById("app-grid");
    grid.innerHTML = `<div class="empty-state">${error.message}</div>`;
  }
}

main();
