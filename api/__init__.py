import smtplib
from email.mime.text import MIMEText

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from conf import config, secrets
from api.schemas import ContactRequest

api = FastAPI()

api.add_middleware(
    CORSMiddleware,
    allow_origins=config.cors.allow_origins,
    allow_methods=config.cors.allow_methods,
)

@api.get("/api/mail/contact")
async def send_mail(request: ContactRequest = Depends()) -> None:
    if request.fromEmail != request.fromEmailConfirm:
        raise HTTPException(status_code=400, detail="fromEmail does not match fromEmailConfirm")

    smtp = next((s for s in secrets.gmail_smtp if s.email == request.fromEmail), None)
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
    