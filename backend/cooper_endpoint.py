'''
# Copyright 2023 Google LLC. This software is provided as-is, without warranty
# or representation for any use or purpose. Your use of it is subject to your
# agreement with Google.
'''


import json 

from fastapi import FastAPI, Request, Cookie
from cooper import qna_main, reset, default_retrieval_qa_with_conversational, default_chat_history
import nest_asyncio
import uvicorn
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware


def cooper_bknd(query:str = "What is a retainer"):
    app = FastAPI(
        title="Cooper Std Q&A",
        description="Q&A application for Cooper Std CAD Guidelines PDFs",
        version="0.0.1",
    )

    #Middleware to handle CORS
    app.add_middleware(
        CORSMiddleware,
        # allow_origins=origins,
        allow_origin_regex=".*",
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
        )

    @app.get("/")
    async def root(request: Request):
        q = request.query_params['query']
        if 'reset' in request.query_params:
            print('resetting LLM.')
            chat_history, retrieval_qa_with_conversational = reset()
        else:
            retrieval_qa_with_conversational = default_retrieval_qa_with_conversational
            chat_history = default_chat_history

        return json.dumps(qna_main(False, q, retrieval_qa_with_conversational, chat_history))

    nest_asyncio.apply()

    if __name__ == "__main__":
        response = uvicorn.run(app, host="0.0.0.0", port=8080)
        
    return response


if __name__ == "__main__":
    response = cooper_bknd()
