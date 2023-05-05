import { getDirectoryGraph } from "../utils/index.js";

const graph = getDirectoryGraph();

const setGraphvizImage = () => {

    console.log(graph)

    const image = document.getElementById('student-tree');
    const url = 'https://quickchart.io/graphviz?graph=' + graph.graphviz();
    image.setAttribute('src', url);
}

setGraphvizImage();