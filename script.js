const sheetURL = "https://docs.google.com/spreadsheets/d/1pwGj8JOudjy8iCLfpbgo71Paarb-mFz2NYRYrUi7s60/export?format=csv";


let allData = [];

fetch(sheetURL)
    .then(res => res.text())
    .then(csv => {

        const rows = parseCSV(csv);
        rows.shift(); // hapus header

        allData = rows.map(cols => {

            return {
                nama: cols[2] || "",
                sekolah: cols[4] || "",
                jenis: cols[7] || "",
                kelas: cols[8] || "",
                materi: cols[10] || "",
                judul: cols[11] || "",
                deskripsi: cols[12] || "",
                link: cols[13] || ""
            };
        });

        renderData(allData);
    });

function parseCSV(text) {
    const rows = text.split("\n");
    return rows.map(row => {
        const matches = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        return matches ? matches.map(s => s.replace(/^"|"$/g, "")) : [];
    });
}

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
