var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Projeto = require('./projeto');
var Grupo = require('./grupo');
var port = 8001;
//var ObjectId = require('mongoose').Types.ObjectId;
var db = 'mongodb://localhost/Servidor';
mongoose.connect(db,{ useNewUrlParser: true } );


app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended:true
}));

// CRUD cadastro de usuários

app.get('/grupo', function(req,res){
    console.log('200');
    Grupo.find({},function(err,grupos){
        if(err){
        res.send('Um erro ocorreu');
        console.log ('Ocorreu um problema',err);
    }else{
        console.log("Usuarios");
        res.json(grupos);
    }
    });
});
app.post('/grupo', function(req,res){

    var newgrupo = new Grupo();

    newgrupo.id = req.body.id;
    newgrupo.professores = req.body.professores;
    newgrupo.nome = req.body.nome;
    newgrupo.projetos = req.body.projetos;

    newgrupo.save(function(err,Grupo){
        if(err){
            res.send('Erro em salvar o grupo');
            console.log ('Ocorreu um problema',err);
        }else{
            console.log("grupo");
            res.send("Cadastrado com Sucesso");
        }
    });
});



app.put('/grupo', function(req,res){
    Grupo.findOneAndUpdate(
        {nome:req.body.nome},
        req.body,
        {new:true},
    function(err, Grupo)  {
        if(err){
            console.log ("Ocorreu um erro",err);
            res.send(JSON.stringify('Um erro ocorreu'));
        }else{
            console.log("newgrupo");
           ///res.status(204);
            res.send(JSON.stringify("Alterado com sucesso"));

        }
        });
});

app.delete('/grupo/:nome',function(req,res){
    Grupo.findOneAndRemove({
        nome:req.params.nome,
    },function(err, grupo){
            if(err){
                res.send('Erro ao deletar');
                console.log ('Ocorreu um problema',err);
            }else{
                //console.log(look);
                res.send("Deletado com sucesso");
        }
    });
});




//CRUD projeto

app.get('/projeto', function(req,res){
    console.log('200');
    Projeto.find({},function(err,projeto){
        if(err){
        res.send('Um erro ocorreu');
        
    }else{
        console.log(projeto);
        res.json(projeto);
    }
    });
});


app.post('/projeto',function(req,res){

    var newprojeto = new Projeto();

    newprojeto.projeto = req.body.projeto;

    newprojeto.save(function(err,Projeto){
        if(err){
            res.send('Erro em salvar a projeto');
        }else{
            console.log('projeto');
            res.send('Cadastrado com Sucesso');
        }
    });
});


app.put('/projeto', function(req,res){
    Projeto.findOneAndUpdate(
        {_id:req.body._id },
        req.body,
        {new:true},
    function(err, Projeto){
        if(err){
            console.log (JSON.stringify('Ocorreu um erro',err));
            res.send ("Ocorreu um erro")
        }else{
           
            //res.status(204);
            res.send (JSON.stringify("Alterado com sucesso"));

        }
        });
});

app.delete('/projeto/:projeto', function(req,res){
    Projeto.findOneAndRemove({
        projeto:req.params.projeto,
    },function(err, projeto){
            if(err){
                res.send('Erro ao deletar');
                console.log ('Ocorreu um erro',err);
            }else{
               // console.log(look);
               // res.status(204);
                res.send("Deletado com sucesso");
        }
    });
});






app.listen(port,function(){
    console.log('app na porta: \n' + port);


});