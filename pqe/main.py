from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import pandas as pd 
import matplotlib.pyplot as plt
import glob 
from utility import delete_csv, get_query_engine, normalize_column_name, get_matplotlib_figure, check_csv_file_exist
from  pydantic import BaseModel
from dotenv import load_dotenv
from io import BytesIO
import base64

# Initial setup 
app = FastAPI()
app.mount('/static',StaticFiles(directory='static'),name='static')
load_dotenv('.env')

df = None

def read_csv_files():
    try : 
        csv_path = glob.glob('static/*.csv')[0]
        globals()["df"] = pd.read_csv(csv_path)
        globals()["df"] = normalize_column_name(globals()["df"])
    except: 
        print("there is no file in the static folder")

read_csv_files()

class Message(BaseModel): 
    msg:str

# Add middleware 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Enpoints 

@app.post('/api/upload')
async def uploadFile(file:UploadFile): 
    save_path = f"static/{file.filename}"
    with open(save_path, "wb") as buffer:
        buffer.write(file.file.read())
    read_csv_files()
    return JSONResponse({'filename':f'{file.filename}'})

@app.post('/api/delete')
async def deleteCsv(): 
    try: 
        delete_csv()
        return JSONResponse({'status':'deleted'})
    except: 
        return JSONResponse({'status':'error'})

@app.post('/api')
async def query_data(message:Message):
    resp_obj = {}
    df = globals()["df"]
    query_engine = get_query_engine(df,verbose=True)
    response = query_engine.query(message.msg)
    resp_obj["result"] = response.response
    pandas_code = response.metadata["pandas_instruction_str"]
    resp_obj["pandas_code"] = pandas_code
    if "plot(" in pandas_code:
        fig = get_matplotlib_figure(df,pandas_code)
        buf = BytesIO()
        fig.savefig(buf,format="png")
        img_data = base64.b64encode(buf.getbuffer()).decode('ascii')
        resp_obj["img"] = img_data   
        resp_obj["result"] = "Your query result contains plot as follow"
    return JSONResponse(resp_obj)

@app.get('/api/checkupload')
async def get_upload_status(): 
    csv_file_name = check_csv_file_exist()
    if csv_file_name: 
        return JSONResponse({'filename':csv_file_name}) 
    return JSONResponse({'filename':'none'})

    