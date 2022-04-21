/*


Copyright (C) 2022, PorkyProductions and contributors
Licensed under the Apache-2.0 license. See LICENSE file in the project root for full license information.



*/


const rickRollButton = () => {
    var rickRollButton = document.createElement('rickRollButton');
    rickRollButton.innerHTML = '<button><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"></a>Click Me</button>';
    document.body.appendChild(rickRollButton);
};


export { rickRollButton };