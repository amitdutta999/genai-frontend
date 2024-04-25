FROM python:3.9

WORKDIR /COOPER_STANDARD_CHAT_V1/backend/

COPY requirements.txt ./

ENV PYTHONPATH=${PYTHONPATH}:${PWD} 
ENV PORT 8080

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python3", "cooper_endpoint.py"]
