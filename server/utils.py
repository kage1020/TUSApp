import chainer
import numpy as np

def to36M(bones):
    body_parts = {"Nose": 0, "LEye": 1, "REye": 2, "LEar": 3, "REar": 4, "LShoulder": 5, "RShoulder": 6, "LElbow": 7, "RElbow": 8, "LWrist": 9, "RWrist": 10, "LHip": 11, "RHip": 12, "LKnee": 13, "RKnee": 14, "LAnkle": 15, "RAnkle": 16}
    H36M_JOINTS_17 = [
        'Hip',
        'RHip',
        'RKnee',
        'RFoot',
        'LHip',
        'LKnee',
        'LFoot',
        'Spine',
        'Thorax',
        'Neck/Nose',
        'Head',
        'LShoulder',
        'LElbow',
        'LWrist',
        'RShoulder',
        'RElbow',
        'RWrist',
    ]

    adjusted_bones = []
    for name in H36M_JOINTS_17:
        if not name in body_parts:
            if name == 'Hip':
                adjusted_bones.append((bones[body_parts['RHip']] + bones[body_parts['LHip']]) / 2)
            elif name == 'RFoot':
                adjusted_bones.append(bones[body_parts['RAnkle']])
            elif name == 'LFoot':
                adjusted_bones.append(bones[body_parts['LAnkle']])
            elif name == 'Spine':
                adjusted_bones.append(
                    (
                            bones[body_parts['RHip']] + bones[body_parts['LHip']]
                            + bones[body_parts['RShoulder']] + bones[body_parts['LShoulder']]
                    ) / 4
                )
            elif name == 'Thorax':
                adjusted_bones.append(
                    (
                            + bones[body_parts['RShoulder']] + bones[body_parts['LShoulder']]
                    ) / 2
                )
            elif name == 'Head':
                thorax = (
                                 + bones[body_parts['RShoulder']] + bones[body_parts['LShoulder']]
                         ) / 2
                adjusted_bones.append(
                    thorax + (
                            bones[body_parts['Nose']] - thorax
                    ) * 2
                )
            elif name == 'Neck/Nose':
                adjusted_bones.append(bones[body_parts['Nose']])
            else:
                raise Exception(name)
        else:
            adjusted_bones.append(bones[body_parts[name]])

    return adjusted_bones

def create_pose(model, points):
    with chainer.no_backprop_mode(), chainer.using_config('train', False):
        x = points[:, 0::2]
        y = points[:, 1::2]
        z_pred = model(points).data

        pose = np.stack((x, y, z_pred), axis=-1)
        pose = np.reshape(pose, (len(points), -1))

        return pose
