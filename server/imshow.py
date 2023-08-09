import cv2

cv2.namedWindow('frame', cv2.WINDOW_NORMAL)

while True:
    img = cv2.imread('frame.jpg')
    if img is not None:
        cv2.imshow('frame', img)

        key = cv2.waitKey(200)

        if key == ord('q'):
            break
