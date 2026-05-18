# Translator ES → EN

Offline Spanish-to-English web translator. No API keys, no internet connection required after the first run.

Built with [Node.js](https://nodejs.org), [Express](https://expressjs.com), and [`@xenova/transformers`](https://github.com/xenova/transformers.js) running the `Helsinki-NLP/opus-mt-es-en` ONNX model locally.

## Requirements

- [Node.js](https://nodejs.org) v18 or higher
- npm (bundled with Node.js)
- Internet connection **only on the first run** to download the translation model (~60 MB)

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/mfalcone/translator.git
cd translator

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## First run

On startup the server will automatically download and cache the translation model under `./models/`. This takes a minute depending on your connection. A status indicator in the UI shows when the model is ready.

After the first run the app works **completely offline**.

## Usage

1. Type or paste Spanish text in the left textarea
2. Click **Traducir** (or press `Cmd/Ctrl + Enter`)
3. The English translation appears on the right
4. Click **Copiar traducción** to copy it to the clipboard

## Project structure

```
translator/
├── server.js        # Express server + translation endpoint
├── public/
│   └── index.html   # Single-page UI
└── package.json
```

The `models/` directory is git-ignored. It is created automatically on first run.
