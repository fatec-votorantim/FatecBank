import express from 'express'
import cors from 'cors'
import contasRoutes from './routes/contas.js'

const app = express()
const port = 3001

app.use(cors()) //habilita qq cliente consumir
app.use(express.json()) //define que usaremos JSON

//Rotas da aplicação
app.use('/contas', contasRoutes)
app.listen(port, () => {
    console.log(`🚀Servidor rodando na porta ${port}`)
})