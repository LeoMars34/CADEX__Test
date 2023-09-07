import { useEffect, useState } from 'react';
import * as THREE from 'three';

function App() {
    const [radius, setRadius] = useState(1);
    const [height, setHeight] = useState(1);
    const [segments, setSegments] = useState(32);

    useEffect(() => {
        scene.add(cone);
    }, [radius, height, segments]);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.ConeGeometry(radius, height, segments);
    const material = new THREE.MeshNormalMaterial({
        color: 'yellow',
        wireframe: false,
    });
    const cone = new THREE.Mesh(geometry, material);

    function animate() {
        requestAnimationFrame(animate);

        cone.rotation.x += 0.01;
        cone.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    function create(e) {
        if (!e.target.value) {
            return;
        }
        document.body.removeChild(renderer.domElement);
        let radiusValue = document.getElementById('radius').value;
        let heightValue = document.getElementById('height').value;
        let segmentsValue = document.getElementById('segments').value;
        if (radiusValue != '') {
            setRadius(radiusValue);
        } else radiusValue = radius;
        if (heightValue != '') {
            setHeight(heightValue);
        } else radiusValue = height;
        if (segmentsValue != '') {
            setSegments(segmentsValue);
        } else radiusValue = segments;
    }

    animate();

    return (
        <div>
            <div className="container">
                <input
                    onChange={create}
                    id="radius"
                    type=""
                    placeholder="Radius"
                />
                <input
                    onChange={create}
                    id="height"
                    type=""
                    placeholder="Height"
                />
                <input
                    onChange={create}
                    id="segments"
                    type=""
                    placeholder="Segments"
                />
            </div>
            <div className="container_tree"></div>
        </div>
    );
}

export default App;
