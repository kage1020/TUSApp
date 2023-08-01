# Python 3.8.10
from flask import Flask, request, send_file
from ultralytics import YOLO
import torch
import cv2
import numpy as np
import base64

app = Flask(__name__)

model = YOLO('yolov8n-pose.pt')
video = cv2.VideoCapture(0)
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

@app.get('/')
def get_keypoints():
    ret, frame = video.read()
    if not ret:
        return 'Error: Could not read frame'

    results = model(frame, device=device)
    frame = results[0].plot()
    cv2.imwrite('frame.jpg', frame)

    return results[0].keypoints.data.tolist()

@app.get('/image')
def get_image():
    ret, frame = video.read()
    if not ret:
        return 'Error: Could not read frame'

    results = model(frame, device=device)
    frame = results[0].plot()
    cv2.imwrite('frame.jpg', frame)

    return send_file('frame.jpg', mimetype='image/jpg')

@app.post('/predict')
def predict():
    image = cv2.imdecode(np.frombuffer(base64.b64decode(request.get_json()['image'][23:]), np.uint8), cv2.IMREAD_COLOR)
    result = model(image, device=device)
    image = result[0].plot()
    cv2.imwrite('frame.jpg', image)
    return base64.b64encode(cv2.imencode('.jpg', image)[1]).decode('utf-8')
    # return send_file('frame.jpg', mimetype='image/jpg')










# from http.server import BaseHTTPRequestHandler, HTTPServer
# import cv2
# import torch
# import json

# def main():
#     model = YOLO('yolov8n-pose.pt')
#     video = cv2.VideoCapture(1)
#     device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

#     class RequestHandler(BaseHTTPRequestHandler):
#         def do_GET(self):
#             self.send_response(200)

#             self.send_header('Content-type','text/html')
#             self.end_headers()

#             ret, frame = video.read()
#             results = model(frame, device=device)
#             frame = results[0].plot()
#             cv2.imwrite('frame.jpg', frame)
#             # self.wfile.write(json.dumps({'data': results[0].keypoints.data.tolist()}).encode('utf-8'))
#             self.wfile.write(bytes(str(results[0].keypoints.data.tolist()), 'utf-8'))
#             return

#     # Server settings
#     server_address = ('localhost', 8080)
#     httpd = HTTPServer(server_address, RequestHandler)
#     print('Starting server...')
#     httpd.serve_forever()


# if __name__ == '__main__':
#     main()
