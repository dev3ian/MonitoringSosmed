const platformViews = {
  instagram: [
    200, 400, 500, 600, 800, 1200, 1500, 1800, 2000, 2200, 2400, 2600, 2700,
    2900, 3100, 3300, 3500, 3700, 3900, 4000, 4200, 4300, 4400, 4600, 4800,
    4900, 5100, 5300, 5500, 5700, 5900,
  ],
  tiktok: [
    400, 800, 1000, 1200, 1400, 1800, 2200, 2500, 2700, 3000, 3300, 3500, 3700,
    3900, 4000, 4200, 4400, 4600, 4800, 5000, 5200, 5300, 5500, 5700, 5900,
    6100, 6300, 6500, 6700, 6900,
  ],
  facebook: [
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400,
    1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600,
    2700, 2800,
  ],
  youtube: [
    800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000, 3200,
    3400, 3600, 3800, 4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600,
    5800, 6000, 6200, 6400, 6600,
  ],
};

// Update views and total views in the summary
function updateSummaryViews() {
  const totalViews = Object.values(platformViews).reduce(
    (total, views) => total + views.at(-1),
    0
  );

  // Update individual platform views
  document.getElementById("instagram-views").textContent =
    platformViews.instagram.at(-1);
  document.getElementById("tiktok-views").textContent =
    platformViews.tiktok.at(-1);
  document.getElementById("facebook-views").textContent =
    platformViews.facebook.at(-1);
  document.getElementById("youtube-views").textContent =
    platformViews.youtube.at(-1);

  // Update total views
  document.getElementById("total-views").textContent = totalViews;
}

// Calculate growth percentage
function calculateGrowth(data) {
  if (data.length < 2) return 0;
  const previous = data[data.length - 2];
  const latest = data.at(-1);
  return (((latest - previous) / previous) * 100).toFixed(2);
}

// Update summary table with views and growth percentage
function updateSummaryTable() {
  const platforms = ["instagram", "tiktok", "facebook", "youtube"];
  let totalGrowth = 0;

  platforms.forEach((platform) => {
    const growth = calculateGrowth(platformViews[platform]);
    document.getElementById(`${platform}-views-summary`).textContent =
      platformViews[platform].at(-1);
    document.getElementById(`${platform}-growth`).textContent = `${growth}%`;
    totalGrowth += parseFloat(growth);
  });

  // Update total growth (average growth across platforms)
  document.getElementById("total-growth").textContent =
    (totalGrowth / platforms.length).toFixed(2) + "%";
}

// Display the chart for views
function displayViewsChart() {
  const ctx = document.getElementById("views-chart").getContext("2d");

  // Days per 5-day interval, with the last day of the month included
  const daysInDecember = Array.from(
    { length: 6 },
    (_, i) => `Dec ${i * 5 + 1}`
  );
  daysInDecember.push("Dec 31"); // Add the final day (31st December)

  new Chart(ctx, {
    type: "line",
    data: {
      labels: daysInDecember,
      datasets: [
        {
          label: "Instagram",
          data: platformViews.instagram
            .filter((_, index) => index % 5 === 0)
            .concat([platformViews.instagram.at(-1)]),
          borderColor: "#E1306C",
          backgroundColor: "rgba(225,48,108,0.2)",
          borderWidth: 2,
        },
        {
          label: "TikTok",
          data: platformViews.tiktok
            .filter((_, index) => index % 5 === 0)
            .concat([platformViews.tiktok.at(-1)]),
          borderColor: "#69C9D0",
          backgroundColor: "rgba(105,201,208,0.2)",
          borderWidth: 2,
        },
        {
          label: "Facebook",
          data: platformViews.facebook
            .filter((_, index) => index % 5 === 0)
            .concat([platformViews.facebook.at(-1)]),
          borderColor: "#1877F2",
          backgroundColor: "rgba(24,119,242,0.2)",
          borderWidth: 2,
        },
        {
          label: "YouTube",
          data: platformViews.youtube
            .filter((_, index) => index % 5 === 0)
            .concat([platformViews.youtube.at(-1)]),
          borderColor: "#FF0000",
          backgroundColor: "rgba(255,0,0,0.2)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            title: (tooltipItems) => tooltipItems[0].label,
            label: (tooltipItem) =>
              `${tooltipItem.dataset.label}: ${tooltipItem.raw} views`,
          },
        },
        legend: { display: true, position: "top" },
      },
      scales: {
        x: { grid: { display: false } },
        y: { beginAtZero: true },
      },
    },
  });
}

// Initialize functions on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  updateSummaryViews();
  updateSummaryTable();
  displayViewsChart();
});
document.addEventListener("DOMContentLoaded", () => {
  const chartCanvas = document.getElementById("views-chart");
  chartCanvas.style.height = "50vh"; // Menetapkan tinggi canvas sebagai setengah layar
  chartCanvas.style.width = "100%"; // Menjaga lebar canvas tetap 100%

  updateSummaryViews();
  updateSummaryTable();
  displayViewsChart();
});
