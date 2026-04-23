const apiURL = "https://script.google.com/macros/s/AKfycbx-JSZh4MSSY1CQbfRornCNFV5ayZu3iN5m3h_WVWfV0c2q6O_jMGeNc-b0j14PHZw/exec";

let allData = [];

fetch(apiURL)
  .then(res => res.json())
  .then(data => {

    allData = data.map(item => ({
      nama: item["Nama Lengkap"] || "",
      sekolah: item["Asal Sekolah"] || "",
      jenis: item["Jenis Perangkat Pembelajaran"] || "",
      kelas: item["Kelas"] || "",
      materi: item["Materi / Topik Pembelajaran"] || "",
      judul: item["Judul Perangkat"] || "",
      deskripsi: item["Deskripsi Singkat"] || "",
      link: item["FILE / LINK"] || ""
    }));

    renderData(allData);
  });

function renderData(data) {
  const container = document.getElementById("data-container");
  container.innerHTML = "";

  data.forEach(item => {
    if (!item.judul) return;

    container.innerHTML += `
      <div class="card">
        <h3>${item.judul}</h3>
        <p><b>Materi:</b> ${item.materi}</p>
        <p><b>Kelas:</b> ${item.kelas}</p>
        <p><b>Jenis:</b> ${item.jenis}</p>
        <p><b>Guru:</b> ${item.nama}</p>
        <p><b>Sekolah:</b> ${item.sekolah}</p>
        <a href="${item.link}" target="_blank">Download</a>
      </div>
    `;
  });
}

// FILTER
document.getElementById("search").addEventListener("input", filterData);
document.getElementById("jenis").addEventListener("change", filterData);
document.getElementById("kelas").addEventListener("change", filterData);

function filterData() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const jenis = document.getElementById("jenis").value;
  const kelas = document.getElementById("kelas").value;

  const filtered = allData.filter(item => {
    return (
      item.judul.toLowerCase().includes(keyword) &&
      (jenis === "" || item.jenis === jenis) &&
      (kelas === "" || item.kelas === kelas)
    );
  });

  renderData(filtered);
}
