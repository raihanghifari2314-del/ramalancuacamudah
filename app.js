// ============================================================
//  CuacaID — Main Application Logic
// ============================================================

let activeCityId = "jakarta";

// ── Clock & Date ─────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");
  document.getElementById("live-clock").textContent =
    `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli",
                  "Agustus","September","Oktober","November","Desember"];
  document.getElementById("live-date").textContent =
    `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}
setInterval(updateClock, 1000);
updateClock();

// ── City Pills ───────────────────────────────────────────────
function renderCityPills() {
  const container = document.getElementById("cityPills");
  container.innerHTML = CITIES.map(c => `
    <button class="city-pill ${c.id === activeCityId ? 'active' : ''}"
            data-city="${c.id}">
      <span class="pill-emoji">${c.emoji}</span>
      <span>${c.name}</span>
    </button>
  `).join("");

  container.querySelectorAll(".city-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCityId = btn.dataset.city;
      renderAll();
      // update pills
      container.querySelectorAll(".city-pill").forEach(b =>
        b.classList.toggle("active", b.dataset.city === activeCityId));
      // smooth scroll to main
      document.querySelector(".main-container").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// ── UV Index label ───────────────────────────────────────────
function uvLabel(uv) {
  if (uv <= 2)  return `${uv} Rendah`;
  if (uv <= 5)  return `${uv} Sedang`;
  if (uv <= 7)  return `${uv} Tinggi`;
  if (uv <= 10) return `${uv} Sangat Tinggi`;
  return `${uv} Ekstrem`;
}

// ── AQI label & color ────────────────────────────────────────
function aqiInfo(aqi) {
  if (aqi <= 50)  return { label: "Baik 🟢",        color: "#4caf50", pct: (aqi/300)*100 };
  if (aqi <= 100) return { label: "Sedang 🟡",       color: "#ffeb3b", pct: (aqi/300)*100 };
  if (aqi <= 150) return { label: "Tidak Sehat 🟠",  color: "#ff9800", pct: (aqi/300)*100 };
  if (aqi <= 200) return { label: "Sangat Tidak Sehat 🔴", color: "#f44336", pct: (aqi/300)*100 };
  return { label: "Berbahaya ☣️", color: "#9c27b0", pct: (aqi/300)*100 };
}

// ── Render Current Card ──────────────────────────────────────
function renderCurrent(city, data) {
  const cond = CONDITIONS[data.current.condition];
  document.getElementById("currentCity").textContent    = city.name;
  document.getElementById("currentProvince").textContent = city.province;
  document.getElementById("currentTemp").textContent    = `${data.current.temp}°C`;
  document.getElementById("currentDesc").textContent    = cond.label;
  document.getElementById("currentFeel").textContent    = `${data.current.feel}°C`;
  document.getElementById("currentIcon").textContent    = cond.icon;
  document.getElementById("statHumidity").textContent   = `${data.current.humidity}%`;
  document.getElementById("statWind").textContent       = `${data.current.wind} km/h`;
  document.getElementById("statVis").textContent        = `${data.current.visibility} km`;
  document.getElementById("statPressure").textContent   = `${data.current.pressure} hPa`;
  document.getElementById("statUV").textContent         = uvLabel(data.current.uv);
  document.getElementById("statRain").textContent       = `${data.current.rain} mm`;

  // Update card background class
  const card = document.getElementById("currentCard");
  card.className = `current-card bg-${cond.bg}`;
}

// ── Render Hourly ────────────────────────────────────────────
function renderHourly(data) {
  const el = document.getElementById("hourlyScroll");
  el.innerHTML = data.hourly.map(h => `
    <div class="hourly-item">
      <div class="hourly-time">${h.hour}</div>
      <div class="hourly-icon">${h.icon}</div>
      <div class="hourly-temp">${h.temp}°</div>
      <div class="hourly-rain-bar">
        <div class="hourly-rain-fill" style="height:${h.rain}%"></div>
      </div>
      <div class="hourly-rain-pct">${h.rain}%</div>
    </div>
  `).join("");
}

// ── Render Daily ─────────────────────────────────────────────
function renderDaily(data) {
  const labels = getDayLabels();
  const el = document.getElementById("dailyGrid");
  el.innerHTML = data.daily.map((d, i) => {
    const cond = CONDITIONS[d.condition];
    const rainW = Math.max(4, d.rain);
    return `
      <div class="daily-item ${i === 0 ? 'today' : ''}">
        <div class="daily-day">
          <span class="daily-short">${labels[i].short}</span>
          <span class="daily-full">${labels[i].full}</span>
        </div>
        <div class="daily-icon">${cond.icon}</div>
        <div class="daily-desc">${cond.label}</div>
        <div class="daily-temp-range">
          <span class="temp-high">${d.high}°</span>
          <div class="temp-bar-wrap">
            <div class="temp-bar">
              <div class="temp-fill" style="width:${Math.round(((d.high - d.low) / 20) * 100)}%"></div>
            </div>
          </div>
          <span class="temp-low">${d.low}°</span>
        </div>
        <div class="daily-meta">
          <span class="meta-rain">💧 ${d.rain}%</span>
          <span class="meta-wind">🌬️ ${d.wind} km/h</span>
        </div>
      </div>
    `;
  }).join("");
}

// ── Render Info Cards ────────────────────────────────────────
function renderInfoCards(data) {
  // Sunrise / Sunset
  document.getElementById("infoSunrise").textContent = data.current.sunrise;
  document.getElementById("infoSunset").textContent  = data.current.sunset;

  // Compute sun progress: rough pct of day (sunrise to sunset)
  const now = new Date();
  const totalMins = (17*60+58) - (5*60+49); // approx
  const elapsed   = (now.getHours()*60+now.getMinutes()) - (5*60+49);
  const pct       = Math.min(100, Math.max(0, (elapsed / totalMins) * 100));
  document.getElementById("sunProgress").style.width = `${pct}%`;
  document.getElementById("sunDot").style.left = `${pct}%`;

  // AQI
  const ai = aqiInfo(data.current.aqi);
  document.getElementById("aqiValue").textContent = data.current.aqi;
  document.getElementById("aqiLabel").textContent  = ai.label;
  document.getElementById("aqiFill").style.width   = `${Math.min(100, ai.pct)}%`;
  document.getElementById("aqiFill").style.background = ai.color;

  // Moon
  const moon = data.moon;
  document.getElementById("moonIcon").textContent  = moon.phase;
  document.getElementById("moonName").textContent  = moon.name;
  document.getElementById("moonIllum").textContent = `${moon.illum}%`;
}

// ── Render City Overview ─────────────────────────────────────
function renderCityOverview() {
  const el = document.getElementById("cityOverviewGrid");
  el.innerHTML = CITIES.map(c => {
    const d    = FORECAST_DATA[c.id];
    const cond = CONDITIONS[d.current.condition];
    const isActive = c.id === activeCityId;
    return `
      <div class="city-ov-card ${isActive ? 'active' : ''} bg-${cond.bg}"
           data-city="${c.id}" role="button" tabindex="0">
        <div class="ov-top">
          <span class="ov-emoji">${c.emoji}</span>
          <span class="ov-name">${c.name}</span>
          ${isActive ? '<span class="ov-badge">Dipilih</span>' : ''}
        </div>
        <div class="ov-icon">${cond.icon}</div>
        <div class="ov-temp">${d.current.temp}°C</div>
        <div class="ov-desc">${cond.label}</div>
        <div class="ov-meta">
          <span>💧 ${d.current.humidity}%</span>
          <span>🌬️ ${d.current.wind} km/h</span>
        </div>
      </div>
    `;
  }).join("");

  el.querySelectorAll(".city-ov-card").forEach(card => {
    const handler = () => {
      activeCityId = card.dataset.city;
      renderAll();
      document.getElementById("currentCard").scrollIntoView({ behavior: "smooth", block: "start" });
    };
    card.addEventListener("click", handler);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") handler(); });
  });
}

// ── Master Render ────────────────────────────────────────────
function renderAll() {
  const city = CITIES.find(c => c.id === activeCityId);
  const data = FORECAST_DATA[activeCityId];

  renderCurrent(city, data);
  renderHourly(data);
  renderDaily(data);
  renderInfoCards(data);
  renderCityOverview();

  // Update city pills
  document.querySelectorAll(".city-pill").forEach(b =>
    b.classList.toggle("active", b.dataset.city === activeCityId));
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderCityPills();
  renderAll();
});
