// Data - Limited to 5-6 items per category for compact display
  const dashboardData = {
    "📊 L2 Duty": [
        { title: "Ameyo", url: "https:///ameyoapp.wlink.com.np:8443/app/" },
        { title: "Phone Support Discord", url: "https://discord.com/channels/782909936568238080/1015432484361605160" },
        { title: "Csupport", url: "https://csupport.wlink.com.np" },
        { title: "Retail Billing", url: "https://retail-billing.wlink.com.np" },
        { title: "Ebill", url: "https://ebill.wlink.com.np" },
        { title: "NETTV Dashboard", url: "https://nettv.wlink.com.np/" },
        { title: "Nagios OLT", url: "http://nagios-olt-01.wlink.com.np/nagios" },
        { title: "Nagios Power OLT", url: "http://nagios-olt-pwr-01.wlink.com.np/nagios" },
        { title: "FTTH", url: "https://ftth.wlink.com.np" },
        { title: "QCP Dashboard", url: "https://fa-tracking.wlink.com.np/qcp/dashboard/" },
        { title: "Outage Notification System (ONS)", url: "https://outage.wlink.com.np" },
        { title: "Task Manager", url: "https://tm.wlink.com.np" },
        { title: "Task Ticket", url: "https://tt.wlink.com.np" }
    ],
    "💻 RM Duty": [
        { title: "Csupport", url: "https://csupport.wlink.com.np" },
        { title: "Outage Notification System (ONS)", url: "https://outage.wlink.com.np" },
        { title: "FTTH", url: "https://ftth.wlink.com.np" },
        { title: "Nagios OLT", url: "http://nagios-olt-01.wlink.com.np/nagios" },
        { title: "Nagios Power OLT", url: "http://nagios-olt-pwr-01.wlink.com.np/nagios" },
        { title: "FTTH OLT List", url: "https://ftth.wlink.com.np/olt/oltDetails" },
        { title: "RM Code Repository (Backend)", url: "https://repo.example.com/rm/backend-repo" },
        { title: "ONS Template Documentation", url: "https://docs.google.com/document/d/1dO-KX84naX6kQ0oufY2Sd-sIZwwsQXyy9mk0e5AegBM/" },
        { title: "RM Team Calendar", url: "https://calendar.example.com/rm" },
        { title: "MPLS Nagios", url: "http://nagios-mpls-01.wlink.com.np/nagios" },
        { title: "RM Bug Triage Board", url: "https://jira.example.com/rm-bugs" },
        { title: "Outage Notification System (ONS)", url: "https://outage.wlink.com.np" },
        { title: "Task Manager", url: "https://tm.wlink.com.np" }
    ],
    "🎨 L2 Report": [
        { title: "ViPeR Home Template", url: "https://outage.bjkarn.com.np/" },
        { title: "Ticket Monitoring (Power BI)", url: "https://powerbi.wlink.com.np/reports/powerbi/Worldlink%20Communications%20Ltd./SUPPORT%20DASHBOARD/TICKET%20MONITORING" },
        { title: "Monitoring Report (Google Sheet)", url: "https://docs.google.com/spreadsheets/d/1RqFlhRPyOlp0Vjn-Z3WG4mxTrSZGAuf-Q5tg81zgUDA/" },
        { title: "Call Center (Power BI)", url: "https://powerbi.wlink.com.np/reports/powerbi/Worldlink%20Communications%20Ltd./SUPPORT%20DASHBOARD/CALL%20CENTER" },
        { title: "Daily KPI Report (Excel File)", url: "https://worldlinknepal-my.sharepoint.com/:x:/r/personal/rabindra_maharjan_worldlink_com_np1/_layouts/15/doc2.aspx?sourcedoc=%7B5FA2692F-4373-4FFF-AE7A-F5DD7153A8A8%7D&file=Daily%20KPI%20Report%20.xlsx&fromShare=true&action=default&mobileredirect=true" },
        { title: "Daily KPI Report (Kalash KPI Report)", url: "https://docs.google.com/spreadsheets/d/1N-MV9iaRVi-_ywz8siKiqbEVDhnDogre6u8ypnV9eho/edit" },
        { title: "Daily KPI Report (Kalash ABN Report)", url: "https://docs.google.com/spreadsheets/d/1qqDSasmwCz43WVoGtWapRnlhLhEG3VR0LUT4jvQYp90/edit" },
        { title: "Incident Report (Punit Dai)", url: "https://worldlinknepal-my.sharepoint.com/:x:/g/personal/punit_manandhar_worldlink_com_np/IQB5x9dKv00MRJIYPVbnvNbUAZRefW_hC017Sua98gory0w?e=hWeNr5" },
        { title: "Overall Report (Punit Dai)", url: "https://docs.google.com/spreadsheets/d/1Gm3Lj6poTCHlOIPnhEphQt7zNG00heUobmcebKl0Do4/edit?gid=80733323#gid=80733323&range=S5" },
        { title: "ViPer L2 Report Sample", url: "https://docs.google.com/spreadsheets/d/1FXtTiBDxrloxL2fj7HhZZwxx17Fz3rEW_GDjSnPjSfs/edit?gid=1681147737#gid=1681147737&range=I1" },
        { title: "Nepali Calendar", url: "https://nepalicalendar.rat32.com" }
    ],
    "🧪 RM Report": [
        { title: "ViPeR Home Template", url: "https://outage.bjkarn.com.np/" },
        { title: "Outage Notification System (ONS)", url: "https://outage.wlink.com.np" },
        { title: "Outage Summary Report (Solved)", url: "https://outage.wlink.com.np/report/outageReport" },
        { title: "ONS Unresolved Report (Unresolved))", url: "https://outage.wlink.com.np/report/activeOutageReport" },
        { title: "Monitoring Report (Google Sheet)", url: "https://docs.google.com/spreadsheets/d/1RqFlhRPyOlp0Vjn-Z3WG4mxTrSZGAuf-Q5tg81zgUDA/" },
        { title: "Nepali Calendar", url: "https://nepalicalendar.rat32.com" }
    ],
    "📈 All Graph": [
        { title: "Upstream(US) Links", url: "https://ctrl-01.wlink.com.np/admin/m/Upstream-Links.html" },
        { title: "IPT Links", url: "https://ctrl-01.wlink.com.np/admin/m/IPT-Links.html" },
        { title: "Bharti International Singapore Ltd. Upstream Links Traffic", url: "https://ctrl-01.wlink.com.np/admin/m/Individual-Airtel-Link.html" },
        { title: "Google Global Cache [GGC] Traffic", url: "https://ctrl-01.wlink.com.np/admin/m/ggc-traffic.html" },
        { title: "Facebook Cache Traffic", url: "https://ctrl-01.wlink.com.np/admin/m/facebook-traffic.html" },
        { title: "Akamai Cache Traffic", url: "https://ctrl-01.wlink.com.np/admin/m/akamai-traffic.html" },
        { title: "CDN [Akamai Cloudflare Netflix Wangsu] Traffic", url: "https://ctrl-01.wlink.com.np/admin/m/cdn-traffic.html" },
        { title: "Worldlink BRAS Traffic", url: "https://ctrl-01.wlink.com.np/admin/m/bras-traffic.html" },
        { title: "Worldlink Total Traffic", url: "https://ctrl-01.wlink.com.np/admin/m/total-traffic.html" },
        { title: "Nimble Traffic", url: "https://ctrl-01.wlink.com.np/admin/m/nimble.html" },
        { title: "OLT IV Graph", url: "https://xen-cacti-03.wlink.com.np/cacti/graph_view.php?action=preview" },
        { title: "OLT OV Graph", url: "https://cacti-lnet-01.wlink.com.np/cacti/graph_view.php?action=preview" },
        { title: "Graph Admin Link ", url: "https://ctrl.wlink.com.np/admin/" },
        { title: "Nepali Calendar", url: "https://nepalicalendar.rat32.com" }
    ],
    "📄 Other Links": [
        { title: "WorldLink Site", url: "https://worldlink.com.np" },
        { title: "WorldLink Customer Portal", url: "https://customer-portal.worldlink.com.np" },
        { title: "WorldLink Epayment Portal", url: "https://epayment.worldlink.com.np/new" },
        { title: "KPI Dashboard", url: "https://kpi-dashboard.wlink.com.np/" },
        { title: "Online Payment Dashboard", url: "https://onlinepaymentdashboard.wlink.com.np/" },
        { title: "Global Report", url: "https://reports.wlink.com.np" },
        { title: "Power BI Report", url: "https://powerbi.wlink.com.np/reports" },
        { title: "Branch Report", url: "https://branchreports.wlink.com.np" },
        { title: "RIGO HRIS", url: "https://hris.wlink.com.np" },
        { title: "Nimble HRMS", url: "https://hrms.wlink.com.np" },
        { title: "MPLS Nagios", url: "http://nagios-mpls-01.wlink.com.np/nagios" },
        { title: "SMS Cast", url: "https://smscast.wlink.com.np" },
        { title: "Confluence", url: "https://confluence.wlink.com.np" },
        { title: "CRM 360", url: "https://crm360.wlink.com.np" },
        { title: "Corteca Stage Dashboard", url: "https://homecontroller-nwcc-stage.apps.wlink.com.np/" },
        { title: "Auditor Dashboard", url: "https://auditor-dashboard.wlink.com.np" },
        { title: "Refer Offer Dashboard", url: "https://refer-offer.wlink.com.np" },
        { title: "DEPARTMENTWISE CONTACT DETAILS", url: "https://goo.gl/To7mNp?" },

    ]
  };



  // --- SAFETY: ensure dashboardData exists ---
if (typeof dashboardData === "undefined") {
  console.error("dashboardData is missing. Using empty fallback.");
  window.dashboardData = {};
}

// --- Icons ---
const categoryIcons = {
  "📊 L2 Duty": { icon: "fa-clipboard-list", color: "bg-purple-600" },
  "💻 RM Duty": { icon: "fa-desktop", color: "bg-blue-600" },
  "🎨 L2 Report": { icon: "fa-chart-bar", color: "bg-emerald-600" },
  "🧪 RM Report": { icon: "fa-vial", color: "bg-rose-600" },
  "📈 All Graph": { icon: "fa-chart-line", color: "bg-amber-600" },
  "📄 Other Links": { icon: "fa-link", color: "bg-slate-600" }
};

let currentCategory = "";
let pendingOpenLinks = [];

// Safe backup
let originalDashboardData = JSON.parse(JSON.stringify(dashboardData));

// --- Toast ---
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  const icon = document.getElementById("toastIcon");
  const msg = document.getElementById("toastMessage");

  msg.textContent = message;
  icon.className =
    type === "error"
      ? "fas fa-exclamation-triangle text-red-400"
      : "fas fa-check-circle text-green-400";

  toast.classList.remove("opacity-0", "translate-y-4");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-4");
  }, 2000);
}

// --- Render Dashboard ---
function renderDashboard(filteredData = null) {
  const container = document.getElementById("dashboardLinks");
  if (!container) return;

  container.innerHTML = "";

  const data = filteredData || dashboardData;

  Object.entries(data).forEach(([category, links]) => {
    const icon = categoryIcons[category] || {
      icon: "fa-folder",
      color: "bg-slate-600"
    };

    const card = document.createElement("div");
    card.className =
      "category-card bg-slate-800/30 rounded-xl border border-slate-700/50 p-4 flex flex-col";

    card.innerHTML = `
      <div class="flex items-center gap-3 mb-3">
        <div class="w-10 h-10 rounded-lg ${icon.color} flex items-center justify-center">
          <i class="fas ${icon.icon} text-white"></i>
        </div>
        <div>
          <h3 class="font-bold text-white">${category}</h3>
          <p class="text-xs text-gray-400">${links.length} links</p>
        </div>
      </div>

      <div class="space-y-2 flex-1">
        ${links.slice(0, 3).map(link => `
          <a href="${link.url}" target="_blank"
            class="block p-2 bg-slate-900/50 hover:bg-slate-900 rounded text-sm">
            ${link.title}
          </a>
        `).join("")}
      </div>

      <div class="flex gap-2 mt-4">
        <button class="view-btn flex-1 bg-slate-700 py-2 rounded"
          data-category="${category}">View</button>

        <button class="open-all-btn flex-1 bg-purple-600 py-2 rounded"
          data-category="${category}">Open All</button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach events
  document.querySelectorAll(".open-all-btn").forEach(btn => {
    btn.onclick = () => openAllLinks(btn.dataset.category);
  });

  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.onclick = () => openCategoryModal(btn.dataset.category);
  });
}

// --- Modal ---
function openCategoryModal(category) {
  const modal = document.getElementById("viewModal");
  const body = document.getElementById("modalBody");

  if (!modal || !body) return;

  const links = dashboardData[category] || [];

  body.innerHTML = links.map(link => `
    <div class="p-2 border-b border-slate-700">
      <a href="${link.url}" target="_blank">${link.title}</a>
    </div>
  `).join("");

  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("viewModal");
  if (modal) modal.classList.add("hidden");
}

// --- Open all ---
function openAllLinks(category) {
  const links = dashboardData[category] || [];

  if (!links.length) {
    showToast("No links", "error");
    return;
  }

  links.forEach((l, i) => {
    setTimeout(() => window.open(l.url, "_blank"), i * 150);
  });

  showToast(`Opened ${links.length} links`);
}

// --- Search ---
function filterLinks() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const term = input.value.toLowerCase();

  if (!term) {
    renderDashboard();
    return;
  }

  const filtered = {};

  Object.entries(originalDashboardData).forEach(([cat, links]) => {
    const matches = links.filter(l =>
      l.title.toLowerCase().includes(term) ||
      l.url.toLowerCase().includes(term)
    );

    if (matches.length) filtered[cat] = matches;
  });

  renderDashboard(filtered);
}

// --- Init ---
document.addEventListener("DOMContentLoaded", () => {
  console.log("ViPeR Dashboard initialized");

  // SHOW dashboard (fixes your main issue)
  const main = document.getElementById("mainDashboard");
  if (main) main.classList.add("visible");

  renderDashboard();

  // Search
  const search = document.getElementById("searchInput");
  if (search) search.addEventListener("input", filterLinks);

  // Close modal
  const closeBtn = document.getElementById("closeModalBtn");
  if (closeBtn) closeBtn.onclick = closeModal;

  showToast("Dashboard loaded");
});