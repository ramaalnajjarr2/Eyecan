# 👓 Eyecan

<p align="center">
  <img src="assets/logo.png" alt="Eyecan Logo" width="180">
</p>

<h1 align="center">Eyecan</h1>

<p align="center">
  A browser-based assistive technology prototype exploring alternative communication
  through gaze interaction, speech recognition, suggested responses, and voice output.
</p>

<p align="center">
  👁️ Gaze Interaction • 🎙️ Speech Recognition • 💬 Suggested Responses • 🔊 Voice Output • 🌐 Arabic & English
</p>

---

# ⚠️ Prototype Notice

Eyecan is a **prototype**, not a complete or production-ready product.

The current version demonstrates the concept, interface, and interaction flow through a browser-based interactive experience.

Some interactions are simulated, such as using the mouse to represent eye gaze, while other features depend on the capabilities of the user's browser and device.

The purpose of this prototype is to demonstrate the feasibility and direction of the concept and provide a foundation for future development into a complete assistive technology solution.

---

# 📖 Overview

Eyecan is a smart-glasses concept designed to explore alternative communication methods for people who may have difficulty speaking or physically interacting with conventional interfaces while remaining conscious and able to communicate.

The prototype combines gaze interaction, speech recognition, suggested responses, and voice output into a simple browser-based communication experience.

The current prototype focuses on:

* Eye-gaze interaction simulation
* Browser-based speech recognition
* Suggested responses
* Browser-based text-to-speech
* Arabic and English interface support
* Adjustable interaction settings

The current implementation is a **Front-End prototype** and does not require a backend server to run.

---

# ✨ Key Features

* 👁️ **Gaze Interaction Simulation**

  * Uses mouse interaction to simulate eye gaze and dwell time.

* 🎙️ **Speech Recognition**

  * Converts spoken input into text using browser capabilities.

* 💬 **Suggested Responses**

  * Provides contextual response options to simplify communication.

* 🔊 **Text-to-Speech**

  * Converts selected text into spoken audio using browser/device voices.

* 🌐 **Arabic & English Support**

  * Provides an interface supporting both Arabic and English.

* ⚙️ **Adjustable Interaction**

  * Allows interaction settings such as dwell time and voice type to be adjusted.

* 🖥️ **Browser-Based Prototype**

  * Runs directly in a modern web browser without requiring a backend server.

---

# 🔄 Prototype Workflow

The current prototype demonstrates the following interaction flow:

```text
Open Eyecan
     ↓
Enter Smart Glasses Simulation
     ↓
Interact using Mouse-Based Gaze Simulation
     ↓
Activate Microphone
     ↓
Speech Recognition
     ↓
Convert Speech to Text
     ↓
Display Suggested Responses
     ↓
Select a Response
     ↓
Convert Text to Speech
     ↓
Adjust Interaction Settings
```

This workflow demonstrates how the current browser-based prototype could evolve into a real assistive communication system using physical eye-tracking hardware and additional intelligent services.

---

# 🛠️ Technologies Used

## Front-End

* HTML
* CSS
* JavaScript
* React
* TypeScript / TSX
* Vite
* Tailwind CSS

## Interaction & Web APIs

* Browser-based gaze simulation
* Mouse hover and dwell interaction
* Web Speech API
* Speech Recognition
* Speech Synthesis

## Voice & Audio

The prototype uses browser and device speech capabilities for:

* Speech-to-text
* Text-to-speech
* Voice selection

Voice availability may differ depending on the browser, operating system, installed voices, and device configuration.

---

# 🔮 Future Vision

The following technologies represent a possible architecture for developing Eyecan into a complete real-world assistive technology product.

> These technologies are **future development possibilities** and are not claimed to be fully implemented in the current prototype.

## 👓 Real Eye Tracking

Future versions could replace the current mouse-based simulation with real eye-tracking hardware integrated into smart glasses.

Possible capabilities include:

* Real-time eye tracking
* Gaze detection
* Dwell-based selection
* Hands-free interface interaction
* Calibration and personalization

---

## 🤖 AI & Computer Vision

Future versions could integrate Artificial Intelligence and Computer Vision for:

* Real eye tracking
* Environment analysis
* Object detection
* Context understanding
* Intelligent response generation
* Personalized communication assistance

---

## 📱 Companion Application

A future mobile or companion application could provide:

* Accessibility settings
* User preferences
* Saved phrases
* Communication history
* Device configuration
* Personalization

---

## ⚙️ Backend

A future backend could be developed using technologies such as:

### Python + FastAPI

Possible responsibilities include:

* User accounts
* Authentication
* API management
* Data processing
* User preferences
* Database communication
* Integration with intelligent services

---

## ☁️ Cloud & Database

A future production system could use secure cloud infrastructure for:

* User accounts
* Saved phrases
* Preferences
* Data synchronization
* Application data
* Secure service integration

---

# 🧪 Prototype Limitations

The current version does **not** claim to provide:

* Physical smart glasses
* Real eye-tracking hardware
* A production backend
* A production AI system
* Medical-grade functionality
* Clinical validation
* Guaranteed speech recognition across all browsers
* Guaranteed Arabic speech output on every device
* Production cloud infrastructure
* Production-level security

The prototype is intended to demonstrate the **concept, interface, interaction model, and possible future direction** of Eyecan.

---

# 📁 Project Structure

```text
Eyecan
│
├── assets
│   ├── logo.png
│   │
│   ├── screenshots
│   │   ├── home.png
│   │   └── simulation.png
│   │
│   ├── documentation
│   │   ├── Eyecan-Report-AR.pdf
│   │   └── Eyecan-Report-EN.pdf
│   │
│   └── presentation
│       └── Eyecan-Presentation.pptx
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

# 🚀 How to Run

## Requirements

Before running Eyecan, make sure you have:

* **Git**
* **Node.js and npm**
* **Visual Studio Code**
* A modern web browser
* A working microphone if you want to test speech recognition

### Recommended Browsers

* Google Chrome
* Microsoft Edge
* Other browsers with Web Speech API support

> **Note:** Python and FastAPI are not required to run the current prototype. They are part of the future backend vision.

---

## 1. Clone the Repository

Open **Command Prompt (CMD)** or a terminal.

On Windows, you can open CMD by:

1. Pressing `Windows + R`
2. Typing `cmd`
3. Pressing **Enter**

Then navigate to the location where you want to save the project.

For example:

```bash
cd Desktop
```

Clone the repository:

```bash
git clone https://github.com/ramaalnajjarr2/Eyecan.git
```

Then enter the project folder:

```bash
cd Eyecan
```

---

## 2. Open the Front-End Folder

The current Eyecan prototype is located inside the `frontend` folder.

Run:

```bash
cd frontend
```

You should now be inside the folder containing:

```text
package.json
```

---

## 3. Open the Project in Visual Studio Code

If the VS Code command is available, run:

```bash
code .
```

If `code .` does not work:

1. Open **Visual Studio Code**
2. Select **File → Open Folder**
3. Select the `frontend` folder inside the Eyecan project
4. Click **Select Folder**

---

## 4. Open the VS Code Terminal

In Visual Studio Code, select:

```text
Terminal → New Terminal
```

Make sure the terminal is inside:

```text
Eyecan\frontend
```

The path should look similar to:

```text
C:\Users\YourName\Desktop\Eyecan\frontend>
```

---

## 5. Install Dependencies

Run:

```bash
npm install
```

Wait until the installation finishes successfully.

This installs all packages required by the project.

> `npm install` normally needs to be run during the initial setup or whenever the project's dependencies change.

---

## 6. Start the Development Server

Run:

```bash
npm run dev
```

Vite will start the development server.

You should see something similar to:

```text
Local: http://localhost:5173/
```

The port number may be different on your computer.

---

## 7. Open Eyecan

Copy the **Local** address displayed in the terminal.

For example:

```text
http://localhost:5173/
```

Open it in your browser.

🎉 **Eyecan is now running!**

> Always use the exact Local address displayed by Vite if the port is different.

---

## 8. Test the Smart Glasses Simulation

Inside Eyecan:

1. Open the **Smart Glasses Simulation**
2. Try the mouse-based gaze interaction
3. Activate the microphone
4. Allow microphone permission when requested
5. Speak clearly
6. Check the recognized text
7. Explore the suggested responses
8. Select a response
9. Test the voice output
10. Adjust the available interaction settings

---

## 🎙️ Testing Speech Recognition

If speech recognition does not work:

1. Make sure your microphone is connected.
2. Make sure the browser has microphone permission.
3. Check that the correct microphone is selected.
4. Try Google Chrome or Microsoft Edge.
5. Refresh the page.
6. Speak clearly and close to the microphone.

Speech recognition support may vary between browsers and devices.

---

## 🔊 Testing Voice Output

Eyecan uses the speech capabilities provided by the browser and device.

Available voices may differ depending on:

* Browser
* Operating system
* Installed voices
* Device language settings

The current prototype does **not** use a separate Google Text-to-Speech backend.

---

## 🇸🇦 If Arabic Voice Output Does Not Work

If Arabic text does not produce sound:

1. Check that your computer is not muted.
2. Try an English phrase.
3. Try Google Chrome or Microsoft Edge.
4. Check whether an Arabic speech voice is available on your operating system.
5. Refresh the Eyecan page after changing language or voice settings.

> Arabic speech availability depends on the browser and device. If English works while Arabic does not, this does not necessarily mean that there is an issue with the Eyecan code.

---

## 👁️ Gaze Interaction Simulation

The current prototype does **not** use physical eye-tracking hardware.

Instead, the mouse is used to simulate:

* Eye gaze
* Hover interaction
* Dwell time
* Interface selection

This allows the project to demonstrate how gaze-based interaction could work before integrating real eye-tracking hardware.

---

# 📸 Screenshots

The screenshots below provide a visual overview of the Eyecan prototype without requiring installation.

## 🏠 Home Page

<p align="center">
  <img src="assets/screenshots/home.png" width="900" alt="Eyecan Home Page">
</p>

The home page introduces the Eyecan concept, its purpose, main features, technologies, and future vision.

---

## 👓 Smart Glasses Simulation

<p align="center">
  <img src="assets/screenshots/simulation.png" width="900" alt="Eyecan Smart Glasses Simulation">
</p>

The simulation demonstrates the interaction experience, including microphone input, speech recognition, suggested responses, mouse-based gaze simulation, and browser-based voice output.

---

# 📚 Documentation

Complete project documentation is included in this repository.

The documentation covers the project concept, requirements, analysis, design, implementation, and future development.

## 🇸🇦 Arabic Documentation

📄 **[Open Arabic Documentation](assets/documentation/Eyecan-Report-AR.pdf)**

---

## 🇬🇧 English Documentation

📄 **[Open English Documentation](assets/documentation/Eyecan-Report-EN.pdf)**

---

# 🎤 Presentation

The project presentation is also included in the repository.

📎 **[Open Eyecan Presentation](assets/presentation/Eyecan-Presentation.pptx)**

---

# 🌟 Project Vision

Eyecan aims to explore how modern web technologies, gaze interaction, speech recognition, and intelligent systems could be combined to create alternative communication experiences.

The current prototype represents the first step toward that vision.

---

# 👨‍💻 Project Team

Developed as a university software engineering project.

### Team Members

* **Rama Alnajjar** — Full Stack Developer
* **Maryam AlJalakh** — UI/UX Designer
* **Aya Gharaibeh** — AI Engineer
* **Najwa AlJulani** — Project Manager

---

# ❤️ Thank You

Thank you for exploring **Eyecan**.

We hope this prototype provides a clear look at our concept and demonstrates the potential of accessible, gaze-based communication technology.

**Enjoy exploring Eyecan! 👓✨**
