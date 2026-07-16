import smtplib
from email.mime.text import MIMEText

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from conf import config, secrets
from schemas import ContactRequest

api = FastAPI(root_path="/api")
api.add_middleware(
    CORSMiddleware,
    allow_origins=config.cors.allow_origins,
    allow_methods=config.cors.allow_methods,
)

@api.get("/mail/contact")
async def contact(request: ContactRequest = Depends()) -> None:
    smtp = next((secret for secret in secrets.gmail_smtp if secret.email == request.fromEmail), None)
    if smtp is None:
        raise HTTPException(status_code=400, detail=f"No SMTP credentials configured for {request.fromEmail}")

    msg = MIMEText(f"From: {request.name} <{request.email}>\n\n{request.message}")

    msg["From"] = smtp.email
    msg["Subject"] = request.subject
    msg["To"] = request.reciepientEmails   

    with smtplib.SMTP(smtp.server, smtp.port) as server:
        server.starttls()
        server.login(smtp.email, smtp.password)
        server.sendmail(smtp.email, request.reciepientEmails.split(","), msg.as_string())

@api.get("/mail/send")
async def send_mail(request: ContactRequest = Depends()) -> None:
    smtp = next((secret for secret in secrets.gmail_smtp if secret.email == request.fromEmail), None)
    if smtp is None:
        raise HTTPException(status_code=400, detail=f"No SMTP credentials configured for {request.fromEmail}")

    msg = MIMEText(f"{request.message}")

    msg["From"] = smtp.email
    msg["Subject"] = request.subject
    msg["To"] = request.reciepientEmails   

    with smtplib.SMTP(smtp.server, smtp.port) as server:
        server.starttls()
        server.login(smtp.email, smtp.password)
        server.sendmail(smtp.email, request.reciepientEmails.split(","), msg.as_string())