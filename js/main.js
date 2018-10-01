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

function checkForWallet() {
    if (localStorage.address != null) {
        document.getElementById('logged-in').style.display = "block";
        document.getElementById('logged-out').style.display = "none";
    } else {
        document.getElementById('logged-in').style.display = "none";
        document.getElementById('logged-out').style.display = "block";
    }
}

setInterval(()=>{
    transactionColors();
    checkForWallet();
})
