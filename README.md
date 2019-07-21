# Code Flow - VS Code Extension

**Code Flow** is a Visual Studio Code extension that generates a diagram showing annotated flow between different points within your codebase.

I created this extension as a way to help map out my thoughts around how a codebase, or particular part of a codebase, is structured without having to leave the context of the code to write up a diagram. 

![](https://media.giphy.com/media/THlJRdtu8OkSAhybNj/source.gif)

_tiny gif of usage so this readme doesn't look so empty_

Extension Installation Link: https://marketplace.visualstudio.com/items?itemName=JoshJackson.code-flow-extension

## Contributing

I am happy for any sort of contributions to this project as I believe it is a very useful _idea_ and can undoubtedly be improved via open source contributions. Please feel free to work on whatever you feel can be improved and I will happily go through the pull request!

If you are unsure what to work on, I have added any bugs as well as future features as Github [Issues](https://github.com/Pjaerr/Code-Flow-Extension/issues).

If you wish to contribute, you can follow the getting setup guide below:

### Getting Setup

1. Clone this repository and run `npm install`

2. Run `npm run test` to ensure everything is working as expected (optional)

3. Open the root folder in VS Code

4. Press F5 to debug the extension, this will open a development version of vs code.

**To use the extension:** Press `CTRL + SHIFT + P` to open the command picker, type in `CodeFlow` and press enter.

### Important features that are missing

* Saving a diagram as an image (see: https://github.com/Pjaerr/Code-Flow-Extension/issues/12)

* Exporting the diagram as XML to be used in stuff like Lucid Charts or Draw.io (see: https://github.com/Pjaerr/Code-Flow-Extension/issues/14)
