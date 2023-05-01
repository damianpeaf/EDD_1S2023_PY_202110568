import { getStudentTree } from '../utils/storage-handler.js';


const setGraphvizImage = () => {

    const image = document.getElementById('student-tree');

    const tree = getStudentTree();

    const url = 'https://quickchart.io/graphviz?graph=' + tree.graphviz();

    image.setAttribute('src', url);

}

setGraphvizImage();