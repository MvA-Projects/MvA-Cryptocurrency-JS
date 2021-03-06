let backend = "https://mva-projects.github.io/MvA-Account-Manager-BACKEND/"

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

    fetch(backend+'transfer/' + from + "/" + to + "/" + amount + "/" + password)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            alert(myJson.status);
        });
}

function getWallet() {
    fetch(backend+'information/' + localStorage.address)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            document.getElementById("ww-address").innerHTML = "Address: " + myJson.address;
            document.getElementById("ww-balance").innerHTML = "Balance: " + myJson.balance;
            document.getElementById("transaction").innerHTML = myJson.history[myJson.history.length - 1].hash;
        });
}

function createWallet() {
    if (document.getElementById("create-password").value != null) {
        fetch(backend+'create/' + document.getElementById("create-password").value)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                alert("Success! Write your address down somewhere: " + myJson.address)
                localStorage.address = myJson.address;
                localStorage.password = document.getElementById("create-password").value;
            });
    } else {
        alert("Please enter a password.");
    }

}

function loginWallet() {
    if (document.getElementById("login-address").value != null && document.getElementById("login-password").value) {
        fetch(backend+'login/' + document.getElementById("login-address").value + "/" + document.getElementById("login-password").value)
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
    if (location.href == "./pages/wallet.html") {
        checkForWallet();
    }
})
