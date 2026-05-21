// Autoscreenshot + share helper for Templates/result.html
// Requirements: add an element with id="share-area" wrapping the content you want to capture.

async function shareAndDownloadScreenshot() {
  const shareArea = document.getElementById("share-area");
  if (!shareArea) {
    alert("Elemen screenshot (share-area) tidak ditemukan.");
    return;
  }

  // Dynamically load html2canvas from CDN (no build tooling required)
  if (!window.html2canvas) {
    await new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src =
        "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    }).catch(() => {
      alert("Gagal memuat library html2canvas.");
    });
  }

  if (!window.html2canvas) return;

  try {
    const canvas = await window.html2canvas(shareArea, {
      backgroundColor: "#ffffff",
      useCORS: true,
      logging: false,
    });

    const dataUrl = canvas.toDataURL("image/png");

    // Auto download

    const link = document.createElement("a");
    const pred = (
      document.querySelector("#pred-value")?.textContent || "hasil"
    ).trim();
    link.download = `punarbumi-${pred}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Share (if supported)
    if (navigator.share) {
      // Try to share file if supported
      try {
        const res = await fetch(dataUrl);
        const blob = await res.blob();
        const file = new File([blob], `punarbumi-${pred}.png`, {
          type: "image/png",
        });

        await navigator.share({
          title: "Hasil Scan Punarbumi",
          text: `Jenis: ${pred}`,
          files: [file],
        });
      } catch (e) {
        // fallback share without files
        await navigator.share({
          title: "Hasil Scan Punarbumi",
          text: `Jenis: ${pred}`,
          url: window.location.href,
        });
      }
    }
  } catch (err) {
    console.error(err);
    alert("Gagal membuat screenshot.");
  }
}
