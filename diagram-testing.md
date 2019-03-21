# Diagram testing

Because the diagram generation runs within a VS Code Webview, it could be quite annoying to have to restart vs code and go through the extension options everytime you want to make a tiny diagram js or css change etc.

To solve this make sure you run the extension > Generate Diagram atleast once and then open the diagram.html file inside of the `out/Output` folder in your browser.

You can then run `npm run dev` and then any changes made to `diagram.js` or `diagram.scss` can be seen by refreshing the diagram.html page.
