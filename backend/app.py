# app.py
import os
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# ========================
# 1. إعداد الـ API KEY
# ========================
openai.api_key = os.getenv("OPENAI_API_KEY")

# ========================
# 2. دوال المساعد الذكي
# ========================

def openai_chat(prompt, system="You are a helpful assistant.", max_tokens=400):
    client = openai.OpenAI()  
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ],
        max_tokens=max_tokens,
        temperature=0.7,
    )
    return response.choices[0].message.content.strip()

# 2.1. تلخيص نص
def generate_summary(text: str) -> str:
    prompt = f"Summarize the following blog post in 2-3 sentences:\n{text}"
    return openai_chat(prompt, system="You summarize text in clear English.", max_tokens=150)

# 2.2. اقتراح عنوان
def generate_title(text: str) -> str:
    prompt = f"Suggest a creative, clear, and relevant title for this blog post:\n{text}"
    return openai_chat(prompt, system="You are an expert blog title generator.", max_tokens=16)

# 2.3. إكمال نص
def generate_content(prompt):
    user_prompt = (
        "Write exactly two concise and clear paragraphs about the following content."
        " Focus on the main idea, avoid extra details, and keep it brief."
        "\n\nContent:\n"
        f"{prompt}"
    )
    return openai_chat(
        user_prompt,
        system="You write short, focused content as requested.",
        max_tokens=1000   # قليل نسبياً، يضمن ما يكتب أكثر من المطلوب
    )

# 2.4. تصحيح القواعد والإملاء
def check_grammar(text: str) -> str:
    prompt = (
        "You are a professional English proofreader."
        "\nCarefully check the following text for real grammar and spelling mistakes only."
        "\nIf you find any, reply with the fully corrected version of the text ONLY (do not explain, do not show corrections, just the fixed text)."
        "\nIf the text is already correct, reply with: No corrections needed."
        "\n\nText:\n"
        f"{text}"
    )
    return openai_chat(
        prompt,
        system="Fix only grammar and spelling mistakes. Ignore style or personal preference. Output ONLY the fixed text or 'No corrections needed.'",
        max_tokens=1000
    )


# ========================
# 3. Endpoints
# ========================

@app.route('/api/generate-summary', methods=['POST'])
def generate_summary_route():
    data = request.get_json() or {}
    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    summary = generate_summary(text)
    return jsonify({'summary': summary})

@app.route('/api/generate-title', methods=['POST'])
def generate_title_route():
    data = request.get_json() or {}
    text = data.get('text', '').strip()
    if not text:
        text = "Blog post about something interesting"
    title = generate_title(text)
    return jsonify({'title': title})

@app.route('/api/generate-content', methods=['POST'])
def generate_content_route():
    data = request.get_json() or {}
    prompt = data.get('prompt', '').strip()
    if not prompt:
        return jsonify({'error': 'No prompt provided'}), 400
    content = generate_content(prompt)
    return jsonify({'content': content})

@app.route('/api/check-grammar', methods=['POST'])
def check_grammar_route():
    data = request.get_json() or {}
    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    corrected = check_grammar(text)
    return jsonify({'corrected': corrected})

# ========================
# 4. Run the app
# ========================

if __name__ == '__main__':
    app.run(debug=True)
