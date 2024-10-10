const searchBtn = document.getElementById("search-btn");
import cars from "./data/cars.json" with {type:"json"};
const hasilSearch = document.getElementById("hasil-search");

searchBtn.addEventListener("click", (event) => {
  hasilSearch.innerHTML = "";
  const tipeDriver = document.getElementById("driver").value;
  const tanggalSewa = document.getElementById("tanggal").value;
  const waktuJemput = document.getElementById("waktu").value;

  if (!tipeDriver) {
    alert("Silakan pilih tipe driver!");
    event.preventDefault();
    return;
  }

  if (!tanggalSewa) {
    alert("Silakan pilih tanggal sewa!");
    event.preventDefault();
    return;
  }

  if (!waktuJemput) {
    alert("Silakan pilih waktu jemput!");
    event.preventDefault();
    return;
  }


  const jumlahPenumpangInput = document.getElementById("jumlahPenumpang").value;
  const jumlahPenumpang = jumlahPenumpangInput
    ? parseInt(jumlahPenumpangInput, 10)
    : null;
  let carsFilter = [];
  const sewaDate = new Date(tanggalSewa);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const driverType = () => {
    if (tipeDriver === "DenganSopir") {
      return true;
    } else if (tipeDriver === "TanpaSopir") {
      return false;
    }
  };

  function getRandomTimestamp(start, end) {
    const randomDate = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return randomDate.getTime();
  }

  const start = new Date("2024-09-26");
  const end = new Date("2024-10-26");

  cars.map((car) => {
    const sewaTimestamp = sewaDate.getTime();
    const availableTimestamp = getRandomTimestamp(start, end);

    if (
      availableTimestamp <= sewaTimestamp &&
      (jumlahPenumpang === null || car.capacity >= jumlahPenumpang) &&
      car.available === driverType()
    ) {
      carsFilter.push(car);
    }
  });

  const render = (template) => {
    hasilSearch.innerHTML += template;
  };

  if (carsFilter.length <= 0) {
    const template = `
    <h5 class="text-center msg">Data tidak ditemukan...</h5>
    `;
    render(template);
  } else {
    carsFilter.map((car) => {
      const template = `
      <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
            <div class="card w-100" style="width: 20rem">
              <img src="./${
                car.image
              }" class="card-img-top card-img img-fluid" alt="..." />
              <div class="card-body">
                <h6 class="card-title">${car.manufacture}</h6>
                <h5>${formatRupiah(car.rentPerDay)}/hari</h5>
                <p class="card-text">
                  ${car.description}
                </p>
                <p>
                  <img src="images/icon/fi_users2.png" alt="">
                  ${car.capacity} Orang</p>
                <p>
                  <img src="images/icon/fi_settings.png" alt="">
                  ${car.transmission}</p>
                <p>
                  <img src="images/icon/fi_calendar2.png" alt="">
                  Tahun ${car.year}</p>
                <a href="#" class="btn btn-primary pilih-btn p-2">Pilih Mobil</a>
              </div>
            </div>
          </div>
    `;
      render(template);
    });
  }
});
