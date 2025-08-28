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

                if (!file) {
                    document.getElementById("drag-progress").style.display = "none"        
                    return
                }

                const validTypes = ["text/plain", "application/pdf"];
                if (!validTypes.includes(file.type)) {
                    showAlert('Apenas arquivos .txt ou .pdf são permitidos!', 'error')
                    document.getElementById("drag-progress").style.display = "none"        
                    return;
                }

                fileInput = document.getElementById("file")

                fileInput.files = e.dataTransfer.files;

                uploadFile(fileInput.files[0])
            }
        });
    
        document.getElementById("file").addEventListener("change", (e) => {
            document.getElementById("drag").style.display = "none"           
            document.getElementById("drag-progress").style.display = "flex"       
        })

async function uploadFile(file) {
    if (!file) {
        showAlert("Nenhum arquivo selecionado!", "info");
        return;
    }

    try {
        // Cria FormData e adiciona o arquivo
        const formData = new FormData();
        formData.append("file", file);

        // Envia via Axios
        const response = await axios.post("http://127.0.0.1:2000/api/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
                let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                document.getElementById("status-send").innerText = `Enviado: ${percent}%`;
            }
        });

        // Atualiza UI
        document.getElementById("drag").style.display = "none";
        document.getElementById("drag-progress").style.display = "none";
        showAlert("Upload concluído!", "success");

    } catch (error) {
        showAlert("Erro ao enviar o arquivo! tente novamente!", "error");
        document.getElementById("drag").style.display = "none";
        document.getElementById("drag-progress").style.display = "none";
    }
}
