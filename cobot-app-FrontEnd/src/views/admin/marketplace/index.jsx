import React, { useEffect } from 'react';
import ROSLIB from 'roslib';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import RobotVisualization from './RobotVisualization';

const Marketplace = () => {
  // useEffect(() => {
  //   // Créer une connexion ROS
  //   const ros = new ROSLIB.Ros({
  //     url: 'ws://localhost:9090' // URL de votre serveur WebSocket ROS
  //   });

  //   ros.on('connection', () => {
  //     console.log('Connected to WebSocket server.');
  //   });

  //   ros.on('error', (error) => {
  //     console.error('Error connecting to WebSocket server:', error);
  //   });

  //   ros.on('close', () => {
  //     console.log('Connection to WebSocket server closed.');
  //   });

  //   // Exemple de souscription à un topic
  //   const topic = new ROSLIB.Topic({
  //     ros: ros,
  //     name: '/ursim_joint', // Nom de votre topic ROS
  //     messageType: "sensor_msgs/JointState" // Type de message du topic
  //   });

  //   topic.subscribe((message) => {
  //     console.log('Received message on /example_topic:', message);
  //   });

  //   // Nettoyage lors de la démonstration
  //   return () => {
  //     topic.unsubscribe();
  //     ros.close();
  //   };
  // }, []);

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      {/* <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div style={{ width: '100%', height: '100vh' }}>
          <iframe
            src="http://localhost:8001/rvizweb"
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="RViz Web"
            onError={() => alert('Failed to load RVizWeb')}
          />
        </div>
      </div> */}
      <RobotVisualization></RobotVisualization>
    </div>
  );
};

export default Marketplace;
