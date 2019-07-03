export default `
    body {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .data-point {
        width: 600px;
        height: auto;
        border: 1px solid white;
        padding: 10px;
        margin: 30px;
        display: flex;
        flex-direction: column;
        color: #333;
        background: #f5f5f5;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px;
    }

    .data-point-top-section {
        width: 100%;
        padding: initial;
        border-bottom: 1px solid #333;
    }
`;
