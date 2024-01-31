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
    for f in files : 
        os.remove(f)

def check_csv_file_exist(): 
    if len(files)!=0: 
        return os.path.basename(files[0])
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
    fig,ax = plt.subplots()
    exec(code_str)
    return fig
