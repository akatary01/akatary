import yaml
from pydantic import BaseModel

class GmailSmtp(BaseModel):
    email: str
    password: str

class Secrets(BaseModel):
    gmail_smtp: list[GmailSmtp]

class Cors(BaseModel):
    allow_origins: list[str]
    allow_methods: list[str]

class Config(BaseModel):
    cors: Cors

with open("conf/secrets.yaml") as f:
    secrets = Secrets(**yaml.safe_load(f))

with open("conf/base.yaml") as f:
    config = Config(**yaml.safe_load(f))
