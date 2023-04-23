# Code Flow - VS Code Extension

**Code Flow** is a Visual Studio Code extension that generates a diagram showing annotated flow between different points within your codebase.

I created this extension as a way to help map out my thoughts around how a codebase, or particular part of a codebase, is structured without having to leave the context of the code to write up a diagram.

![](https://media.giphy.com/media/THlJRdtu8OkSAhybNj/source.gif)

Extension Installation Link: https://marketplace.visualstudio.com/items?itemName=JoshJackson.code-flow-extension

## How To Use

The way this extension works is you select a line within a file in your codebase, give that line a **name** and some extra **detail** about what the line does. Once you have a line, also called a Data Point, you can then select the next Data Point, this is the one that the previously selected Data Point/line connects to in the resulting diagram.

1. Navigate to the line of code you want to create a Data Point from
1. Press `CTRL + SHIFT + P` to open the command picker
1. Type in _CodeFlow_ and press enter
1. Select the **Add Data Point** option which will prompt you for a name, give it a name and then press enter. You will then be prompted for some detail about your Data Point.
1. Repeat the above process as if you were drawing a diagram and each Data Point is a connection in the diagram.
1. Once you have all of your points, you can press `CTRL + SHIFT + P` to open the command picker and open _CodeFlow_ to then select **Generate Diagram**.
1. Once you are happy with your diagram, you can save your selected Data Points as a .json file so you can reopen them at a later date if required.

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

- Saving a diagram as an image (see: https://github.com/Pjaerr/Code-Flow-Extension/issues/12)

- Exporting the diagram as XML to be used in stuff like Lucid Charts or Draw.io (see: https://github.com/Pjaerr/Code-Flow-Extension/issues/14)
