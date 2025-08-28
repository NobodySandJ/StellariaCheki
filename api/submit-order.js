// File: api/submit-order.js

export default async function handler(req, res) {
  // Hanya izinkan metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const payload = {
      ...req.body, // Ambil semua data dari form yang dikirim frontend
      apiKey: process.env.API_KEY, // Tambahkan API Key dari environment variable
    };

    const scriptURL = process.env.SCRIPT_URL;

    // Teruskan data ke Google Script
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    // Kirim kembali hasil dari Google Script ke frontend
    res.status(200).json(result);

  } catch (error) {
    console.error('Error submitting order:', error);
    res.status(500).json({ result: 'error', message: error.message });
  }
}