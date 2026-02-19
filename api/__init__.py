from fastapi import FastAPI

api = FastAPI()

@api.get("/api/mail/contact")
@api.get("/api/mail/send", name='send_mail')
async def send_mail():
    return {"message": "Hello World"}