const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTb_LH21HVNQw6YPgaSPLrPwkA7EbY3VJHAl3fyLSFPGgbroT-UNcVDBX4aKX5UlH6ApQ2XtZ3eo1vP/pub?output=csv";

let allData = [];

fetch(sheetURL)
    .then(res => res.text())
    .then(csv => {
        const rows = csv.split("\n").slice(1);

        allData = rows.map(row => {
            const cols = row.split(",");

            return {
                nama: cols[0],
                sekolah: cols[2],
                jenis: cols[5],
                kelas: cols[6],
                materi: cols[8],
                judul: cols[9],
                deskripsi: cols[10],
                link: cols[11]
            };
        });

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
            item.judul.toLowerCase().includes(keyword) &&
            (jenis === "" || item.jenis === jenis) &&
            (kelas === "" || item.kelas === kelas)
        );
    });

    renderData(filtered);
}
