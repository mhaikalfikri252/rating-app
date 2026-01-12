const form = document.getElementById("form");
const emotIcons = document.querySelectorAll(".emot");
const emotInput = document.getElementById("emotInput");
const loader = document.getElementById("loader");
const notif = document.getElementById("notif");
const submitBtn = form.querySelector("button");
const pegawai = form.querySelector("select[name='pegawai']");
const ulasan = form.querySelector("textarea[name='ulasan']");

// Pilih emoji
emotIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    emotIcons.forEach((i) => i.classList.remove("selected"));
    icon.classList.add("selected");
    emotInput.value = icon.dataset.value;
  });
});

const pegawaiCards = document.querySelectorAll(".pegawai-card");
const pegawaiInput = document.getElementById("pegawaiInput");

// Logika Klik Grid Pegawai
pegawaiCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Hapus class selected dari semua kartu
    pegawaiCards.forEach((c) => c.classList.remove("selected-card"));

    // Tambah class selected ke kartu yang diklik
    card.classList.add("selected-card");

    // Isi value ke hidden input agar bisa terkirim saat submit
    pegawaiInput.value = card.dataset.nama;
  });
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Validasi tambahan untuk pegawai
  if (!pegawaiInput.value) {
    notif.textContent = "⚠️ Harap pilih pegawai!";
    notif.className = "notif error";
    return;
  }

  if (!emotInput.value) {
    notif.textContent = "⚠️ Harap pilih ekspresi kepuasan!";
    notif.className = "notif error";
    return;
  }

  if (ulasan.value.length < 10) {
    notif.textContent = "⚠️ Ulasan terlalu singkat!";
    notif.className = "notif error";
    return;
  }

  submitBtn.disabled = true;
  loader.style.display = "inline-block";
  notif.textContent = "";

  const formData = new FormData();
  formData.append("emot", emotInput.value);
  formData.append("pegawai", pegawaiInput.value); // Mengambil dari pegawaiInput
  formData.append("ulasan", ulasan.value);

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxDD00DOlZpq3EisrBfggs7ObjqwHaG3OB_gNXI-xzqC3zK9e7VAsITAWfeH0m-X-cDSA/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.text();
    if (result === "OK") {
      notif.textContent = "✅ Terima kasih atas penilaiannya!";
      notif.className = "notif success";
      form.reset();

      // Reset UI
      emotIcons.forEach((i) => i.classList.remove("selected"));
      pegawaiCards.forEach((c) => c.classList.remove("selected-card"));
      emotInput.value = "";
      pegawaiInput.value = "";

      form.scrollIntoView({ behavior: "smooth" });
    } else {
      notif.textContent = "❌ Gagal mengirim data. Coba lagi.";
      notif.className = "notif error";
    }
  } catch (error) {
    notif.textContent = "❌ Gagal koneksi ke server.";
    notif.className = "notif error";
  } finally {
    loader.style.display = "none";
    submitBtn.disabled = false;
  }
});

const fotoMap = {
  "Oni Indah Reflin": "img/oni.png",
  "Maulidar": "img/moli.png",
  "Ella Putri Maghfira": "img/ella.png",
  "Fathur Maulana": "img/fatur.png",
};

const selectPegawai = document.querySelector('select[name="pegawai"]');
const fotoPegawai = document.getElementById("foto-pegawai");

selectPegawai.addEventListener("change", function () {
  const selectedNama = this.value;
  if (fotoMap[selectedNama]) {
    fotoPegawai.src = fotoMap[selectedNama];
    fotoPegawai.style.display = "block";
  } else {
    fotoPegawai.src = "";
    fotoPegawai.style.display = "none";
  }
});
