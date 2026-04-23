const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTb_LH21HVNQw6YPgaSPLrPwkA7EbY3VJHAl3fyLSFPGgbroT-UNcVDBX4aKX5UlH6ApQ2XtZ3eo1vP/pubhtml";

let allData = [];

fetch(sheetURL)
    .then(res => res.text())
    .then(csv => {
        const rows = csv.split("\n").slice(1);

        allData = rows.map(row => {
            const cols = row.split(",");

            return {
                nama: cols[2],
                sekolah: cols[4],
                jenis: cols[7],
                kelas: cols[8],
                materi: cols[10],
                judul: cols[11],
                deskripsi: cols[12],
                link: cols[13],
                status: cols[14]
            };
        });

        // OPTIONAL: hanya tampilkan yang disetujui
        const approvedData = allData.filter(item =>
            item.status && item.status.toLowerCase().includes("karya")
        );

        renderData(approvedData);
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

document.getElementById("search").addEventListener("input", filterData);
document.getElementById("jenis").addEventListener("change", filterData);
document.getElementById("kelas").addEventListener("change", filterData);

function filterData() {
    const keyword = document.getElementById("search").value.toLowerCase();
    const jenis = document.getElementById("jenis").value;
    const kelas = document.getElementById("kelas").value;

    const filtered = allData.filter(item => {
        return (
            item.judul &&
            item.judul.toLowerCase().includes(keyword) &&
            (jenis === "" || item.jenis === jenis) &&
            (kelas === "" || item.kelas === kelas)
        );
    });

    renderData(filtered);
}
