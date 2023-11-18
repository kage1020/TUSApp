# Python 3.8.10
from flask import Flask, request, send_file

from ultralytics import YOLO

from pose3d_gan.bin.evaluation_util import load_model
from pose3d_gan.projection_gan.pose.dataset.pose_dataset_base import Normalization

from utils import to36M, create_pose

import torch
import cv2
import numpy as np
import base64
import chainer


app = Flask(__name__)

video = cv2.VideoCapture(0)
width = 2560
height = 1440
video.set(cv2.CAP_PROP_FOURCC, cv2.VideoWriter_fourcc(*'MJPG'))
video.set(cv2.CAP_PROP_FRAME_WIDTH, width)
video.set(cv2.CAP_PROP_FRAME_HEIGHT, height)
yolo = YOLO('yolov8n-pose.pt')
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
gan = load_model({ 'use_bn': False, 'activate_func': 'leaky_relu' })
chainer.serializers.load_npz('pose3d_gan/sample/gen_epoch_500.npz', gan)

def predict2d(image = None, save = False):
    if image is None:
        ret, frame = video.read()
        if not ret:
            return 'Error: Could not read frame'
        image = cv2.flip(frame, 1)

    results = yolo(image, device=device, max_det=1, classes=0, save=False)
    if save:
        image = results[0].plot()
        cv2.imwrite('frame.jpg', image)

    return results[0].keypoints.xy

def predict3d(image = None, save = False):
    pose2d = predict2d(image, save)
    pose2da = np.array(to36M(pose2d[0].cpu()))
    pose2da = pose2da.reshape(1, -1)
    pose2dn = Normalization.normalize_2d(pose2da)
    pose2d = pose2d[0].cpu().reshape(1, -1)
    pose3d = create_pose(gan, pose2dn)
    pose3d = np.array([ [pose2d[0][i*2], pose2d[0][i*2+1], pose3d[0][i*3+2]] for i in range(17) ]).reshape(1, -1)
    return pose3d


@app.get('/')
def get_index():
    pose = predict3d(save=True)
    return {'pose': pose.ravel().tolist(), 'width': width, 'height': height }

@app.get('/image')
def get_image():
    pose = predict3d(save=True)
    return send_file('frame.jpg', mimetype='image/jpg')

@app.post('/predict')
def post_predict():
    image = cv2.imdecode(np.frombuffer(base64.b64decode(request.get_json()['image'][23:]), np.uint8), cv2.IMREAD_COLOR)
    pose = predict3d(image, save=True)
    return base64.b64encode(cv2.imencode('.jpg', image)[1]).decode('utf-8')


if __name__ == '__main__':
    app.run(port=8080)
