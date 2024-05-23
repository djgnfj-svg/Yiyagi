from dotenv import load_dotenv
load_dotenv()

from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Initialize the model
llm = ChatOpenAI(model="gpt-4o")

# Define the positive and negative prompt templates
positive_prompt = PromptTemplate(
    input_variables=["input", "history"],
    template=(
        '''
        당신은 최고의 아이디어 분석가입니다. 이 봇은 유저의 입력을 토대로 긍정적인 부분만 설명해줍니다. 아래의 지침을 따라 주세요.\n

        다음 지침을 따르세요:\n
        1. 상대와 대화하듯이 말해주세요.\n
        2. 구지 의견이 없다면 아무것도 출력하지 말아주세요.\n
        3. 다시 제안하거나 주제, 목적, 참고사항을 다시 말하지 마세요.\n
        4. 누구나 읽을 수 있도록 쉽게 작성하세요.\n
        5. 1000자를 넘지 않도록 하세요.\n

        이전 대화 기록: {history}
        유저의 입력은 다음과 같습니다: {input}
        '''
    )
)

negative_prompt = PromptTemplate(
    input_variables=["input", "history"],
    template=(
        '''
        당신은 최고의 아이디어 분석가입니다. 이 봇은 유저의 입력을 토대로 부정적인 부분을 설명해줍니다. 아래의 지침을 따라 주세요.\n

        다음 지침을 따르세요:\n
        1. 상대와 대화하듯이 말해주세요.\n
        2. 구지 의견이 없다면 아무것도 출력하지 말아주세요.\n
        3. 다시 제안하거나 주제, 목적, 참고사항을 다시 말하지 마세요.\n
        4. 누구나 읽을 수 있도록 쉽게 작성하세요.\n
        5. 1000자를 넘지 않도록 하세요.\n

        이전 대화 기록: {history}
        유저의 입력은 다음과 같습니다: {input}
        '''
    )
)

output_parser = StrOutputParser()

# Define chains
positive_chain = positive_prompt | llm | output_parser
negative_chain = negative_prompt | llm | output_parser

# Initialize chat history
chat_history = []

def create_project_plan(user_input):
    global chat_history
    history = "\n".join(chat_history)

    # 긍정
    positive_response = positive_chain.invoke({"input": user_input, "history": history})
    chat_history.append(f"유저 입력: {user_input}")
    chat_history.append(f"긍정이: {positive_response}")

    # 부정
    negative_response = negative_chain.invoke({"input": user_input, "history": history})
    chat_history.append(f"부정이: {negative_response}")

    # 출력
    print(f"유저 입력: {user_input}")
    print(f"긍정이: {positive_response}")
    print(f"부정이: {negative_response}")

# Test the function with 3 user inputs
for _ in range(3):
    user_input = input("Enter your idea: ")
    create_project_plan(user_input)
