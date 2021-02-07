/***********************************    AUTENTICAÇÃO  ********************************/
// Criando usuário
function createUser(event) {
    event.preventDefault();
    email = document.getElementById("txtEmail").value;
    password = document.getElementById("pssSenha").value;
    if(email === "" || password === ""){
        alert("Favor preencher todos os campos");
    }
    else{
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            alert("Usuário criado com sucesso");
            window.location.reload();
        })
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            document.getElementById("errorMessage").innerText = errorMessage;
        });
    }
    
}

//Autenticação do usuário
function authenticateUser(event) {
    event.preventDefault();
    if (firebase.auth().currentUser) {
        firebase.auth().signOut()
    } else {
        let email = document.getElementById("txtEmail").value;
        let password = document.getElementById("pssSenha").value;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function () {
                if (email == 'admin@admin.com') {
                    localStorage.setItem("currentUser", email);
                    window.location.replace("administrador.html");
                }
                else {
                    localStorage.setItem("currentUser", email);
                    window.location.replace("index.html");
                }
            })
            .catch(function (error) {
                console.log("usuário não localizado");
                var errorCode = error.code;
                var errorMessage = error.message;
                document.getElementById("errorMessage").innerText = errorMessage;
            });
    }
}
//Logout
function deslogar(event){
    event.preventDefault();

    firebase.auth().signOut().then(() => {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html"
      }).catch((error) => {
        console.log(error);
      });

}

//Reset de senha
function resetPass(event) {
    event.preventDefault();
    let email = document.getElementById("txtEmail").value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(function () {
            alert("Verifique o seu e-mail");
            deslogar(event);
        })
        .catch(function (error) {
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            document.getElementById("errorMessage").innerText = errorMessage;
        });
}