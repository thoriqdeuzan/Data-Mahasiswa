document.getElementById('formMahasiswa').addEventListener('submit', function (e) {
    e.preventDefault();

    var nama = document.getElementById('nama').value;
    var jurusan = document.getElementById('jurusan').value;
    var semester = document.getElementById('semester').value;
    var gmail = document.getElementById('gmail').value;
    var noTelepon = document.getElementById('noTelepon').value;
    var alamat = document.getElementById('alamat').value;

    var dataMahasiswa = {
        nama: nama,
        jurusan: jurusan,
        semester: semester,
        gmail: gmail,
        noTelepon: noTelepon,
        alamat: alamat
    };

    var existingData = JSON.parse(localStorage.getItem('dataMahasiswa')) || [];

    existingData.push(dataMahasiswa);

    localStorage.setItem('dataMahasiswa', JSON.stringify(existingData));

    alert('Data mahasiswa berhasil disimpan!');

    document.getElementById('formMahasiswa').reset();

    renderTable();
});

function renderTable() {
    var dataMahasiswaBody = document.getElementById('dataMahasiswaBody');
    dataMahasiswaBody.innerHTML = '';

    var existingData = JSON.parse(localStorage.getItem('dataMahasiswa')) || [];

    existingData.forEach(function (data, index) {
        var row = dataMahasiswaBody.insertRow();

        for (var key in data) {
            var cell = row.insertCell();
            cell.innerHTML = data[key];
        }

        var cellAction = row.insertCell();
        var updateButton = document.createElement('button');
        updateButton.className = 'btn btn-warning btn-sm';
        updateButton.innerHTML = 'Update';
        updateButton.onclick = function () {
            updateData(index);
        };

        var deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm ml-2';
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = function () {
            deleteData(index);
        };

        cellAction.appendChild(updateButton);
        cellAction.appendChild(deleteButton);
    });
}

function updateData(index) {
    var existingData = JSON.parse(localStorage.getItem('dataMahasiswa')) || [];
    var selectedData = existingData[index];

    // Menampilkan form pembaruan data dengan nilai saat ini
    var updatedNama = prompt('Masukkan Nama baru:', selectedData.nama);
    var updatedJurusan = prompt('Masukkan Jurusan baru:', selectedData.jurusan);
    var updatedSemester = prompt('Masukkan Semester baru:', selectedData.semester);
    var updatedGmail = prompt('Masukkan Gmail baru:', selectedData.gmail);
    var updatedNoTelepon = prompt('Masukkan No Telepon baru:', selectedData.noTelepon);
    var updatedAlamat = prompt('Masukkan Alamat baru:', selectedData.alamat);

    // Memperbarui data jika pengguna memasukkan nilai baru
    if (updatedNama !== null && updatedNama !== '') {
        selectedData.nama = updatedNama;
    }
    if (updatedJurusan !== null && updatedJurusan !== '') {
        selectedData.jurusan = updatedJurusan;
    }
    if (updatedSemester !== null && updatedSemester !== '') {
        selectedData.semester = updatedSemester;
    }
    if (updatedGmail !== null && updatedGmail !== '') {
        selectedData.gmail = updatedGmail;
    }
    if (updatedNoTelepon !== null && updatedNoTelepon !== '') {
        selectedData.noTelepon = updatedNoTelepon;
    }
    if (updatedAlamat !== null && updatedAlamat !== '') {
        selectedData.alamat = updatedAlamat;
    }

    // Memperbarui local storage
    existingData[index] = selectedData;
    localStorage.setItem('dataMahasiswa', JSON.stringify(existingData));

    // Merender tabel kembali
    renderTable();
}

function deleteData(index) {
    var existingData = JSON.parse(localStorage.getItem('dataMahasiswa')) || [];

    existingData.splice(index, 1);

    localStorage.setItem('dataMahasiswa', JSON.stringify(existingData));

    renderTable();
}

renderTable();
