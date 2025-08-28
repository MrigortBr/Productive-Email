from src.model.EmailModel import EmailModel
from werkzeug.datastructures import FileStorage
from transformers import pipeline

class ServiceEmail:
    def __init__(self):
        self._model = EmailModel()
        self.classifier = pipeline("zero-shot-classification", model="joeddav/xlm-roberta-large-xnli")
        self.pipe = pipeline("text-generation", model="meta-llama/Llama-3.2-1B-Instruct")

    def getEmails(self):
        emails = EmailModel.get_emails()

        return emails
    
    def loadEmail(self, file: FileStorage, src: chr):
        content = file.read().decode("utf-8")

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