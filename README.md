# Kili - AI App Marketplace

Kili is a React-based web application that leverages Hugging Face open-source models to provide AI functionalities such as audio recording, transcription, and translation. It aims to be an AI app marketplace where users can interact with various AI models.

## Features

- **Audio Recording**: Record audio directly within the application.
- **Audio File Upload**: Upload existing audio files (.mp3, .wave) for processing.
- **Transcription**: Transcribe spoken audio into text using the Whisper ASR model.
- **Translation**: Translate transcribed text into various languages using the NLLB-200 model.
- **Real-time Feedback**: Provides loading and downloading status during AI model inference.

## Installation

To set up and run the project locally, follow these steps:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/mohitkothari-dev/Kili.git
    cd Kili
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## Usage

To start the development server and use the application:

1.  **Run the development server**:
    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to the address provided by Vite (usually `http://localhost:5173`).

### How to use the application:

-   **Record Audio**: Click the "Record an audio clip" button to start recording. Click "Stop recording" to finish.
-   **Upload Audio**: Use the file input to upload an `.mp3` or `.wave` file.
-   **Transcribe**: Once audio is available (recorded or uploaded), the application will automatically process it for transcription.
-   **Translate**: After transcription, you can switch to the "Translate" tab and select a target language to translate the transcribed text.

## Technologies Used

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A fast build tool for modern web projects.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Xenova/Transformers.js**: A JavaScript library for running Hugging Face models directly in the browser.
    -   `@xenova/transformers`: Used for both transcription (Whisper) and translation (NLLB-200).
-   **Web Workers**: For offloading heavy AI model inference tasks to background threads, keeping the UI responsive.

## Project Structure

```
.eslintrc.cjs
.gitignore
README.md
index.html
package-lock.json
package.json
postcss.config.js
public/
│   └── vite.svg
src/
│   ├── App.jsx
│   ├── assets/
│   │   └── parrot.svg
│   ├── components/
│   │   ├── FileDisplay.jsx
│   │   ├── Header.jsx
│   │   ├── HomePage.jsx
│   │   ├── Result.jsx
│   │   ├── TranscribeAnimation.jsx
│   │   └── subComponents/
│   ├── index.css
│   ├── main.jsx
│   └── utils/
│       ├── FeatureList.jsx
│       ├── presets.js
│       ├── translate.worker.js
│       └── whisper.worker.js
tailwind.config.js
vite.config.js
```

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
        