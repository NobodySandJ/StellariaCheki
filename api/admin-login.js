// File: api/admin-login.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { username, password } = req.body;

  // Bandingkan dengan kredensial yang aman dari Environment Variables
  const isAdmin = username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS;

  if (isAdmin) {
    // Jika berhasil, kirim status sukses
    res.status(200).json({ success: true });
  } else {
    // Jika gagal, kirim status gagal
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
}