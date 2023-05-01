import { getSessionBinacle } from '../utils/storage-handler.js';

const binnacle = getSessionBinacle();

const setGraphvizImage = () => {

    const image = document.getElementById('binnacle-image');

    const url = 'https://quickchart.io/graphviz?graph=' + binnacle.graphviz();

    image.setAttribute('src', url);

}

setGraphvizImage();