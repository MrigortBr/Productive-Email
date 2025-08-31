let idUpload = []

document.body.addEventListener("dragover", (e) => {
            e.preventDefault();

            document.getElementById("drag").style.display = "flex"            
});

document.body.addEventListener("dragleave", (e) => {
            e.preventDefault();      
            if (e.screenX == 0 && e.screenY == 0 && e.layerX == 0 && e.layerY == 0){
                document.getElementById("drag").style.display = "none";  
            }
});
  
document.body.addEventListener("drop", (e) => {
            e.preventDefault();
            document.getElementById("drag").style.display = "none"         
            let dragElement = document.getElementById("drag-progress")

            if (dragElement){
                dragElement.style.display = "flex"
            }else{
                document.getElementById("drag-progress-minimized").id = "drag-progress"
                document.getElementById("drag-button").style.display = "flex"
            }       
            
            if (e.dataTransfer.files.length > 0) {
                const file = e.dataTransfer.files[0];

                if (!validateFile(file)) return
                fileInput = document.getElementById("file")

                fileInput.files = e.dataTransfer.files;

                uploadFile(fileInput.files[0])
            }
});
    
document.getElementById("file").addEventListener("change", (e) => {
            document.getElementById("drag").style.display = "none"     
            
            let dragElement = document.getElementById("drag-progress")
            
            if (dragElement){
                dragElement.style.display = "flex"  
            }else{
                document.getElementById("drag-progress-minimized").style.display = "none"
                document.getElementById("drag-progress-minimized").id = "drag-progress"
                document.getElementById("drag-button").style.display = "flex"
            }

            document.getElementById("drag-progress").style.display = "flex"     
            
            const file = e.target.files[0]

            if (!validateFile(file)) return

            e.target.value = "";

            uploadFile(file)
})

async function uploadFile(file) {
    document.getElementById("file").value = ""

    if (!file) {
        showAlert("Nenhum arquivo selecionado!", "info");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("file", file);
        const timeRequest = new Date().getTime()
        idUpload.push(timeRequest)
        const response = await axios.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(r => {
            showAlert(r.data.message, "success")            
            addUnproductiveOrProductive(r.data.data)
            orderDataAndCreate()


        });

        if (idUpload.length == 1){
            document.getElementById("drag").style.display = "none";
            try {
                document.getElementById("drag-progress").style.display = "none";
            } catch (error) {
                document.getElementById("drag-progress-minimized").style.display = "none";
            }
        }else{
                idUpload.splice(idUpload.indexOf(timeRequest), 1)
        }

    } catch (error) {
        showAlert("Erro ao enviar o arquivo! tente novamente!", "error");
        console.log(error)
        document.getElementById("drag").style.display = "none";
        try {
            document.getElementById("drag-progress").style.display = "none";
        } catch (error) {
            document.getElementById("drag-progress-minimized").style.display = "none";
        }    }
}

function validateFile(file){
    if (!file) {
        document.getElementById("drag-progress").style.display = "none"        
        return false
    }

    const validTypes = ["text/plain", "application/pdf"];
    if (!validTypes.includes(file.type)) {
        showAlert('Apenas arquivos .txt ou .pdf são permitidos!', 'error')
        document.getElementById("drag-progress").style.display = "none"        
        return false;
    }

    return true
}

function maxmize(){
    document.getElementById("drag-progress-minimized").id = "drag-progress"
    document.getElementById("drag-button").style.display = "flex"
}

function minimize(){
    const drag = document.getElementById("drag-progress");
    drag.removeEventListener("click", maxmize)
    drag.id = "drag-progress-minimized"
    document.getElementById("drag-button").style.display = "none"
    setTimeout(() => {
        drag.addEventListener("click", maxmize)
    }, 100);
}

