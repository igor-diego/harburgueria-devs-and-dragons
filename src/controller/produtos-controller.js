import produtosModel from "../model/produtos.js";

const produtoController = (app) => {
    //rotas ('/produto')

    app.get('/produto', async (req, res)=>{
        try {
            const todosProdutos = await produtosModel.pegaProdutos()
            res.json({
                "produtos" : todosProdutos,
                "erro" : false
            })
        } catch (erro) {
            res.json({
                "msg" : erro.message,
                "erro" : true
            })
        }
    })

    app.get('/produto/id/:id', async (req, res)=>{
        const produtoId = req.params.id
        try {
            const produto = await produtosModel.pegaProdutoById(produtoId)
            res.json({
                "produtos" : produto,
                "erro" : false
            })
        } catch (erro) {
            res.json({
                "msg" : erro.message,
                "erro" : true
            })
        }
    })

    app.get('/produto/nome/:nome', async (req, res)=>{
        const produtoNome = req.params.nome
        try {
            const produto = await produtosModel.pegaProdutoByNome(produtoNome)
            res.json({
                "produtos" : produto,
                "erro" : false
            })
        } catch (erro) {
            res.json({
                "msg" : erro.message,
                "erro" : true
            })
        }
    })

    app.get('/produto/fornecedor/:fornecedor', async (req, res)=>{
        const fornecedor = req.params.fornecedor
        try {
            const produto = await produtosModel.pegaProdutoByFornecedor(fornecedor)
            res.json({
                "produtos" : produto,
                "erro" : false
            })
        } catch (erro) {
            res.json({
                "msg" : erro.message,
                "erro" : true
            })
        }
    })

    app.get('/produto/tipo/:tipo', async (req, res)=>{
        const produtoTipo = req.params.tipo
        try {
            const produto = await produtosModel.pegaProdutoByTipo(produtoTipo)
            res.json({
                "produtos" : produto,
                "erro" : false
            })
        } catch (erro) {
            res.json({
                "msg" : erro.message,
                "erro" : true
            })
        }
    })

    //@@@@@@@@@@@@@@@@@@@@@@@@
    //verificar erro
    //dar continuidade ao POST/CREATE
    app.post('/produto', async (req, res)=>{
        const body = req.body
        try {
            await produtosModel.insereProduto(body.nome_produto, body.valor_produto, body.qtd_produto, body.fornecedor_produto, body.tipo_produto)
            res.json({
                "msg" : "Produto inserido com sucesso",
                "produto" : "",//variável com o novo produto
                "erro" : false
            })
        } catch (erro) {
            res.json({
                "msg" : erro.message,
                "erro" : true
            })
        }
    })

    app.delete('/produto/id/:id', async (req, res)=>{
        const id = req.params.id
        try {
            await produtosModel.deletaProduto(id)
        } catch (error) {
            res.json(
                {"msg" : error.message,
                 "erro" : true}
            )
        }
    })
    
    //@@@@@@@@@@@@@@@@@@@@@@@@
    //dar continuidade ao PUT/UPDATE
    app.put('/produto/id/:id', async (req, res)=>{
        const body = res.body
        const id = req.params.id
        try {
            //criar validação de dados
            await produtosModel.atualizaProduto(id, body.nome, body.valor, body.qtd, body.fornecedor, body.tipo)
            res.json({
                "msg" : "Produto atualizado com sucesso",
                "produto" : "",//variável com o novo produto
                "erro" : false
            })
        } catch (error) {
            res.json(
                {"msg" : error.message,
                 "erro" : true}
            )
        }
    })
}
export default produtoController