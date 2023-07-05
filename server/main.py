# Python 3.8.10
from ultralytics import YOLO
from http.server import BaseHTTPRequestHandler, HTTPServer

def main():
    model = YOLO('server/yolov8x-pose-p6.pt')

    class RequestHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            self.send_response(200)

            self.send_header('Content-type','text/html')
            self.end_headers()

            results = model('server/0001.png', device='cuda:0')
            self.wfile.write(bytes(str(results[0].keypoints.data), 'utf8'))
            return

    # Server settings
    server_address = ('localhost', 8080)
    httpd = HTTPServer(server_address, RequestHandler)
    print('Starting server...')
    httpd.serve_forever()


if __name__ == '__main__':
    main()
