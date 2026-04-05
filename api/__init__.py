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
async def send_mail(req: ContactRequest = Depends()):
    if req.fromEmail != req.fromEmailConfirm:
        raise HTTPException(status_code=400, detail="fromEmail does not match fromEmailConfirm")

    smtp = next((s for s in secrets.gmail_smtp if s.email == req.fromEmail), None)
    if smtp is None:
        raise HTTPException(status_code=400, detail=f"No SMTP credentials configured for {req.fromEmail}")

    msg = MIMEText(f"From: {req.name} <{req.email}>\n\n{req.message}")
    msg["From"] = smtp.email
    msg["Subject"] = req.subject
    msg["To"] = req.reciepientEmails

    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login(smtp.email, smtp.password)
        server.sendmail(smtp.email, req.reciepientEmails.split(","), msg.as_string())

    return {"ok": True}