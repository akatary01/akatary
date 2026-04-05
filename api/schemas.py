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
    
