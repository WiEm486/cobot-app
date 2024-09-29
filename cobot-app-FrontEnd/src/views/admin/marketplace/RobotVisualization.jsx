import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ROSLIB from 'roslib';
import URDFLoader from 'urdf-loader';

const RobotVisualization = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        // Set up scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        mountRef.current.appendChild(renderer.domElement);

        // Add light to the scene
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 0, 10).normalize();
        scene.add(light);

        camera.position.z = 5;

        // Set up ROS connection
        const ros = new ROSLIB.Ros({
            url: 'ws://192.168.8.127:9090' // Remplacez <IP_VM_URSim> par l'adresse IP de votre VM URSim
        });

        ros.on('connection', () => {
            console.log('Connected to websocket server.');
        });

        ros.on('error', (error) => {
            console.log('Error connecting to websocket server: ', error);
        });

        ros.on('close', () => {
            console.log('Connection to websocket server closed.');
        });

        // Get robot_description parameter
        const robotDescriptionParam = new ROSLIB.Param({
            ros: ros,
            name: 'robot_description'
        });

        let urdfModel;

        robotDescriptionParam.get((value) => {
            if (value) {
                const loader = new URDFLoader();
                loader.loadMeshCb = (path, manager, done) => {
                    console.log('Loading mesh:', path);
                    return new THREE.FileLoader(manager).load(path, done);
                };

                urdfModel = loader.parse(value);
                if (urdfModel) {
                    scene.add(urdfModel);
                    urdfModel.position.set(0, 0, 0);
                    urdfModel.rotation.set(-Math.PI / 2, 0, 0);
                } else {
                    console.error('Failed to parse URDF.');
                }
            } else {
                console.error('No URDF data found.');
            }
        });

        // Subscribe to /joint_states topic
        const jointStateListener = new ROSLIB.Topic({
            ros: ros,
            name: '/joint_states',
            messageType: 'sensor_msgs/JointState'
        });

        jointStateListener.subscribe((message) => {
            if (urdfModel) {
                message.name.forEach((jointName, index) => {
                    const joint = urdfModel.joints[jointName];
                    if (joint) {
                        joint.setJointValue(message.position[index]);
                    }
                });
            }
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        // Clean up on unmount
        return () => {
            mountRef.current.removeChild(renderer.domElement);
            ros.close();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default RobotVisualization;