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
        color: #57606f;
        background: #f5f5f5;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px;
        border-radius: 2.5px;
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
