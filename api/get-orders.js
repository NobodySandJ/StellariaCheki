// File: api/get-orders.js (Versi Diagnostik)

export default async function handler(req, res) {
  try {
    // Ambil nilai dari environment variables
    const scriptURL = process.env.SCRIPT_URL;
    const apiKey = process.env.API_KEY;

    // Kirim kembali nilai variabel ini sebagai JSON untuk kita periksa
    // Ini akan menunjukkan kepada kita apa yang 'dilihat' oleh server Vercel
    res.status(200).json({
      message: "Ini adalah tes diagnostik dari server.",
      scriptUrlDiterima: scriptURL,
      apiKeyDiterima: apiKey,
      apakahScriptUrlAda: !!scriptURL, // akan menjadi true jika ada, false jika tidak
      apakahApiKeyAda: !!apiKey,       // akan menjadi true jika ada, false jika tidak
    });

  } catch (error) {
    // Jika ada error lain, kirim pesan ini
    res.status(500).json({ error: error.message });
  }
}