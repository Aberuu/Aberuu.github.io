const scriptURL = 'https://script.google.com/macros/s/AKfycbxqQLhKAUDj6sDyT8RKTzKqTbKzoAFR_HNmYgBc9kxp81w4d45zNKNf6uz5HzQHiv2Z/exec';

  function submitVote(choice) {
      const kode = document.getElementById('kode').value.trim();
      const status = document.getElementById('status');
      const popup = document.getElementById('popup');

      status.innerText = '';

      if (kode.length !== 6 || isNaN(kode)) {
        status.innerText = "Kode harus 6 digit angka.";
        return;
      }

      const formData = new FormData();
      formData.append('pilihan', choice);
      formData.append('kode', kode);

      fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => response.text())
        .then(result => {
          if (result === "Success") {
            showPopup(); // ⏳ Munculkan popup sukses
          } else if (result === "Used") {
            status.innerText = "Kode ini sudah digunakan.";
          } else if (result === "Invalid") {
            status.innerText = "Kode tidak ditemukan.";
          } else {
            status.innerText = "Terjadi kesalahan sistem.";
          }
        })
        .catch(error => {
          console.error('Error!', error.message);
          status.innerText = "Gagal mengirim data.";
        });
    }

    function showPopup() {
      const popup = document.getElementById('popup');
      const countdownEl = document.getElementById('countdown');
      let countdown = 5;

      popup.style.display = 'flex';
      countdownEl.innerText = countdown;

      const timer = setInterval(() => {
        countdown--;
        countdownEl.innerText = countdown;
        if (countdown === 0) {
          clearInterval(timer);
          refreshNow();
        }
      }, 1000);
    }

    function refreshNow() {
      window.location.reload(true);
    }