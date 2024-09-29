
#!/usr/bin/env python3
import rospy
from std_msgs.msg import String
import socket

def tcp_server():
    rospy.init_node('tcp_listener', anonymous=True)
    pub = rospy.Publisher('tcp_data', String, queue_size=10)

 
    server_ip = ''  
    server_port = 30002


    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((server_ip, server_port))
    server.listen(1)
    rospy.loginfo("TCP server started on port %d", server_port)

    while not rospy.is_shutdown():
        client_socket, addr = server.accept()
        rospy.loginfo("Client connected: %s", addr)

        while not rospy.is_shutdown():
            data = client_socket.recv(1024)
            if not data:
                break
            rospy.loginfo("Received data: %s", data.decode('utf-8'))
            pub.publish(data.decode('utf-8'))

        client_socket.close()
        rospy.loginfo("Client disconnected")

    server.close()

if __name__ == '__main__':
    try:
        tcp_server()
    except rospy.ROSInterruptException:
        rospy.loginfo("ROS Interrupt Exception")





