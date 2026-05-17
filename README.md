# Smart Parking System - One Slot

A complete beginner-friendly Smart Parking System using NodeMCU ESP8266, HC-SR04 ultrasonic sensor, Firebase Realtime Database, HTML, CSS, vanilla JavaScript, and QR code tickets.

## Features

- Realtime parking status from Firebase: `FREE`, `BOOKED`, `OCCUPIED`
- Realistic dark futuristic parking slot UI
- Green glow for free slot
- Yellow glow for booked slot
- Red glow and car image for occupied slot
- Online booking form with name, vehicle number, start time, and end time
- Automatic price calculation at ₹20 per hour
- Booking saved to Firebase Realtime Database
- QR ticket generation with booking details
- Mobile responsive dashboard
- ESP8266 Arduino sketch with WiFi reconnect and serial distance logs

## Folder Structure

```text
smart-parking/
├── index.html
├── booking.html
├── ticket.html
├── style.css
├── script.js
├── firebase-config.js
├── assets/
│   └── car.png
├── README.md
└── arduino/
    └── smart_parking.ino
```

## Hardware Connections

| HC-SR04 Pin | NodeMCU ESP8266 Pin |
| --- | --- |
| TRIG | D5 |
| ECHO | D6 |
| VCC | VIN |
| GND | GND |

Important: Many HC-SR04 modules output 5V on ECHO. ESP8266 GPIO pins are 3.3V only. For safer hardware, use a voltage divider or level shifter on the ECHO line.

## Firebase Setup

1. Open [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Go to Build -> Realtime Database.
4. Create a database.
5. During testing, you can use test rules:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Use locked-down authenticated rules before using this publicly.

6. Add this starting data in Realtime Database:

```json
{
  "parkingSlot": {
    "status": "free",
    "bookedBy": "",
    "vehicleNumber": "",
    "startTime": "",
    "endTime": "",
    "price": "",
    "bookingId": ""
  }
}
```

7. Go to Project settings -> General -> Your apps.
8. Create a Web app.
9. Copy the Firebase web config into `firebase-config.js`.

## Website Setup

1. Open `firebase-config.js`.
2. Replace the placeholder Firebase values:

```js
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_FIREBASE_APP_ID"
};
```

3. Open `index.html` in a browser or host the folder using Firebase Hosting, Netlify, GitHub Pages, or any static server.

## Booking Flow

1. The dashboard listens to `/parkingSlot` in Firebase.
2. If status is `free`, the slot glows green and the user can book.
3. The user enters name, vehicle number, start time, and end time.
4. The app calculates price using ₹20/hour.
5. On confirmation, `/parkingSlot` is updated to:

```json
{
  "status": "booked",
  "bookedBy": "User Name",
  "vehicleNumber": "MH12AB1234",
  "startTime": "2026-05-17T19:00",
  "endTime": "2026-05-17T21:00",
  "price": "40",
  "bookingId": "SP-..."
}
```

6. The ticket page generates a QR code with booking ID, user name, vehicle number, booking time, slot number, and amount paid.
7. When the sensor detects a vehicle, NodeMCU updates status to `occupied`.
8. When the car leaves, NodeMCU returns the status to `free` and clears booking details.

## Arduino IDE Setup

1. Install ESP8266 board support in Arduino IDE.
2. Select board: NodeMCU 1.0 ESP-12E Module.
3. Install libraries:
   - `ESP8266WiFi`
   - `FirebaseESP8266` by Mobizt
4. Open `arduino/smart_parking.ino`.
5. Replace:

```cpp
#define WIFI_SSID "YOUR_WIFI_NAME"
#define WIFI_PASSWORD "YOUR_WIFI_PASSWORD"
#define FIREBASE_HOST "YOUR_PROJECT_ID-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "YOUR_DATABASE_SECRET_OR_LEGACY_TOKEN"
```

6. Upload the sketch.
7. Open Serial Monitor at `115200` baud.
8. Move an object/car near the sensor and watch distance and Firebase updates.

## Firebase Hosting

Install Firebase CLI once:

```bash
npm install -g firebase-tools
```

Login and initialize hosting:

```bash
firebase login
firebase init hosting
```

Use the current folder as the public directory and answer `No` for single-page app rewrites because this project uses separate HTML files.

Deploy:

```bash
firebase deploy
```

## Tuning Sensor Distance

In `arduino/smart_parking.ino`, adjust:

```cpp
const int OCCUPIED_DISTANCE_CM = 15;
```

Increase it if the car is farther from the sensor. Decrease it if the sensor marks the slot occupied too easily.

## Notes

- This project is designed for one parking slot only.
- The web app uses Firebase CDN scripts and `qrcode.js` CDN.
- Keep Firebase test rules only while learning or demonstrating the project.
