import cv2
import pickle

import cvzone

width, height = 107, 48

try:
    with open('CarParkPos', 'rb') as f:
        posList = pickle.load(f)
except:
    posList = []

try:
    with open('counter', 'rb') as f2:
        counter = pickle.load(f2)
except:
    counter = []

try:
    with open('my_dict', 'rb') as f3:
        mydict = pickle.load(f3)
except:
    mydict = dict()

z = 1


def mouseclick(events, x, y, flags, params):
    if events == cv2.EVENT_LBUTTONDOWN:
        global z
        posList.append((x, y))
        counter.append((z,x,y))
        mydict[(x,y)] = z
        z += 1
        print(posList)
        print(counter)
        print(mydict)
    if events == cv2.EVENT_RBUTTONDOWN:
                x1, y1 = posList[-1]
                if x1 < x < x1 + width and y1 < y < y1 + height:
                    posList.pop()
                    counter.pop()
                    mydict.pop((x1,y1))
                    if z >= 0:
                        z -= 1

    with open('CarParkPos', 'wb') as f:
        pickle.dump(posList, f)

    with open('counter', 'wb') as f2:
        pickle.dump(counter, f2)

    with open('my_dict', 'wb') as f3:
        pickle.dump(mydict, f3)

while True:
    img = cv2.imread("C:/Users/dines/Downloads/CarParkProject/carParkImg.png")

    for pos in posList:
        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), (255, 0, 255), 2)

    for sub in counter:
        cvzone.putTextRect(img, str(sub[0]), (sub[1] +width, sub[2]), scale=1, thickness=2, offset=4,
                           colorR=(0, 200, 0))

    for count in counter:
        mydict[count[1],count[2]]=[count[0]]

    cv2.imshow("Image", img)
    cv2.setMouseCallback("Image", mouseclick)
    cv2.waitKey(1)
