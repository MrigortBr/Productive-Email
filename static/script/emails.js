const unproductiveData = []
const productiveData = []

function newResponse(id){
    let email = productiveData.find((v) => v.id == id)

    if (!email) email = unproductiveData.find((v) => v.id == id)

    document.getElementById("drag-progress").style.display = "flex"         
    document.getElementById("status-send").innerHTML = "Gerando uma nova resposta. aguarde <br><b>obs: Ao gerar uma nova resposta a pagina atualizara, abra o email novamente!</b>"

    axios.patch("/api/newresponse", {id: email.id, message: email.message}).then(
        r => {
            email.response == r.data.data.message
            document.getElementById("drag-progress").style.display = "none"  
            document.getElementById("textResponse").innerText = r.data.data.message
            showAlert(r.data.message, "info")
        }
    )
}

function orderDataAndCreate(){
    unproductiveData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    productiveData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    productiveData.map((element) => {
        addElementUnproductiveOrProductive(element)
    })

    unproductiveData.map((element) => {
        addElementUnproductiveOrProductive(element)
    })
}

function addUnproductiveOrProductive(element){
    if (element.category == "Mensagem de trabalho"){
        productiveData.push(element)
    }else{
        unproductiveData.push(element)
    }
}

function addElementUnproductiveOrProductive(element){
    if (element.category == "Mensagem de trabalho"){
        document.getElementById("emails-container-productive").appendChild(createEmail(element.id, element.sender, element.title, element.created_at))
    }else{
        document.getElementById("emails-container-unproductive").appendChild(createEmail(element.id, element.sender, element.title, element.created_at))
    }
}

function openEmail(id){
    let email = productiveData.find((v) => v.id == id)

    if (!email) email = unproductiveData.find((v) => v.id == id)

    const divEmailOpen = document.createElement('div');
    divEmailOpen.id = "email-open";

    const divAddress = document.createElement('div');
    divAddress.id = "address";

    const pSender = document.createElement('p');
    pSender.id = "sender";
    pSender.innerHTML = `<b>De:</b> ${email.sender}`;

    const button = document.createElement("button");

    button.addEventListener("click", closeEmail);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-x-lg");
    svg.setAttribute("viewBox", "0 0 16 16");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z");

    svg.appendChild(path);

    button.appendChild(svg);

    const pReceiver = document.createElement('p');
    pReceiver.id = "receiver";
    pReceiver.innerHTML = `<b>Para:</b> ${email.receiver}`;

    divAddress.appendChild(pSender);
    divAddress.appendChild(button)
    divAddress.appendChild(pReceiver);

    const divMessage = document.createElement('div');
    divMessage.id = "message";

    const pTitle = document.createElement('p');
    pTitle.id = "message-title";
    pTitle.textContent = email.title;

    const pMessage = document.createElement('p');
    pMessage.textContent = email.message;

    divMessage.appendChild(pTitle);
    divMessage.appendChild(pMessage);

    const divResponse = document.createElement('div');
    divResponse.id = "response";

    const h1Response = document.createElement('h1');
    h1Response.textContent = "Mensagem gerada";

    const pResponse = document.createElement('p');
    pResponse.id = "textResponse"
    pResponse.innerText = email.response;

    const divButtons = document.createElement('div');
    divButtons.id = "buttons";

    const btnGenerate = document.createElement('button');
    btnGenerate.textContent = "Gerar nova resposta";
    btnGenerate.type = "button"
    btnGenerate.addEventListener("click", (e) => {
        e.preventDefault();
        newResponse(id)
    })


    const btnSend = document.createElement('button');
    btnSend.textContent = "Enviar";
    btnSend.addEventListener("click", (e) => {
        const mailtoLink = `mailto:${email.sender}?subject=Resposta ao email: ${email.title}&body=${email.response}`;
        window.location.href = mailtoLink;
    })

    divButtons.appendChild(btnGenerate);
    divButtons.appendChild(btnSend);

    divResponse.appendChild(h1Response);
    divResponse.appendChild(pResponse);
    divResponse.appendChild(divButtons);

    divEmailOpen.appendChild(divAddress);
    divEmailOpen.appendChild(divMessage);
    divEmailOpen.appendChild(divResponse);

    document.getElementById("email-full").innerHTML = ""
    document.getElementById("email-full").appendChild(divEmailOpen)

}

function closeEmail(){
    document.getElementById("email-open").classList.add("close")

    setTimeout(() => {
        document.getElementById("email-full").innerHTML = ""
        createHelpEmail()
    }, 550);
}

function createHelpEmail() {
    const divHelp = document.createElement('div');
    divHelp.id = "help";

    const svgEmail = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEmail.setAttribute("id", "email-svg");
    svgEmail.setAttribute("width", "16");
    svgEmail.setAttribute("height", "16");
    svgEmail.setAttribute("fill", "currentColor");
    svgEmail.setAttribute("class", "bi bi-envelope-check-fill");
    svgEmail.setAttribute("viewBox", "0 0 16 16");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.5 4.5 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586zM16 4.697v4.974A4.5 4.5 0 0 0 12.5 8a4.5 4.5 0 0 0-1.965.45l-.338-.207z");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686");

    svgEmail.appendChild(path1);
    svgEmail.appendChild(path2);

    divHelp.appendChild(svgEmail);

    // Textos estáticos
    const p1 = document.createElement('p');
    p1.textContent = "Selecione um email já enviado para acessá-lo e visualizar possíveis respostas";

    const p2 = document.createElement('p');
    const b = document.createElement('b');
    b.textContent = "ou";
    p2.appendChild(b);

    const p3 = document.createElement('p');
    p3.textContent = "arraste um email (PDF ou TXT) aqui para adicionar um novo.";

    divHelp.appendChild(p1);
    divHelp.appendChild(p2);
    divHelp.appendChild(p3);

    // Botão
    const button = document.createElement('button');
    button.id = "add-email";

    const span = document.createElement('span');
    span.textContent = "Adicionar Email ";

    const svgPlus = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgPlus.setAttribute("width", "16");
    svgPlus.setAttribute("height", "16");
    svgPlus.setAttribute("fill", "currentColor");
    svgPlus.setAttribute("class", "bi bi-plus");
    svgPlus.setAttribute("viewBox", "0 0 16 16");

    const pathPlus = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathPlus.setAttribute("d", "M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4");

    svgPlus.appendChild(pathPlus);
    span.appendChild(svgPlus);
    button.appendChild(span);

    divHelp.appendChild(button);

    document.getElementById("email-full").appendChild(divHelp)
}

function createEmail(id, de, title, date) {
    const divEmail = document.createElement('div');
    divEmail.onclick = function() {
        openEmail(id);
    };
    divEmail.classList.add('email');

    const pDe = document.createElement('p');
    pDe.innerHTML = `<b>De:</b> ${de}`;
    divEmail.appendChild(pDe);

    const pTitulo = document.createElement('p');
    pTitulo.innerHTML = `<b>Titulo:</b> ${title}`;
    divEmail.appendChild(pTitulo);

    const pEnviado = document.createElement('p');
    pEnviado.innerHTML = `<b>Enviado:</b> ${formatDate(date)}`;
    divEmail.appendChild(pEnviado);

    return divEmail;
}

function formatDate(dateString) {
    const date = new Date(dateString);

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // meses começam do 0
    const ano = date.getFullYear();

    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}

function dataRead(data){

    data.forEach(element => {
        addUnproductiveOrProductive(element)
    });

    orderDataAndCreate()

    if (productiveData.length == 0){
        document.getElementById("emails-container-productive").innerHTML = '<p class="no-data">Sem Emails</p>'
    }

    if (unproductiveData.length == 0){
        document.getElementById("emails-container-unproductive").innerHTML = '<p class="no-data">Sem Emails</p>'
    }
}

function clickBar(element){
    const doc = document.getElementById(`${element.id}-container`)
    const attr = doc.getAttribute("attr-state")
    
    const state =  attr == "show" ? "hidden" : "show";

    doc.setAttribute("attr-state", state)

    if (state == "hidden"){
        doc.classList = "productive-container productive-hidden"
    }else{
        doc.classList = "productive-container productive-half"
    }
}

axios.get("/api/listen").then(r => dataRead(r.data.data))

