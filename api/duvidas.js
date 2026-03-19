const fs = require('fs');
const path = require('path');

const DB_PATH = path.join('/tmp', 'duvidas.json');

function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, '[]');
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST - Save new dúvida
  if (req.method === 'POST') {
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

    const data = readDB();
    data.push(entry);
    writeDB(data);

    return res.status(201).json({ success: true, id: entry.id });
  }

  // GET - List all (admin, requires password)
  if (req.method === 'GET') {
    const password = req.query.senha;
    if (password !== (process.env.ADMIN_PASSWORD || 'elfes2025')) {
      return res.status(401).json({ error: 'Senha de admin inválida.' });
    }

    const data = readDB();
    const format = req.query.format;

    if (format === 'csv') {
      const header = 'Data,Nome,Email,Como Conheceu,Satisfação,Aula,Dúvida,Feedback\n';
      const rows = data.map(d =>
        `"${d.data}","${d.nome}","${d.email}","${d.como_conheceu}","${d.satisfacao}","${d.aula}","${d.duvida.replace(/"/g, '""')}","${d.feedback.replace(/"/g, '""')}"`
      ).join('\n');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', 'attachment; filename=duvidas.csv');
      return res.send('\uFEFF' + header + rows);
    }

    return res.json({ total: data.length, duvidas: data.reverse() });
  }

  return res.status(405).json({ error: 'Método não permitido.' });
};
