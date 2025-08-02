// ====================================================================================
// || PENGATURAN UTAMA WEBSITE                                                      ||
// ====================================================================================

// GANTI dengan URL Google Script Anda yang sudah di-deploy
const scriptURL = "https://script.google.com/macros/s/AKfycbynNa_F0glZnNXio_PblBdk9vpc_rFIuG9Z5eSBXyyiADKaKTCXAsX_rwyyyNg0pA3u/exec";

// GANTI dengan Kunci Rahasia Anda. HARUS SAMA PERSIS dengan yang Anda simpan di Google Script.
const API_KEY = "WhenStellariaMjk";

// Variabel untuk menampung semua data dari data.json
let websiteData = {};

// ====================================================================================
// || KODE INTI WEBSITE (JANGAN DIUBAH)                                             ||
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
  if (!cartContainer || !totalElement) return;
  
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
      ? websiteData.config.hargaGroupCheki
      : websiteData.config.hargaMemberCheki;
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

function addToCart(memberId, image) {
  const member = websiteData.members[memberId];
  if (!member) return;

  const fullName = member.fullName;
  const name = member.name;

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
    "fixed bottom-5 right-5 bg-purple-600 text-white px-5 py-3 rounded-lg shadow-2xl text-sm font-semibold transform-gpu transition-all duration-300 translate-y-4 opacity-0";
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
      ? websiteData.config.hargaGroupCheki
      : websiteData.config.hargaMemberCheki;
    const subtotal = price * item.quantity;
    total += subtotal;
    items += `${item.name} (${item.quantity}x @${formatter.format(price)}) = ${formatter.format(subtotal)}\n`;
  });
  return { items, total, totalFormatted: formatter.format(total) };
}


function openModal(memberId) {
  const member = websiteData.members[memberId];
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
  if (websiteData.events.length === 0) {
    container.innerHTML =
      '<p class="text-center text-slate-400 col-span-full">Belum ada jadwal event.</p>';
    return;
  }

  let firstUpcomingFound = false;

  websiteData.events.forEach((event) => {
    const isFinished = event.status === "finished";
    const cardClasses = isFinished
      ? "bg-slate-800/60 opacity-60"
      : "bg-slate-800 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 border border-slate-700";

    let lineupDetailsHtml = "";
    if (!isFinished && !firstUpcomingFound && event.title === websiteData.nextEventLineup.eventTitle) {
      let presentMembers = [];
      let absentMembers = [];

      for (const memberKey in websiteData.nextEventLineup.lineup) {
        if (websiteData.nextEventLineup.lineup[memberKey]) {
          presentMembers.push(websiteData.members[memberKey].name);
        } else {
          absentMembers.push(websiteData.members[memberKey].name);
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

  websiteData.faqs.forEach((faq) => {
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

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.parentElement;
      faqItem.classList.toggle("active");
    });
  });
}

// Fungsi untuk menginisialisasi website setelah data dimuat
function initializeApp() {
    // Menampilkan harga dari konfigurasi
    document.getElementById("price-member").textContent = formatter.format(
        websiteData.config.hargaMemberCheki
    );
    document.getElementById("price-group").textContent = formatter.format(
        websiteData.config.hargaGroupCheki
    );
    
    // Tambahkan event listener ke tombol "Add to Cart"
    // Ini perlu diatur ulang di sini karena tombol-tombolnya sekarang bergantung pada data
    document.querySelector("button[onclick*=\"addToCart('nae'\"]").onclick = () => addToCart('nae', 'foto/Nae.jpg');
    document.querySelector("button[onclick*=\"addToCart('yuna'\"]").onclick = () => addToCart('yuna', 'foto/Yuna.jpg');
    document.querySelector("button[onclick*=\"addToCart('alice'\"]").onclick = () => addToCart('alice', 'foto/Alice.jpg');
    document.querySelector("button[onclick*=\"addToCart('melody'\"]").onclick = () => addToCart('melody', 'foto/Melody.jpg');
    document.querySelector("button[onclick*=\"addToCart('ella'\"]").onclick = () => addToCart('ella', 'foto/Ella.jpg');
    document.querySelector("button[onclick*=\"addToCart('group'\"]").onclick = () => addToCart('group', 'foto/group2.jpg');


    // Merender komponen dinamis
    renderSchedule();
    renderFaq();

    // Memperbarui tampilan keranjang belanja saat halaman dimuat
    updateCartCount();
    renderCartItems();

    // Menambahkan event listener ke form checkout
    const checkoutForm = document.getElementById("checkout-form");
    if(checkoutForm) {
        checkoutForm.addEventListener("submit", completeOrder);
    }

    // Fungsionalitas untuk menu mobile (hamburger menu)
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (menuToggle && mobileMenu) {
        const mobileNavLinks = mobileMenu.querySelectorAll("a.nav-link");
        menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
        });
        mobileNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
        });
    }

    // Mengatur link navigasi aktif berdasarkan posisi scroll
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

    // Fungsionalitas untuk menutup modal
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

    // Pemicu untuk Login Admin
    const copyrightFooter = document.getElementById("copyright-footer");
    let clickCount = 0;
    let clickTimer = null;

    if (copyrightFooter) {
        copyrightFooter.addEventListener('click', () => {
        clickCount++;

        if (clickTimer) {
            clearTimeout(clickTimer);
        }
        
        if (clickCount >= 5) {
            window.open('admin.html', '_blank');
            clickCount = 0; 
        }
        
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 1000); 
        });
    }
}

// Event listener utama yang akan memuat data dan memulai aplikasi
document.addEventListener("DOMContentLoaded", () => {
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      websiteData = data; // Simpan data ke variabel global
      initializeApp(); // Jalankan sisa aplikasi
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      // Anda bisa menampilkan pesan error di halaman web jika data gagal dimuat
      document.body.innerHTML = `<div style="color: white; text-align: center; padding-top: 50px;">
                                    <h1>Error</h1>
                                    <p>Gagal memuat data website. Silakan coba lagi nanti.</p>
                                 </div>`;
    });
});