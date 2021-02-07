
/***********************************    ENVIO DE PROBLEMA  ********************************/

let descricao = document.getElementById("txtDescricao");
let local = document.getElementById("txtLocal");
let email = localStorage.getItem("currentUser");
let status = "Cadastrado";
let resposta = "Sem retorno";

// Cdastro de problema
function enviaProblema(event) {
    event.preventDefault();
    if(descricao.value === "" || local.value === ""){
        alert("Favor preencher todos os dados");
    }
    else{
        db.collection("problems").add({
            descricao: descricao.value,
            local: local.value,
            email: email,
            status: status,
            resposta: resposta,
            foto: ""
        })
            .then(function(docRef) {
               let id = docRef.id;
               localStorage.setItem("idProblema", id);
               alert('Problema registrado com sucesso!');
               salvarImagem(id);             
            })
            .catch(function (error) {
                alert('Erro ao registrar o problema', error);
            });
    } 
}

//Salvar imagem
async function salvarImagem(id) {
    let st = firebase.storage();
    var file = document.querySelector("#flFoto").files[0];
    var metadata = { content: file.type }
    let up = st.ref().child(id).put(file,metadata);

    await up.on("state_changed",function(){
        up.snapshot.ref.getDownloadURL()
        .then(function(url){
            if(url != "" || url != undefined || url != null){
                localStorage.setItem("foto",url);
                editarFoto(url);
                return;
            }
            
        });
    });
}

function editarFoto(foto){
    let id = localStorage.getItem("idProblema");

    db.collection("problems").doc(id).update({      
        descricao: descricao.value,
        local: local.value,
        email: email,
        status: status,
        resposta: resposta,
        foto: foto
    });
}


// Editar problem mudar de página
function paginaEditarProblema(event){
    event.preventDefault();

    let idProblem = document.getElementById("txtRemove").value; 
    if(idProblem === ""){
        alert("Favro inserir o id do registro");
    }
    else{
        localStorage.setItem("problemaEditado", idProblem);
        window.location.href = "editarProblem.html";  
    }     
}



// Remover problema
function removeProblema(event) {
    event.preventDefault();
    let idProblem = document.getElementById("txtRemove").value;
    if(idProblem === ""){
        alert("Favro inserir o id do registro");
    }
    else{
        db.collection("problems").doc(idProblem).delete().then(function () {
            alert('Problema removido com sucesso!');
            window.location.reload();
        }).catch(function (error) {
            alert('Erro ao remover registro: ', error);
        });
    }    
}


/***********************************  PODER PÚBLICO  ********************************/

// Responder Usuário
function alterarStatus(event){
    event.preventDefault();

    let idProblem = document.getElementById("txID").value; 
    let status = document.getElementById("slStatus").value;
    let resposta = document.getElementById("txtResposta").value;

    if(idProblem === "" || status === ""){
        alert("Favor preencher todos os campos");
    }
    else{
        db.collection("problems").doc(idProblem).update({
            status: status,
            resposta: resposta
        })
        .then(function() {
             alert('Retorno enviado com sucesso!');
             window.location.reload();
         })
         .catch(function (error) {
             alert('Erro ao enviar o retorno', error);
         });
    }   
}