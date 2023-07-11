# Python 3.8.10
from ultralytics import YOLO
from http.server import BaseHTTPRequestHandler, HTTPServer
import cv2
import torch
import json

def main():
    model = YOLO('yolov8x-pose-p6.pt')
    video = cv2.VideoCapture(0)
    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

    class RequestHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            self.send_response(200)

            self.send_header('Content-type','text/html')
            self.end_headers()

            ret, frame = video.read()
            results = model(frame, device=device)
            frame = results[0].plot()
            cv2.imwrite('frame.jpg', frame)
            # self.wfile.write(json.dumps({'data': results[0].keypoints.data.tolist()}).encode('utf-8'))
            self.wfile.write(bytes(str(results[0].keypoints.data.tolist()), 'utf-8'))
            return

    # Server settings
    server_address = ('localhost', 8080)
    httpd = HTTPServer(server_address, RequestHandler)
    print('Starting server...')
    httpd.serve_forever()


if __name__ == '__main__':
    main()
