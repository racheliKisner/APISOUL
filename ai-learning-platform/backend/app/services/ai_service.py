import requests
import os


def generate_lesson(prompt: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "text-davinci-003",
        "prompt": prompt,
        "max_tokens": 150
    }

    response = requests.post("https://api.openai.com/v1/completions", headers=headers, json=data)

    if response.status_code != 200:
        raise Exception("Error in AI response")

    lesson_response = response.json().get("choices")[0].get("text").strip()
    return lesson_response
