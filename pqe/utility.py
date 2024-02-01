import os 
from glob import glob 
from llama_index.query_engine import PandasQueryEngine
import matplotlib.pyplot as plt 
import re
import pandas as pd
from dotenv import load_dotenv

load_dotenv('.env')



static_path = 'static/*.csv'
files = glob(static_path)

def delete_csv(): 
    for f in globals()["files"] : 
        os.remove(f)

def check_csv_file_exist(): 
    file_length = len(globals()["files"])
    print(file_length)
    if file_length!=0: 
        return os.path.basename(globals()["files"][0])
    return None

def normalize_column_name(df): 
    for f in df.columns: 
        new_name = f.lower()
        new_name = re.sub(' ','_',new_name)
        df.rename(columns={f:new_name},inplace=True)
    return df

def get_query_engine(df,verbose=True): 
    query_engine = PandasQueryEngine(df=df, verbose=verbose)
    return query_engine

def get_matplotlib_figure(df,code_str): 
    code_final = f"ax={code_str}"
    localdict = {
        'df':df
    }
    exec(code_final,globals(),localdict)
    ax = localdict["ax"]
    fig = ax.get_figure()
    fig.set_size_inches((16,12))
    return fig
