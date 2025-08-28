// File: api/get-orders.js (Versi Final yang Benar)

export default async function handler(req, res) {
  try {
    const scriptURL = process.env.SCRIPT_URL;
    const apiKey = process.env.API_KEY;

    // Ambil data dari Google Script dengan menyertakan API Key sebagai parameter URL
    const response = await fetch(`${scriptURL}?action=getOrders&apiKey=${apiKey}`);
    
    if (!response.ok) {
        throw new Error(`Google Script merespons dengan error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Kirim kembali data dari Google Script ke frontend
    res.status(200).json(data);

  } catch (error) {
    console.error('Error saat mengambil pesanan:', error);
    res.status(500).json({ error: error.message });
  }
}