import { getSession, getDirectoryTree } from '../utils/storage-handler.js';


const setGraphvizImage = () => {

    const image = document.getElementById('folders-tree');

    const session = getSession();
    const tree = getDirectoryTree(session.user.id);

    const url = 'https://quickchart.io/graphviz?graph=' + tree.graphviz();

    image.setAttribute('src', url);

}

setGraphvizImage();