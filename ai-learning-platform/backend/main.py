from IPython.core.debugger import prompt
from fastapi import FastAPI
from app.api.controllers.user_controller import router as user_router
from app.api.controllers.category_controller import router as category_router
from app.api.controllers.sub_category_controller import router as sub_category_router
from app.api.controllers.prompt_controller import router as prompt_router
from app.api.controllers.ai_controller import router as ai_router
app = FastAPI()


app.include_router(user_router, prefix="/api/users", tags=["users"])
app.include_router(category_router, prefix="/api/categories", tags=["categories"])
app.include_router(sub_category_router, prefix="/api/sub_categories", tags=["sub_categories"])
app.include_router(prompt_router, prefix="/api/prompts", tags=["prompts"])

app.include_router(ai_router, prefix="/api/ai", tags=["ai"])
@app.get("/")
def root():
    print("השרת פועל והתגובה התקבלה בהצלחה!")
    return {"message": "ה-API פועל בהצלחה!"}
