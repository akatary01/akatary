from pydantic import BaseModel

class ContactRequest(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    
    # addresses
    fromEmail: str
    fromEmailConfirm: str
    reciepientEmails: str

## conf ##
class GmailSmtp(BaseModel):
    email: str
    password: str

    port: int
    server: str

class Secrets(BaseModel):
    gmail_smtp: list[GmailSmtp]

class Cors(BaseModel):
    allow_origins: list[str]
    allow_methods: list[str]

class Config(BaseModel):
    cors: Cors