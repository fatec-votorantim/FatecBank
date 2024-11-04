import express from 'express'
import { MONGODB_DB, connectToDatabase } from '../config/db.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const client = await connectToDatabase()
    const contasCollection =
        client.db(MONGODB_DB).collection('contas')
    try {
        const contas = await contasCollection.
            find({}, { projection: { saldo_inicial: 0, movimentacoes: 0 } }).toArray()
        res.status(200).json(contas)
    } catch (error) {
        res.status(500).json({
            error: `Erro ao obter as contas: ${error.message}`
        })
    }
})

router.post('/transferir', async (req, res) => {
    const { deContaId, paraContaId, valor } = req.body
    const client = await connectToDatabase()
    try {
        const result = await transferirFundos(client,
            deContaId, paraContaId, valor)
        if (result.error) {
            return res.status(400).json(result)
        }
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

export default router