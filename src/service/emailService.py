from src.model.EmailModel import EmailModel
from werkzeug.datastructures import FileStorage
from transformers import pipeline
import PyPDF2
import re
import io

class ServiceEmail:
    def __init__(self):
        self._model = EmailModel()
        self.classifier = pipeline("zero-shot-classification", model="MoritzLaurer/mDeBERTa-v3-base-xnli-multilingual-nli-2mil7")
        self.pipe = pipeline("text-generation", model="meta-llama/Llama-3.2-1B-Instruct")

    def getEmails(self):
        emails = EmailModel.get_emails()

        return emails
    
    def loadEmail(self, file: FileStorage, src: chr):
        content = None

        if file.content_type == "application/pdf":
            textExtracted = self._extract_pdf_content(file)
            content = self._normalize_extracted_text(textExtracted)
        else:
            content = file.read().decode("utf-8", errors="ignore")

        email_data = self._parse_email(content)

        category = self._generateCategory(email_data["message"])
        response = self._generateResponse(email_data["message"])

        data = EmailModel.create(
            category=category,
            response=response,
            sender=email_data["sender"],
            receiver=email_data["receiver"],
            file=src,
            title=email_data["title"],
            message=email_data["message"])
        
        return data
    
    def _extract_pdf_content(self, file: FileStorage):
        reader = PyPDF2.PdfReader(file)
        page = reader.pages[0] 
        text = page.extract_text()

        return text

    def _normalize_extracted_text(self, text: str) -> str:
        # Junta as palavras quebradas (linhas soltas)
        text = re.sub(r"\n+", " ", text)  
        text = re.sub(r"\s+", " ", text).strip()

        # Força quebra de linha entre campos importantes
        text = re.sub(r"(De:.*?)(Para:)", r"\1\n\2", text)
        text = re.sub(r"(Para:.*?)(Assunto:)", r"\1\n\2", text)
        text = re.sub(r"(Assunto:.*?) (Olá)", r"\1\n\n\2", text)

        return text

    def _parse_email(self, content: str):
        lines = content.splitlines()
        headers = {}
        body_lines = []
        blank_found = False

        for line in lines:
            if not blank_found and line.strip() == "":
                blank_found = True
            elif not blank_found:
                if line.startswith("De:"):
                    headers["sender"] = line.replace("De:", "").strip()
                elif line.startswith("Para:"):
                    headers["receiver"] = line.replace("Para:", "").strip()
                elif line.startswith("Assunto:"):
                    headers["title"] = line.replace("Assunto:", "").strip()
            else:
                body_lines.append(line)

        headers["message"] = "\n".join(body_lines).strip()
        return headers

    def _generateCategory(self, data):
        data = data.replace("\n", "")
        labels = ["Mensagem de trabalho", "Mensagem de feriado ou social"]
        result = self.classifier(data, candidate_labels=labels)
        
        catergory = result["labels"][0]
        
        return catergory

    def _generateResponse(self, data):

        messages = [
            {"role": "system", "content": "Você é um assistente útil."},
            {"role": "user", "content": data}]
        
        chatHistory = self.pipe(messages)[0]["generated_text"]

        response = None

        for msg in reversed(chatHistory):
            if msg['role'] == 'assistant':
                response = msg['content']
                break

        return response

    def regenerateResponse(self, id, message):
        response = self._generateResponse(message)
        EmailModel.update(response=response).where(EmailModel.id==id).execute()
        return response



service = ServiceEmail()