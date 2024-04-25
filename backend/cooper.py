'''
# Copyright 2023 Google LLC. This software is provided as-is, without warranty
# or representation for any use or purpose. Your use of it is subject to your
# agreement with Google.
'''


import os
import datetime
import vertexai

from langchain.llms import VertexAI
from langchain.retrievers import GoogleVertexAISearchRetriever,GoogleVertexAIMultiTurnSearchRetriever
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain


from config import params
from prompt import prompt_template

PROJECT_ID = params.get('PROJECT_ID', 'not set')
DATA_STORE_LOCATION = params.get('DATA_STORE_LOCATION', 'not set')
DATA_STORE_ID = params.get('DATA_STORE_ID', 'not set')
DATASTORE_NAMESPACE = params.get('DATASTORE_NAMESPACE', 'not set')
REGION = params.get('REGION', 'not set')
MODEL = params.get('MODEL', 'not set')
BUCKET = params.get('BUCKET', 'not set')
AUTHENTICATED_URI_PREFIX = params.get('AUTHENTICATED_URI_PREFIX', 'not set')

os.environ["DATA_STORE_ID"] = DATA_STORE_ID
os.environ["PROJECT_ID"] = PROJECT_ID
os.environ["LOCATION_ID"] = DATA_STORE_LOCATION
os.environ["REGION"] = REGION
os.environ["MODEL"] = MODEL


prompt = PromptTemplate(
    template=prompt_template, input_variables=["context", "question"]
)

def reset():
    vertexai.init(project=PROJECT_ID, location=REGION)
    chat_history = []
    memory_conversational = ConversationBufferMemory(
        memory_key="chat_history", return_messages=True, output_key="answer"
    )
    retriever = GoogleVertexAISearchRetriever(
        project_id=PROJECT_ID,
        location_id=DATA_STORE_LOCATION,
        data_store_id=DATA_STORE_ID,
        get_extractive_answers=True,
        max_documents=2,
        max_extractive_segment_count=1,
        max_extractive_answer_count=5,
    )

    llm = VertexAI(model_name=MODEL, temperature=0.0)

    retrieval_qa_with_conversational = ConversationalRetrievalChain.from_llm(
    llm=llm,
    combine_docs_chain_kwargs={"prompt": prompt},
    retriever=retriever,
    memory=memory_conversational,
    return_source_documents=True,
    )
    return chat_history, retrieval_qa_with_conversational

default_chat_history, default_retrieval_qa_with_conversational = reset()
retrieval_qa_with_conversational = default_retrieval_qa_with_conversational

start_time = datetime.datetime.now()

def qna_main(create_ground_truth_excel, query, retrieval_qa_with_conversational, chat_history):
    response = {}

    def get_source_uri(gcs_uri):
        get_source = "".join("".join(gcs_uri.split("//")[1:]).split(":")[:-1]).replace(
            " ", "%20"
        )
        get_page_number = gcs_uri.split(":")[-1]
        url = f"{AUTHENTICATED_URI_PREFIX}{get_source}#page={get_page_number}"
        return url

    source_url = []
    results_conversational = retrieval_qa_with_conversational(
        {"question": query, "chat_history": chat_history}
    )
    for source_doc in results_conversational["source_documents"]:
        url = get_source_uri(source_doc.metadata["source"])
        if url not in source_url:
            source_url.append(url)

    source_url = "\n\n".join(source_url)

    response["Question"] = query
    response["Answer"] = results_conversational["answer"]
    response["Reference_Documents"] = source_url
    end_time = datetime.datetime.now()
    print(f"time taken to run qna_main: {end_time-start_time}")
    return response


if __name__ == "__main__":
    create_ground_truth_excel = False
    query, results_conversational, source_url = qna_main(
        create_ground_truth_excel, query
    )
