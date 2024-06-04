import cv2
import pickle
import cvzone
import numpy as np
import time
import random

# Video feed
cap = cv2.VideoCapture("./carPark.mp4")

with open('CarParkPos', 'rb') as f:
    posList = pickle.load(f)

with open('counter', 'rb') as f2:
    counter = pickle.load(f2)

with open('my_dict', 'rb') as f3:
    mydict = pickle.load(f3)

width, height = 107, 48

empty_spaces = set()


# script.py


def checkParkingSpace(imgPro, img):
    spaceCounter = 0

    for pos in posList:
        x, y = pos
        imgCrop = imgPro[y:y + height, x:x + width]
        count = cv2.countNonZero(imgCrop)

        if count < 900:  # Adjust this threshold as needed
            color = (0, 255, 0)
            thickness = 5
            value_from_dict = mydict.get((x, y), None)
            # Convert list to tuple before adding to the set
            value_as_tuple = tuple(value_from_dict) if value_from_dict is not None else None
            ele = value_as_tuple[0]
            empty_spaces.add(ele)
            spaceCounter += 1
        else:
            color = (0, 0, 255)
            thickness = 2
            value_from_dict = mydict.get((x, y), None)
            # Convert list to tuple before adding to the set
            value_as_tuple = tuple(value_from_dict) if value_from_dict is not None else None
            ele = value_as_tuple[0]
            if empty_spaces.__contains__(ele):
                empty_spaces.remove(ele)

        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), color, thickness)
        cvzone.putTextRect(img, str(count), (x, y + height - 3), scale=1,
                           thickness=2, offset=0, colorR=color)

    for sub in counter:
        cvzone.putTextRect(img, str(sub[0]), (sub[1] + width, sub[2]), scale=1, thickness=2, offset=4,
                           colorR=(0, 200, 0))

    cvzone.putTextRect(img, f'Free: {spaceCounter}/{len(posList)}', (100, 50), scale=3,
                       thickness=5, offset=20, colorR=(0, 200, 0))

    return empty_spaces, spaceCounter


def main():
    ren: int = random.randint(0, 10)
    t_end = time.time() + 1
    while time.time() < t_end:
        if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT):
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        success, img = cap.read()
        imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(imgGray, (3, 3), 1)
        imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                             cv2.THRESH_BINARY_INV, 25, 16)
        imgMedian = cv2.medianBlur(imgThreshold, 5)
        kernel = np.ones((3, 3), np.uint8)
        imgDilate = cv2.dilate(imgMedian, kernel, iterations=1)

        anslist, count = checkParkingSpace(imgDilate, img)
        print(anslist)
        print(count)
        with open('output_list', 'wb') as f:
            pickle.dump(anslist, f)

        with open('output_count', 'wb') as f2:
            pickle.dump(count, f2)

        cv2.imshow("Image", img)
        cv2.waitKey(10)


if __name__ == '__main__':
    main()