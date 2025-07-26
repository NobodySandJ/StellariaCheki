// ====================================================================================
// || PENGATURAN UTAMA WEBSITE (EDIT DI SINI) ||
// ====================================================================================

// GANTI dengan URL Google Script Anda yang sudah di-deploy
const scriptURL = "https://script.google.com/macros/s/AKfycbz7sGObsXQ6ZU34GsB2BmsrhNCbGGnMTWNpZBgHQxolVQ7a3a0ykOM3CC8DWJ5SpXsj/exec";

// GANTI dengan Kunci Rahasia Anda. HARUS SAMA PERSIS dengan yang Anda simpan di Google Script.
const API_KEY = "WhenStellariaMjk";

const CONFIG = {
  hargaMemberCheki: 25000,
  hargaGroupCheki: 30000,
};

// ====================================================================================
// || EDIT FAQ DI SINI ||
// ====================================================================================
const faqs = [
  {
    question: "Apa itu Cheki?",
    answer:
      "Cheki adalah foto instan (seperti polaroid) yang diambil bersama member idol. Ini adalah cara populer bagi fans untuk mendapatkan kenang-kenangan pribadi dengan idola favorit mereka.",
  },
  {
    question: "Bagaimana jika saya berhalangan hadir di event?",
    answer:
      "Tidak masalah. Jika Anda sudah membayar, Cheki Anda akan tetap diambil oleh tim kami. Kami bisa mengirimkannya ke alamat Anda (ongkos kirim ditanggung pemesan) atau bisa Anda ambil di event berikutnya. Silakan hubungi contact person kami.",
  },
  {
    question: "Bolehkah saya meminta pose tertentu saat Cheki?",
    answer:
      "Tentu saja! Selama posenya sopan dan tidak melanggar aturan, Anda bebas berekspresi bersama member. Diskusikan pose yang Anda inginkan dengan member saat giliran Anda.",
  },
  {
    question: "Apakah tiket Cheki bisa digunakan di event lain?",
    answer:
      "Tiket Cheki yang dibeli untuk satu event hanya berlaku untuk event tersebut, kecuali ada pengumuman khusus dari kami. Ini untuk memastikan semua fans mendapatkan kesempatan yang sama di setiap acara.",
  },
];

// ====================================================================================
// || EDIT LINEUP UNTUK EVENT TERDEKAT DI SINI ||
// ====================================================================================
const NEXT_EVENT_LINEUP = {
  eventTitle: "Ma chung university",
  lineup: {
    nae: true,
    yuna: true,
    alice: true,
    melody: true,
    ella: true,
  },
};

// ====================================================================================
// || EDIT JADWAL EVENT DI SINI ||
// ====================================================================================
const events = [
  {
    date: "27 Juli 2025",
    title: "Ma chung university",
    time: "2:00 PM - 5:00 PM",
    status: "upcoming",
  },
];

// ====================================================================================
// || EDIT DATA MEMBER DI SINI ||
// ====================================================================================
const members = {
  nae: {
    name: "Nae",
    fullName: "🧡NAE🧡",
    color: "text-orange-400",
    jiko: "Ba~ kyun!! Cahaya cinta yang menembus hatimu! Nyahoo~ Aku Nae ^,^♪",
    ig: "evilnae_",
    tiktok: "evilnae",
    photos: [
      "foto/Nae.jpg",
      "foto/gallery/f-nae1.jpg",
      "foto/gallery/f-nae2.jpg",
    ],
    tanggallahir: "19 February",
    zodiac: "Pisces",
    tinggibadan: "157cm",
    goldarah: "AB",
    mbti: "ENFJ",
    hobi: "Cosplay, Menyanyi",
    makananfavorit: "Bebek, Tiramisu Cake, Mango, Taro",
    warnafavorit: "Merah, Orange, purple",
  },
  yuna: {
    name: "Yuna",
    fullName: "💛YUNA💛",
    color: "text-yellow-400",
    jiko: "Seperti madu yang ‘kan maniskan hari harimu, Halo, aku Yunaaa~! 🐝✨",
    ig: "hokaitto",
    tiktok: "hokaitto",
    photos: [
      "foto/Yuna.jpg",
      "foto/gallery/f-yuna1.jpg",
      "foto/gallery/f-yuna2.jpg",
    ],
    tanggallahir: "27 Desember",
    zodiac: "Capricorn",
    tinggibadan: "157cm",
    goldarah: "B",
    mbti: "INTJ",
    hobi: "Makeup & Dress up, Cosplay, Tidur",
    makananfavorit:
      "Mie nyemek pake nugget, Apapun ga beracun (opsional)",
    warnafavorit: "Ungu, Hitam, Biru, Kuning",
  },
  alice: {
    name: "Alice",
    fullName: "💜ALICE💜",
    color: "text-purple-400",
    jiko: "Si gadis ceria yang akan membawa kamu ke Wornderlad Panggil aku Alice~ 🐰✨",
    ig: "alicelyn__",
    tiktok: "arisurisuu_",
    photos: [
      "foto/Alice.jpg",
      "foto/gallery/f-alice1.jpg",
      "foto/gallery/f-alice2.jpg",
    ],
    tanggallahir: "7 November",
    zodiac: "Scorpio",
    tinggibadan: "160cm",
    goldarah: "O",
    mbti: "ENFJ",
    hobi: "Wotagei, Fotography, Gaming",
    makananfavorit: "Susu Stroberi, Roti, Sushi, Martabak",
    warnafavorit: "Putih, Ungu, Hitam",
  },
  melody: {
    name: "Melody",
    fullName: "❤️MELODY❤️",
    color: "text-red-500",
    jiko: "Seperti lagu favoritmu, bolehkah aku selalu temani hari-harimu? Halo, aku Melody! 🎵🍒",
    ig: "lodehehe",
    tiktok: "mango.sodium",
    photos: [
      "foto/Melody.jpg",
      "foto/gallery/f-melody1.jpg",
      "foto/gallery/f-melody2.jpg",
    ],
    tanggallahir: "13 November",
    zodiac: "Scorpio",
    tinggibadan: "155cm",
    goldarah: "O",
    mbti: "ENFP",
    hobi: "Membaca, Menulis, Baking, Nailart",
    makananfavorit: "Coklat, Mangga, Telor gulung",
    warnafavorit: "Biru, Putih, Merah",
  },
  ella: {
    name: "Ella",
    fullName: "💚ELLA💚",
    color: "text-green-500",
    jiko: "Seniman introvert yang akan melukis senyuman di wajahmu! Halo, aku Ella~ 🎨✨",
    ig: "salmonelix",
    tiktok: "salmonelix",
    photos: [
      "foto/Ella.jpg",
      "foto/gallery/f-ella1.jpg",
      "foto/gallery/f-ella2.jpg",
    ],
    tanggallahir: "26 januari",
    zodiac: "Aquarius",
    tinggibadan: "162cm",
    goldarah: "B",
    mbti: "INFP",
    hobi: "Menari, Cosplay, Menggambar",
    makananfavorit: "Salmon, Sushi, Lemper, Mie Ayam, Mangut iwak pe",
    warnafavorit: "Turqoise, Ungu",
  },
  group: {
    name: "Group Cheki",
    fullName: "Group Cheki 🖤",
    color: "text-slate-300",
    photos: ["foto/group2.jpg"],
    deskripsi:
      "Stellaria adalah grup idola yang berasal dari Malang, Indonesia...",
  },
};

// ====================================================================================
// || KODE INTI WEBSITE (JANGAN DIUBAH) ||
// ====================================================================================

let cart = JSON.parse(localStorage.getItem("stellaria-cart")) || [];
const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

function updateItemQuantity(index, amount) {
  if (cart[index]) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem("stellaria-cart", JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
  }
}

function renderCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total");
  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<p class="text-slate-400 text-center py-8">Your cart is empty</p>';
    totalElement.textContent = formatter.format(0);
    return;
  }
  let html = '<div class="divide-y divide-slate-700">';
  let total = 0;
  cart.forEach((item, index) => {
    const price = item.name.includes("Group")
      ? CONFIG.hargaGroupCheki
      : CONFIG.hargaMemberCheki;
    const itemTotal = price * item.quantity;
    total += itemTotal;
    html += `<div class="flex items-center py-4 gap-4">
                          <img src="${item.image}" alt="${
      item.name
    }" class="w-16 h-16 object-cover rounded-lg shadow-sm">
                          <div class="flex-1">
                              <h4 class="font-semibold text-slate-200">${
                                item.name
                              }</h4>
                              <p class="font-semibold text-purple-400 text-sm">${formatter.format(
                                price
                              )}</p>
                              <button onclick="removeFromCart(${index})" class="mt-1 text-xs text-red-500 hover:text-red-400 hover:underline">Remove</button>
                          </div>
                          <div class="flex items-center gap-2">
                              <button onclick="updateItemQuantity(${index}, -1)" class="w-7 h-7 bg-slate-700 rounded-full font-bold text-slate-300 hover:bg-slate-600">-</button>
                              <span class="w-8 text-center font-semibold text-slate-200">${
                                item.quantity
                              }</span>
                              <button onclick="updateItemQuantity(${index}, 1)" class="w-7 h-7 bg-slate-700 rounded-full font-bold text-slate-300 hover:bg-slate-600">+</button>
                          </div>
                       </div>`;
  });
  html += "</div>";
  cartContainer.innerHTML = html;
  totalElement.textContent = formatter.format(total);
}

function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountEls = [
    document.getElementById("cart-count"),
    document.getElementById("cart-count-mobile"),
  ];
  cartCountEls.forEach((el) => {
    if (el) {
      el.textContent = count;
      el.classList.toggle("hidden", count === 0);
    }
  });
}

function addToCart(name, fullName, image) {
  const existingItemIndex = cart.findIndex(
    (item) => item.name === fullName
  );
  if (existingItemIndex > -1) {
    updateItemQuantity(existingItemIndex, 1);
  } else {
    cart.push({ name: fullName, image, quantity: 1 });
  }
  localStorage.setItem("stellaria-cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
  const notification = document.createElement("div");
  notification.className =
    "fixed bottom-5 right-5 bg-slate-200 text-slate-800 px-5 py-3 rounded-lg shadow-2xl text-sm font-semibold transform-gpu transition-all duration-300 translate-y-4 opacity-0";
  notification.textContent = `${name} added to cart!`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.remove("translate-y-4", "opacity-0");
  }, 10);
  setTimeout(() => {
    notification.classList.add("translate-y-4", "opacity-0");
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("stellaria-cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function clearCart() {
  cart = [];
  localStorage.setItem("stellaria-cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

function getCartSummary() {
  let items = "";
  let total = 0;
  cart.forEach((item) => {
    const price = item.name.includes("Group")
      ? CONFIG.hargaGroupCheki
      : CONFIG.hargaMemberCheki;
    const subtotal = price * item.quantity;
    total += subtotal;
    items += `${item.name} (${item.quantity}x @${formatter.format(price)}) = ${formatter.format(subtotal)}\n`;
  });
  // Mengembalikan total dalam bentuk angka untuk perhitungan, dan teks untuk tampilan
  return { items, total, totalFormatted: formatter.format(total) };
}


function openModal(memberId) {
  const member = members[memberId];
  if (!member) return;
  const modalTitleEl = document.getElementById("modal-title");
  const modalSocialsEl = document.getElementById("modal-socials");
  const slider = document.getElementById("modal-image-slider");
  const dotsContainer = document.getElementById("modal-slider-dots");

  modalTitleEl.className = "text-2xl font-bold";
  modalTitleEl.classList.add(member.color);
  modalTitleEl.textContent = member.fullName;

  slider.innerHTML = "";
  dotsContainer.innerHTML = "";

  member.photos.forEach((photoSrc, index) => {
    slider.innerHTML += `<div class="slider-item"><img src="${photoSrc}" alt="Galeri foto ${
      member.name
    } ${index + 1}" class="w-full h-full object-cover"></div>`;
    if (member.photos.length > 1) {
      dotsContainer.innerHTML += `<div class="slider-dot ${
        index === 0 ? "active" : ""
      }"></div>`;
    }
  });

  slider.onscroll = () => {
    const dots = dotsContainer.querySelectorAll(".slider-dot");
    const activeIndex = Math.round(
      slider.scrollLeft / slider.clientWidth
    );
    dots.forEach((dot, index) =>
      dot.classList.toggle("active", index === activeIndex)
    );
  };

  let contentHtml = "";
  if (memberId === "group") {
    contentHtml = `<p class="text-slate-300 leading-relaxed">${
      member.deskripsi || ""
    }</p>`;
    modalSocialsEl.innerHTML = "";
  } else {
    contentHtml = `<p class="text-center italic font-medium mb-4 ${
      member.color
    }">"${
      member.jiko || "-"
    }"</p><div class="grid grid-cols-2 gap-x-4 gap-y-2 text-sm"><p><strong class="font-medium text-slate-200">Tanggal Lahir:</strong><br>${
      member.tanggallahir || "-"
    }</p><p><strong class="font-medium text-slate-200">Zodiak:</strong><br>${
      member.zodiac || "-"
    }</p><p><strong class="font-medium text-slate-200">Tinggi Badan:</strong><br>${
      member.tinggibadan || "-"
    }</p><p><strong class="font-medium text-slate-200">Gol. Darah:</strong><br>${
      member.goldarah || "-"
    }</p><p><strong class="font-medium text-slate-200">MBTI:</strong><br>${
      member.mbti || "-"
    }</p><p><strong class="font-medium text-slate-200">Hobi:</strong><br>${
      member.hobi || "-"
    }</p><p class="col-span-2"><strong class="font-medium text-slate-200">Makanan Favorit:</strong><br>${
      member.makananfavorit || "-"
    }</p><p class="col-span-2"><strong class="font-medium text-slate-200">Warna Favorit:</strong><br>${
      member.warnafavorit || "-"
    }</p></div>`;

    let socialsHtml = "";
    if (member.ig) {
      socialsHtml += `<a href="https://instagram.com/${member.ig}" target="_blank" class="text-slate-400 hover:text-pink-500 transition-colors"><i class="fab fa-instagram fa-2x"></i></a>`;
    }
    if (member.tiktok) {
      socialsHtml += `<a href="https://tiktok.com/@${member.tiktok}" target="_blank" class="text-slate-400 hover:text-white transition-colors"><i class="fab fa-tiktok fa-2x"></i></a>`;
    }
    modalSocialsEl.innerHTML = socialsHtml;
  }
  document.getElementById("modal-content").innerHTML = contentHtml;
  document.getElementById("modal").classList.add("active");
}

function closeModal() {
  document.getElementById("modal").classList.remove("active");
}
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  document.getElementById("checkout-modal").classList.add("active");
}
function closeCheckoutModal() {
  document.getElementById("checkout-modal").classList.remove("active");
}
function closeThankYouModal() {
  document.getElementById("thankyou-modal").classList.remove("active");
}

function validateForm() {
  let isValid = true;
  const fields = [
    { id: "fullname", errorMsg: "Nama tidak boleh kosong." },
    {
      id: "email",
      errorMsg: "Format email tidak valid.",
      validator: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    },
    { id: "phone", errorMsg: "Nomor WhatsApp tidak boleh kosong." },
    {
      id: "payment-proof",
      errorMsg: "Bukti pembayaran wajib di-upload.",
      validator: (val, el) => el.files.length > 0,
    },
  ];

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const errorEl = input.nextElementSibling;
    const value = input.value.trim();
    let fieldIsValid = field.validator
      ? field.validator(value, input)
      : value !== "";

    if (!fieldIsValid) {
      isValid = false;
      input.classList.add("invalid");
      errorEl.style.display = "block";
    } else {
      input.classList.remove("invalid");
      errorEl.style.display = "none";
    }
  });
  return isValid;
}

async function completeOrder(event) {
  event.preventDefault();
  if (!validateForm()) return;

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Processing...";

  const fileInput = document.getElementById("payment-proof");
  const reader = new FileReader();
  reader.readAsDataURL(fileInput.files[0]);

  reader.onload = async () => {
    const base64Data = reader.result.split(",")[1];
    const cartData = getCartSummary();
    const file = fileInput.files[0];

    const payload = {
      apiKey: API_KEY,
      nama: document.getElementById("fullname").value,
      email: document.getElementById("email").value,
      no_wa: document.getElementById("phone").value,
      ig: document.getElementById("instagram").value,
      pesanan: cartData.items,
      total: cartData.total,
      totalFormatted: cartData.totalFormatted,
      fileData: base64Data,
      fileName: file.name,
      mimeType: file.type
    };

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.result === "success") {
        clearCart();
        closeCheckoutModal();
        document.getElementById("thankyou-modal").classList.add("active");
        form.reset();
      } else {
        alert("Gagal mengirim pesanan. Error: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      alert("Gagal mengirim pesanan. Terjadi kesalahan: " + error.message);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Complete Order";
    }
  };
  reader.onerror = () => {
    alert("Gagal membaca file bukti pembayaran.");
    submitButton.disabled = false;
    submitButton.textContent = "Complete Order";
  };
}

function renderSchedule() {
  const container = document.getElementById("schedule-container");
  if (!container) return;
  container.innerHTML = "";
  if (events.length === 0) {
    container.innerHTML =
      '<p class="text-center text-slate-400 col-span-full">Belum ada jadwal event.</p>';
    return;
  }

  let firstUpcomingFound = false;

  events.forEach((event) => {
    const isFinished = event.status === "finished";
    const cardClasses = isFinished
      ? "bg-slate-800/60 opacity-60"
      : "bg-slate-800 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 border border-slate-700";

    let lineupDetailsHtml = "";
    if (!isFinished && !firstUpcomingFound) {
      let presentMembers = [];
      let absentMembers = [];

      for (const memberKey in NEXT_EVENT_LINEUP.lineup) {
        if (NEXT_EVENT_LINEUP.lineup[memberKey]) {
          presentMembers.push(members[memberKey].name);
        } else {
          absentMembers.push(members[memberKey].name);
        }
      }

      let lineupHtml = presentMembers
        .map(
          (member) =>
            `<li class="flex items-center"><span class="mr-2">✅</span>${member}</li>`
        )
        .join("");
      let absentHtml = "";
      if (absentMembers.length > 0) {
        absentHtml = `<h4 class="font-bold text-sm text-red-500 mt-3 mb-1">Berhalangan</h4><ul class="space-y-1 text-sm text-slate-300">${absentMembers
          .map(
            (member) =>
              `<li class="flex items-center"><span class="mr-2">❌</span>${member}</li>`
          )
          .join("")}</ul>`;
      }

      lineupDetailsHtml = `<div class="text-left mt-4 pt-4 border-t border-purple-800/50"><h4 class="font-bold text-sm text-green-500 mb-1">Lineup</h4><ul class="space-y-1 text-sm text-slate-300">${lineupHtml}</ul>${absentHtml}</div>`;
      firstUpcomingFound = true;
    }

    const eventCardHtml = `<div class="${cardClasses} p-6 rounded-2xl flex flex-col"><div class="flex-grow"><p class="text-sm font-semibold text-purple-400 mb-1">${
      event.date
    } ${
      isFinished
        ? '<span class="text-xs font-normal text-red-500">(Selesai)</span>'
        : ""
    }</p><h3 class="text-xl font-bold text-slate-200">${
      event.title
    }</h3><p class="text-sm text-slate-400 mt-1 mb-4">${
      event.time
    }</p>${lineupDetailsHtml}</div></div>`;
    container.innerHTML += eventCardHtml;
  });
}

function renderFaq() {
  const container = document.getElementById("faq-container");
  if (!container) return;
  container.innerHTML = "";

  faqs.forEach((faq) => {
    const faqItemHtml = `
                  <div class="faq-item bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-700">
                      <button class="faq-question w-full flex justify-between items-center text-left p-4 md:p-5">
                          <span class="font-semibold text-purple-300">${faq.question}</span>
                          <span class="faq-icon text-purple-400 text-xl font-light transform transition-transform duration-300">
                              <i class="fas fa-chevron-down"></i>
                          </span>
                      </button>
                      <div class="faq-answer text-slate-400">
                          <p class="pb-4 px-4 md:px-5">${faq.answer}</p>
                      </div>
                  </div>
              `;
    container.innerHTML += faqItemHtml;
  });

  container.addEventListener("click", function (e) {
    const questionButton = e.target.closest(".faq-question");
    if (questionButton) {
      const faqItem = questionButton.parentElement;

      if (!faqItem.classList.contains("active")) {
        const allActiveItems =
          container.querySelectorAll(".faq-item.active");
        allActiveItems.forEach((item) => {
          item.classList.remove("active");
        });
      }

      faqItem.classList.toggle("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("price-member").textContent = formatter.format(
    CONFIG.hargaMemberCheki
  );
  document.getElementById("price-group").textContent = formatter.format(
    CONFIG.hargaGroupCheki
  );

  renderSchedule();
  renderFaq();
  updateCartCount();
  renderCartItems();
  document
    .getElementById("checkout-form")
    .addEventListener("submit", completeOrder);

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuToggle && mobileMenu) {
    const mobileNavLinks = mobileMenu.querySelectorAll("a");
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(
    "#desktop-menu a.nav-link, #mobile-menu a.nav-link"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (
              link.getAttribute("href").substring(1) === entry.target.id
            ) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { rootMargin: "-40% 0px -60% 0px" }
  );
  sections.forEach((section) => {
    observer.observe(section);
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(".modal.active")
        .forEach((modal) => modal.classList.remove("active"));
    }
  });
});