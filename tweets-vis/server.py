import os
import geopandas as gpd
from shapely.geometry import Polygon
from flask import Flask, request, send_from_directory
from  werkzeug.utils import safe_join
from flask_cors import CORS


app = Flask(__name__, static_folder=os.path.abspath('../tweets-vis/app/'))
CORS(app)
geo_network = None
gdf_network = None

@app.route('/', methods=['GET'])
def index():
    return serve_static('index.html')

@app.route('/<path:filename>', methods=['GET'])
def serve_static(filename):
    return send_from_directory(safe_join(app.root_path,'tweets-vis'), filename)

@app.route('/network', methods=['GET'])
def serve_network():
    return load()

@app.route('/distribution', methods=['POST'])
def serve_distribution():
    pass

def load():
    global gdf_network
    global geo_network
    gdf_network = gpd.read_file('./countries_with_count.geojson')
    geo_network = gdf_network.to_json()
    return geo_network

if __name__ == '__main__':
    load()
    app.run(debug=True, host='127.0.0.1', port=8080)