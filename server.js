const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'db', 'duvidas.json');

// Ensure db directory exists
if (!fs.existsSync(path.join(__dirname, 'db'))) {
  fs.mkdirSync(path.join(__dirname, 'db'));
}
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// POST - Save a new dúvida
app.post('/api/duvidas', (req, res) => {
  const { nome, email, como_conheceu, como_conheceu_outro, satisfacao, aula, duvida, feedback } = req.body;

  if (!email || !como_conheceu || !satisfacao || !aula || !duvida) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  const entry = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    nome: nome || 'Anônimo',
    email,
    como_conheceu: como_conheceu === 'Outro' ? (como_conheceu_outro || 'Outro') : como_conheceu,
    satisfacao: Number(satisfacao),
    aula,
    duvida,
    feedback: feedback || '',
    data: new Date().toISOString()
  };

  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  data.push(entry);
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  res.status(201).json({ success: true, id: entry.id });
});

// GET - List all dúvidas (admin)
app.get('/api/duvidas', (req, res) => {
  const password = req.query.senha;
  if (password !== (process.env.ADMIN_PASSWORD || 'elfes2025')) {
    return res.status(401).json({ error: 'Senha de admin inválida.' });
  }

  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  res.json({ total: data.length, duvidas: data.reverse() });
});

// GET - Export as CSV (admin)
app.get('/api/duvidas/csv', (req, res) => {
  const password = req.query.senha;
  if (password !== (process.env.ADMIN_PASSWORD || 'elfes2025')) {
    return res.status(401).json({ error: 'Senha de admin inválida.' });
  }

  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const header = 'Data,Nome,Email,Como Conheceu,Satisfação,Aula,Dúvida,Feedback\n';
  const rows = data.map(d =>
    `"${d.data}","${d.nome}","${d.email}","${d.como_conheceu}","${d.satisfacao}","${d.aula}","${d.duvida.replace(/"/g, '""')}","${d.feedback.replace(/"/g, '""')}"`
  ).join('\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename=duvidas.csv');
  res.send('\uFEFF' + header + rows);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Admin: http://localhost:${PORT}/admin.html`);
});
