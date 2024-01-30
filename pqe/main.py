from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
import pandas as pd 
import matplotlib.pyplot as plt
import glob 
from utility import delete_csv, get_query_engine, normalize_column_name, get_matplotlib_figure
from  pydantic import BaseModel
from dotenv import load_dotenv
from io import BytesIO
import base64

# Initial setup 
app = FastAPI()
app.mount('/static',StaticFiles(directory='static'),name='static')
load_dotenv('.env')

try : 
    csv_path = glob.glob('static/*.csv')[0]
    df = pd.read_csv(csv_path)
    df = normalize_column_name(df)
except: 
    print("error occured during reading csv_path")

class Message(BaseModel): 
    msg:str


# Enpoints 

@app.get('/api')
async def home(): 
    return JSONResponse(df.to_json())

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
    