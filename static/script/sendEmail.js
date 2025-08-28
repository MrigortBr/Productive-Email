        document.body.addEventListener("dragover", (e) => {
            e.preventDefault();
            document.getElementById("drag").style.display = "flex"            
        });

        document.body.addEventListener("drop", (e) => {
            e.preventDefault();
            document.getElementById("drag").style.display = "none"           
            document.getElementById("drag-progress").style.display = "flex"         
            
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
            document.getElementById("drag-progress").style.display = "flex"     
            
            const file = e.target.files[0]

            if (!validateFile(file)) return

            uploadFile(file)
        })

async function uploadFile(file) {
    if (!file) {
        showAlert("Nenhum arquivo selecionado!", "info");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(r => {
            showAlert(r.data.message, "success")
            addUnproductiveOrProductive(r.data.data)
            orderDataAndCreate()
        });

        document.getElementById("drag").style.display = "none";
        try {
            document.getElementById("drag-progress").style.display = "none";
        } catch (error) {
            document.getElementById("drag-progress-minimized").style.display = "none";
        }

    } catch (error) {
        showAlert("Erro ao enviar o arquivo! tente novamente!", "error");
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
    console.log("max")
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

