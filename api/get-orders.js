// File: api/get-orders.js

export default async function handler(req, res) {
  try {
    const scriptURL = process.env.SCRIPT_URL;
    const apiKey = process.env.API_KEY;

    // Ambil data dari Google Script dengan menyertakan API Key
    const response = await fetch(`${scriptURL}?action=getOrders&apiKey=${apiKey}`);
    
    if (!response.ok) {
        throw new Error(`Google Script returned an error: ${response.statusText}`);
    }

    const data = await response.json();
    
    res.status(200).json(data);

  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
}