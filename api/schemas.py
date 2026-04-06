from typing import List

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
    gmail_smtp: List[GmailSmtp]

class Cors(BaseModel):
    allow_origins: List[str]
    allow_methods: List[str]

class Config(BaseModel):
    cors: Cors