use('fatecBank')
const contas = [{
    "numero": "12345",
    "nome": "João da Silva",
    "cpf": "182.481.718-49",
    "saldo_inicial": 1000.00,
    "movimentacoes": [
        {
            "tipo": "credito",
            "valor": 500.00,
            "descricao": "Depósito em dinheiro",
            "data": ISODate('2024-08-14T10:00:00Z')
        },
        {
            "tipo": "debito",
            "valor": 214.39,
            "descricao": "Pagamento CPFL",
            "data": ISODate('2024-08-18T10:00:00Z')
        }
    ]
},
{
    "numero": "54321",
    "nome": "Maria Gomes Sá",
    "cpf": "189.815.189-54",
    "saldo_inicial": 5214.00,
    "movimentacoes": [
        {
            "tipo": "credito",
            "valor": 5000.00,
            "descricao": "Depósito em dinheiro",
            "data": ISODate('2024-02-01T10:00:00Z')
        },
        {
            "tipo": "debito",
            "valor": 102.00,
            "descricao": "Pagamento Água",
            "data": ISODate('2024-03-18T10:00:00Z')
        }
    ]
}
]

db.contas.insertMany(contas)

//testando se inseriu...
use('fatecBank')
db.contas.find()
