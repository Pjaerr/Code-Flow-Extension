export default `
    //Grab all links on the page and post them back to be opened in editor when clicked
    const vscode = acquireVsCodeApi();
    
    document.addEventListener('click', event => {
        let node = event && event.target;
        while (node) {
            if (node.tagName && node.tagName === 'A' && node.href) {
                vscode.postMessage('{"filePath": "' + node.href + '", "lineNumber": ' + node.dataset.lineNumber + '}');
                event.preventDefault();
                return;
            }
            node = node.parentNode;
        }
    }, true);
`;
