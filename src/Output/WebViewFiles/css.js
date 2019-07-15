export default `
    body {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        margin: 30px;
    }

    .data-point {
        max-width: 600px;
        width: 100%;
        height: auto;
        padding: 10px;
        margin-left: 30px;
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        border-radius: 2.5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px;
    }

    .vscode-dark > .data-point {
        color: #2d3436;
        background: #f5f5f5;
        
    }

    .vscode-dark > .data-point > .data-point-top-section > .data-point-file-link {
        color: #fdcb6e
    }

    .vscode-dark > .data-point > .data-point-top-section {
        border-bottom: 0.5px solid rgba(51, 51, 51, 0.4);
    }

    .vscode-light > .data-point {
        color: #f5f5f5;
        background: #2d3436;
    }

    .vscode-light > .data-point > .data-point-top-section > .data-point-file-link {
        color: #fdcb6e
    }

    .vscode-light > .data-point > .data-point-top-section {
        border-bottom: 0.5px solid rgba(96, 96, 96, 0.8);
    }
    

    .data-point-top-section {
        width: 100%;
        padding: initial;
        border-bottom: 0.5px solid rgba(51, 51, 51, 0.4);
    }

    .data-point-file {
        word-wrap: break-word;
    }
`;
