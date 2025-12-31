import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Criar tabela se não existir
async function ensureTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) NOT NULL,
      work_value VARCHAR(100),
      selected_price INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(createTableQuery);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await ensureTable();

    const { name, phone, email, workValue, selectedPrice } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ error: 'Nome, telefone e email são obrigatórios' });
    }

    const insertQuery = `
      INSERT INTO leads (name, phone, email, work_value, selected_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, created_at;
    `;

    const result = await pool.query(insertQuery, [name, phone, email, workValue, selectedPrice]);

    return res.status(201).json({
      success: true,
      message: 'Lead registrado com sucesso',
      data: {
        id: result.rows[0].id,
        createdAt: result.rows[0].created_at
      }
    });
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
