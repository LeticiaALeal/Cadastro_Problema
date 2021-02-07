// Listagem dos problemas do usuário corrente

window.addEventListener ("load",function() {

    if (window.location.pathname === "/C:/Users/letic/Documents/IFSP/DEVWEB/Projeto2/index.html"){
        listaProblema();
        return;
    }
    listarGeral();   
})

function listaProblema(){
    let tabela = document.getElementById("tabela1");
    let linha = tabela.insertRow(-1);
    let col0 = linha.insertCell(0);
    let col1 = linha.insertCell(1);
    let col2 = linha.insertCell(2);
    let col3 = linha.insertCell(3);
    let col4 = linha.insertCell(4);
    let col5 = linha.insertCell(5);

    col0.appendChild(document.createTextNode("ID"));
    col1.appendChild(document.createTextNode("Local"));
    col2.appendChild(document.createTextNode("Descrição"));
    col3.appendChild(document.createTextNode("Status"));
    col4.appendChild(document.createTextNode("Retorno"));
    col5.appendChild(document.createTextNode("Foto"));

    let emailUser = localStorage.getItem("currentUser");

    db.collection("problems").where('email', '==', emailUser).get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {

                let linha = tabela.insertRow(-1);
                let col0 = linha.insertCell(0);
                let col1 = linha.insertCell(1);
                let col2 = linha.insertCell(2);
                let col3 = linha.insertCell(3);
                let col4 = linha.insertCell(4);
                let col5 = linha.insertCell(5);

                col0.appendChild(document.createTextNode(doc.id));
                col1.appendChild(document.createTextNode(doc.data().local));
                col2.appendChild(document.createTextNode(doc.data().descricao));
                col3.appendChild(document.createTextNode(doc.data().status));
                col4.appendChild(document.createTextNode(doc.data().resposta));
                let imagem = document.createElement("img");
                imagem.src = doc.data().foto;
                imagem.id = "idImagem";
                col5.appendChild(imagem);
            });

        })
}

//Listar todos os problemas
function listarGeral() {

    let tabela = document.getElementById("tabela2");
    let linha = tabela.insertRow(-1);
    let col0 = linha.insertCell(0);
    let col1 = linha.insertCell(1);
    let col2 = linha.insertCell(2);
    let col3 = linha.insertCell(3);
    let col4 = linha.insertCell(4);
    let col5 = linha.insertCell(5);

    col0.appendChild(document.createTextNode("ID"));
    col1.appendChild(document.createTextNode("Local"));
    col2.appendChild(document.createTextNode("Descrição"));
    col3.appendChild(document.createTextNode("Status"));
    col4.appendChild(document.createTextNode("Usuário"));
    col5.appendChild(document.createTextNode("Foto"));

    db.collection("problems").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

            let linha = tabela.insertRow(-1);
            let col0 = linha.insertCell(0);
            let col1 = linha.insertCell(1);
            let col2 = linha.insertCell(2);
            let col3 = linha.insertCell(3);
            let col4 = linha.insertCell(4);
            let col5 = linha.insertCell(5);

            col0.appendChild(document.createTextNode(doc.id));
            col1.appendChild(document.createTextNode(doc.data().local));
            col2.appendChild(document.createTextNode(doc.data().descricao));
            col3.appendChild(document.createTextNode(doc.data().status));
            col4.appendChild(document.createTextNode(doc.data().email));
            let imagem = document.createElement("img");
            imagem.src = doc.data().foto;
            imagem.id = "idImagem";
            col5.appendChild(imagem);
            

        });
    });

}