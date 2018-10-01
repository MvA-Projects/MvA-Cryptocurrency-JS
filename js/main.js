function transactionColors() {
    let amounts = document.getElementsByClassName('amount');

    for (let i = 0; i < amounts.length; i++) {
        if (amounts[i].innerHTML.includes("-")) {
            amounts[i].style.color = "#FF0000";
        } else {
            amounts[i].style.color = "#00FF00";
        }
    }
}

function transfer() {
    let from = localStorage.address;
    let to = document.getElementById("transfer-to").value;
    let amount = document.getElementById("transfer-amount").value;
    let password = localStorage.password;

    fetch('http://127.0.0.1:3000/transfer/' + from + "/" + to + "/" + amount + "/" + password)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            alert(myJson.status);
        });
}

function getWallet() {
    fetch('http://127.0.0.1:3000/information/' + localStorage.address)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            console.log(JSON.stringify(myJson));
            document.getElementById("ww-address").innerHTML = "Address: " + myJson.address;
            document.getElementById("ww-balance").innerHTML = "Balance: " + myJson.balance;
            document.getElementById("transactions").innerHTML = myJson.history[myJson.history.length];
        });
}

function createWallet() {
    if (document.getElementById("create-password").value != null) {
        fetch('http://127.0.0.1:3000/create/' + document.getElementById("create-password").value)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                alert("Success! Write your address down somewhere: " + myJson.address)
            });
    } else {
        alert("Please enter a password.");
    }

}

function loginWallet() {
    if (document.getElementById("login-address").value != null && document.getElementById("login-password").value) {
        fetch('http://127.0.0.1:3000/login/' + document.getElementById("login-address").value + "/" + document.getElementById("login-password").value)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                if (myJson.status == "success") {
                    localStorage.address = myJson.address;
                    localStorage.password = document.getElementById("login-password").value;
                } else {
                    alert("Error, incorrect login details.");
                }
            });
    } else {
        alert("Please enter an address and password.");
    }
}

function checkForWallet() {
    if (localStorage.address != null) {
        document.getElementById('logged-in').style.display = "block";
        document.getElementById('logged-out').style.display = "none";
        getWallet();

    } else {
        document.getElementById('logged-in').style.display = "none";
        document.getElementById('logged-out').style.display = "block";
    }
}

setInterval(() => {
    // transactionColors();
    checkForWallet();
})