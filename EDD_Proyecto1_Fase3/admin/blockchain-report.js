import { getBlockChain } from '../utils/storage-handler.js';


const setGraphvizImage = () => {

    const image = document.getElementById('student-tree');

    const blockchain = getBlockChain()
    const url = 'https://quickchart.io/graphviz?graph=' + blockchain.graphviz();

    image.setAttribute('src', url);

}

setGraphvizImage();