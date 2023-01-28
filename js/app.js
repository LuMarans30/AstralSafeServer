async function encrypt() {
    var plaintext = document.getElementById("msg").value;

    var json = "";

    var url = "http://localhost:8080/api/encrypt";

    await $.post(url, { plaintext: plaintext },
        function (returnedData) {
            json = returnedData;
        });


    document.getElementById("result").value = json.encrypted;
}

function startVineBoom() {
    var vine = document.createElement("img");
    vine.setAttribute("id", "vine");
    vine.src = "https://media.tenor.com/PNmrRavjo40AAAAM/run.gif";
    vine.style.position = "absolute";
    vine.style.top = "0";
    vine.style.left = "0";
    vine.style.width = "100%";
    vine.style.height = "100%";
    vine.style.zIndex = "9999";

    document.body.appendChild(vine);
}

function stopVineBoom() {
    var vine = document.getElementById("vine");
    vine.remove();
}

async function decrypt() {

    var ciphertext = document.getElementById("msg").value;

    var url = "http://localhost:8080/api/decrypt";

    var json = "";

    await $.post(url, { ciphertext: ciphertext },
        function (returnedData) {
            json = returnedData;
        });


    document.getElementById("result").value = json.plaintext;

    var badwords = "";

    var url1 = "https://raw.githubusercontent.com/napolux/paroleitaliane/master/paroleitaliane/lista_badwords.txt";

    const response = await fetch(url1);
    const data = await response.text();

    badwords = data.split("\n");

    badwords.forEach(element => {
        if (json.plaintext.includes(element)) {

            var url2 = "https://drive.google.com/uc?id=15JhAxQ_Qf6wsnzF7XOFGqDLOArw1wHSb&export=download";
            const audio = new Audio(url2);
            audio.play();
            startVineBoom();
            setTimeout(stopVineBoom, 2000);
        }
    });
}

function copyToClipboard() {
    var copyText = document.getElementById("result");
    navigator.clipboard.writeText(copyText.value);
}