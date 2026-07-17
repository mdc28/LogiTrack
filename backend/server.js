const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());


// CONEXÃO COM MYSQL

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bxh8412@",
    database: "logitrack"
});


conexao.connect((erro) => {

    if (erro) {
        console.log("Erro ao conectar no MySQL:", erro);
        return;
    }

    console.log("MySQL conectado com sucesso!");

});


// TESTE DO BACKEND

app.get("/", (req, res) => {

    res.send("LogiTrack Backend funcionando!");

});


// CADASTRAR VEÍCULO

app.post("/veiculos", (req, res) => {

    const { identificacao, modelo, tipo, status } = req.body;


    const sql = `
        INSERT INTO veiculos
        (identificacao, modelo, tipo, status)
        VALUES (?, ?, ?, ?)
    `;


    conexao.query(
        sql,
        [identificacao, modelo, tipo, status],

        (erro, resultado) => {

            if (erro) {

                console.log(erro);

                res.status(500).json({
                    erro: "Erro ao salvar veículo"
                });

                return;
            }


            res.json({
                mensagem: "Veículo salvo com sucesso!"
            });

        }
    );

});


// LISTAR VEÍCULOS

app.get("/veiculos", (req, res) => {


    const sql = "SELECT * FROM veiculos";


    conexao.query(sql, (erro, resultados) => {


        if (erro) {

            console.log(erro);

            res.status(500).json({
                erro: "Erro ao buscar veículos"
            });

            return;

        }


        res.json(resultados);


    });


});

// ATUALIZAR VEÍCULO

app.put("/veiculos/:id", (req, res) => {

    const id = req.params.id;

    const { identificacao, modelo, tipo, status } = req.body;


    const sql = `
        UPDATE veiculos
        SET identificacao = ?,
            modelo = ?,
            tipo = ?,
            status = ?
        WHERE id = ?
    `;


    conexao.query(
        sql,
        [identificacao, modelo, tipo, status, id],

        (erro, resultado) => {


            if (erro) {

                console.log(erro);

                res.status(500).json({
                    erro: "Erro ao atualizar veículo"
                });

                return;

            }


            res.json({
                mensagem: "Veículo atualizado com sucesso!"
            });


        }

    );


});

//CADASTRAR CLIENTE
app.post("/clientes", (req, res) => {
    const { nome, documento, telefone, email, cidade, status } = req.body;

    const sql = `
        INSERT INTO clientes
        (nome, documento, telefone, email, cidade, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conexao.query(
        sql,
        [nome, documento, telefone, email, cidade, status],
        (erro, resultado) => {
            if (erro) {
                console.log(erro);
                res.status(500).json({
                    erro: "Erro ao salvar cliente"
                });
                return;
            }

            res.json({
                mensagem: "Cliente salvo com sucesso!"
            });
        }
    );
});

  //LISTAR CLIENTES
  app.get("/clientes", (req, res)=> {
    const sql = "SELECT * FROM clientes";
    conexao.query(sql, (erro, resultados) => {
        if (erro) {
            console.log(erro);
            res.status(500).json({
                erro: "Erro ao buscar clientes"
            });
            return;
        }
        res.json(resultados);
    });
});

// ATUALIZAR CLIENTE

app.put("/clientes/:id", (req, res) => {

    const id = req.params.id;

    const { nome, documento, telefone, email, cidade, status } = req.body;


    const sql = `
        UPDATE clientes
        SET nome = ?,
            documento = ?,
            telefone = ?,
            email = ?,
            cidade = ?,
            status = ?
        WHERE id = ?
    `;


    conexao.query(
        sql,
        [
            nome,
            documento,
            telefone,
            email,
            cidade,
            status,
            id
        ],

        (erro, resultado) => {

            if (erro) {

                console.log(erro);

                res.status(500).json({
                    erro: "Erro ao atualizar cliente"
                });

                return;

            }


                    res.json({
            mensagem: "Cliente atualizado com sucesso!"
        });

    }

    );

});


// CADASTRAR FRETE

app.post("/fretes", (req, res) => {

    const { 
        cliente_id,
        veiculo_id,
        origem,
        destino,
        data_frete,
        valor,
        status
    } = req.body;

    const sql = `
        INSERT INTO fretes
        (cliente_id, veiculo_id, origem, destino, data_frete, valor, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    conexao.query(
        sql,
        [
            cliente_id,
            veiculo_id,
            origem,
            destino,
            data_frete,
            valor,
            status
        ],

        (erro, resultado) => {
            if (erro) {
                console.log(erro);
                res.status(500).json({
                    erro: "Erro ao salvar frete"
                });

                return;

            }
            res.json({
                mensagem: "Frete salvo com sucesso!"
            });


        }

    );


});


/// LISTAR FRETES

app.get("/fretes", (req, res) => {

    const sql = `
        SELECT
            fretes.id,
            clientes.nome AS cliente,
            veiculos.identificacao AS veiculo,
            fretes.origem,
            fretes.destino,
            fretes.data_frete,
            fretes.valor,
            fretes.status
        FROM fretes
        INNER JOIN clientes
            ON fretes.cliente_id = clientes.id
        INNER JOIN veiculos
            ON fretes.veiculo_id = veiculos.id
    `;

    conexao.query(sql, (erro, resultados) => {

        if (erro) {

            console.log(erro);

            res.status(500).json({
                erro: "Erro ao buscar fretes"
            });

            return;

        }

        res.json(resultados);

    });

});

// CADASTRAR ENTREGA

app.post("/entregas", (req, res) => {

    const {
        frete_id,
        cliente_id,
        data_entrega,
        endereco,
        responsavel,
        status
    } = req.body;


    const sql = `
        INSERT INTO entregas
        (frete_id, cliente_id, data_entrega, endereco, responsavel, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `;


    conexao.query(
        sql,
        [
            frete_id,
            cliente_id,
            data_entrega,
            endereco,
            responsavel,
            status
        ],

        (erro, resultado) => {


            if (erro) {

                console.log(erro);

                res.status(500).json({
                    erro: "Erro ao salvar entrega"
                });

                return;

            }


            res.json({
                mensagem: "Entrega salva com sucesso!"
            });


        }

    );


});




// LISTAR ENTREGAS

app.get("/entregas", (req, res) => {


    const sql = `

        SELECT

            entregas.id,

            clientes.nome AS cliente,

            fretes.destino,

            entregas.data_entrega,

            entregas.status


        FROM entregas


        INNER JOIN clientes

            ON entregas.cliente_id = clientes.id


        INNER JOIN fretes

            ON entregas.frete_id = fretes.id

    `;



    conexao.query(sql, (erro, resultados) => {


        if (erro) {

            console.log(erro);


            res.status(500).json({

                erro: "Erro ao buscar entregas"

            });


            return;

        }


        res.json(resultados);


    });



});




// ATUALIZAR ENTREGA

app.put("/entregas/:id", (req, res) => {


    const id = req.params.id;


    const {

        data_entrega,
        endereco,
        responsavel,
        status

    } = req.body;



    const sql = `

        UPDATE entregas

        SET data_entrega = ?,

            endereco = ?,

            responsavel = ?,

            status = ?

        WHERE id = ?

    `;



    conexao.query(

        sql,

        [

            data_entrega,

            endereco,

            responsavel,

            status,

            id

        ],


        (erro, resultado) => {


            if (erro) {


                console.log(erro);


                res.status(500).json({

                    erro: "Erro ao atualizar entrega"

                });


                return;


            }



            res.json({

                mensagem: "Entrega atualizada com sucesso!"

            });



        }


    );


});

// DADOS DO PAINEL

app.get("/dashboard", (req, res) => {


    const sql = `

SELECT

(SELECT COUNT(*) FROM clientes) AS clientes,

(SELECT COUNT(*) FROM veiculos) AS veiculos,

(SELECT COUNT(*) FROM fretes) AS fretes,

(SELECT COUNT(*) FROM entregas) AS entregas,

(SELECT COUNT(*) FROM fretes WHERE status = 'Em transporte') AS viagens,

(SELECT COUNT(*) FROM entregas WHERE status <> 'Concluída') AS pendentes

`;



    conexao.query(sql, (erro, resultado) => {


        if (erro) {

            console.log(erro);

            res.status(500).json({
                erro: "Erro ao carregar painel"
            });

            return;

        }


        res.json(resultado[0]);


    });


// DADOS DO PAINEL DE CONTROLE

app.get("/dashboard", (req, res) => {

    const sql = `

        SELECT

        (SELECT COUNT(*) FROM clientes) AS clientes,

        (SELECT COUNT(*) FROM veiculos) AS veiculos,

        (SELECT COUNT(*) FROM fretes) AS fretes,

        (SELECT COUNT(*) FROM entregas) AS entregas,

        (SELECT COUNT(*) FROM fretes WHERE status = 'Em transporte') AS viagens,

        (SELECT COUNT(*) FROM entregas WHERE status <> 'Concluída') AS pendentes

    `;


    conexao.query(sql, (erro, resultado) => {


        if (erro) {

            console.log("Erro no painel:", erro);

            res.status(500).json({
                erro: "Erro ao carregar painel"
            });

            return;

        }


        res.json(resultado[0]);


    });


});

});

    // INICIAR SERVIDOR

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`);

});

// ATUALIZAR FRETE

app.put("/fretes/:id", (req, res) => {

    const id = req.params.id;

    const {
        origem,
        destino,
        data_frete,
        valor,
        status
    } = req.body;


    const sql = `
        UPDATE fretes
        SET origem = ?,
            destino = ?,
            data_frete = ?,
            valor = ?,
            status = ?
        WHERE id = ?
    `;


    conexao.query(
        sql,
        [
            origem,
            destino,
            data_frete,
            valor,
            status,
            id
        ],

        (erro, resultado) => {


            if (erro) {

                console.log(erro);

                res.status(500).json({
                    erro: "Erro ao atualizar frete"
                });

                return;

            }


            res.json({
                mensagem: "Frete atualizado com sucesso!"
            });


        }

    );


});
