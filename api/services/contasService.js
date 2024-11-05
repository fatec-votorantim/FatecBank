import { ObjectId, ReadConcern } from 'mongodb'

async function transferirFundos(client, deContaId, paraContaId, valor) {
    const session = client.startSession()
    try {
        await session.withTransaction(async () => {
            const contasCollection = client.db('fatecBank').collection('contas')
            if (valor < 0) {
                throw new Error('Valor não pode ser negativo')
            }
            await contasCollection.updateOne(
                { _id: ObjectId.createFromHexString(deContaId) },
                {
                    $push: {
                        movimentacoes: {
                            tipo: 'debito',
                            valor: valor,
                            descricao: 'Transferência enviada',
                            data: new Date()
                        }
                    }
                },
                {session}
            )
            await contasCollection.updateOne(
                { _id: ObjectId.createFromHexString(paraContaId) },
                {
                    $push: {
                        movimentacoes: {
                            tipo: 'credito',
                            valor: valor,
                            descricao: 'Transferência recebida',
                            data: new Date()
                        }
                    }
                },
                {session}
            )
            
        },{
        /* Níveis de concern 
        * local - somente local, sem verificar réplicas
        * majority - leitura da maioria das réplicas >50%
        * linearizable - leitura linear. garante consistência
        * available: prioriza a disponibilidade, leitura em outros nós
        * 
        
        readConcern: {level: "majority"},
        writeConcern: {w: "majority"},
        maxCommitTimeMS: 5000 //5 seg 
        */})
        await session.commitTransaction()
        console.log('Transferência efetuada!')
        return {message: 'Transferência efetuada com sucesso'}
    } catch (error){
        //await session.abortTransaction()
        console.log('Ocorreu um erro: '+ error.message)
        return {error: error.message}
    } finally {
        session.endSession()
    }
}

export {transferirFundos}