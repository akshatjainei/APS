import uvicorn
from fastapi import FastAPI
import pickle
import script

with open('my_dict', 'rb') as f3:
    mydict = pickle.load(f3)

app = FastAPI()

@app.get('/output')
def output():
    script.main()
    with open('output_list', 'rb') as f:
        list = pickle.load(f)

    with open('output_count', 'rb') as f3:
        count = pickle.load(f3)
    return {'list': list, 'count': count}


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)