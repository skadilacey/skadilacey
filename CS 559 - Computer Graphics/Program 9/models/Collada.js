"use strict"
// Collada class, simple dae parser
// source of dae file
// gl graphics object
// vertex color
// tx - model transform
// name associated with object
class Collada {
    constructor(source, gl, color, tx, name) {
        this.source = source;
        this.gl = gl;
        this.color = color;
        this.tx = tx;
        this.name = name || "Collada";

        // load data
        this.xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                parseDAE(this);
            }
        };
        xhttp.open("GET", this.source, true);
        xhttp.send();

        // verts
        this.vertexPos = new Float32Array([x - w / 2, y + l / 2, z,
        x + w / 2, y + l / 2, z,
        x + w / 2, y - l / 2, z,
        x - w / 2, y - l / 2, z]);

        // normals
        this.vertexNormals = new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0]);

        // colors
        this.vertexColors = new Float32Array([this.color[0], this.color[1], this.color[2], this.color[0], this.color[1], this.color[2], this.color[0], this.color[1], this.color[2], this.color[0], this.color[1], this.color[2]]);

        // vertex texture coordinates
        this.vertexTexCoords = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]);

        // tris
        this.triangleIndices = new Uint8Array([0, 1, 3, 1, 2, 3]);

        // add buffers to webgl
        // vertecies
        this.vertexBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexPos, gl.STATIC_DRAW);
        this.vertexBuff.itemSize = 3;
        this.vertexBuff.numItems = 4;

        // normals
        this.normalBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexNormals, gl.STATIC_DRAW);
        this.normalBuff.itemSize = 3;
        this.normalBuff.numItems = 4;

        // colors
        this.colorBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexColors, gl.STATIC_DRAW);
        this.colorBuff.itemSize = 3;
        this.colorBuff.numItems = 4;

        // a buffer for textures
        this.texBuff = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texBuff);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertexTexCoords, gl.STATIC_DRAW);
        this.texBuff.itemSize = 2;
        this.texBuff.numItems = 4;

        // triangle indicies
        this.indexBuff = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuff);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.triangleIndices, gl.STATIC_DRAW);
    }

    parseDAE(xml) {
        var xmlDoc = xml.responseXML;
        document.getElementById("demo").innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
    }
}