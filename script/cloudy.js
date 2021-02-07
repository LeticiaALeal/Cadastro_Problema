window.addEventListener ("load",function() {

    let id = localStorage.getItem("problemaEditado");

    let ds = document.getElementById("txtDescricao");
    let lc = document.getElementById("txtLocal"); 
    let im = document.getElementById("flFoto");
    im.type = "url";
   /* let botao = document.createElement("file");
    botao.innerHTML = "Alterar";
    im.appendChild(botao);*/

    var docRef = db.collection("problems").doc(id)
    docRef.get().then(function(doc){

        ds.innerText = doc.data().descricao;
        lc.value = doc.data().local;      
        im.value = doc.data().foto;
        localStorage.setItem("foto", im.value);
        console.log("foto:"+im.value);
    });
   
});

// Editar problem
function editarProblema(event){
    event.preventDefault();

    let id = localStorage.getItem("problemaEditado");
    let descricao = document.getElementById("txtDescricao").value;
    let local = document.getElementById("txtLocal").value;
    let foto = localStorage.getItem("foto");


    if(foto === undefined || foto === null){
        foto = " ";
    }

    if(descricao === "" || local === ""){
        alert("Favor preencher todos os dados");
    }
    else{
        db.collection("problems").doc(id).update({
            descricao: descricao,
            local: local,
            foto: foto
        })
        .then(function() {
             alert('Problema alterado com sucesso!');
         })
         .catch(function (error) {
             alert('Erro ao editar o problema', error);
         });
    }
 
}

