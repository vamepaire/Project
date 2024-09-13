# Route Navigation Using Dijkstra's Shortest Path Algorithm #

# Abstract #
Dijkstra's Algorithm is a renowned algorithm in computer science, crucial for finding the shortest path between nodes in a graph. This project focuses on using Dijkstra's Algorithm to determine
the most efficient route in a campus setting. By identifying key nodes, connecting them to build a route, and applying Dijkstra's Algorithm, 
we find the optimal path from one node to another. The algorithm, effective for graphs with positive weights, helps users navigate efficiently, saving time and resources.

# Introduction #
Navigating from home to the university or within the campus often involves exploring various routes.
The shortest path problem addresses the challenge of finding the quickest route in a directed graph. Our "Route Navigation" system utilizes this problem to provide the optimal path from a starting point to a 
destination within the campus. The system calculates travel costs to determine the most efficient route, leveraging Dijkstra's Algorithm to find the shortest path between nodes.
This approach includes variations such as single-source shortest path, pair of shortest paths, and all-pairs shortest paths, each catering to different navigation needs.

# Problem Statement #
Many advanced navigation systems lack precision and the ability to provide detailed routes within specific environments, such as a university campus.
As technology advances, users prefer digital solutions over human assistance. A reliable and user-friendly guidance system is essential, particularly in large 
campuses where navigating between buildings can be challenging. New students often struggle with finding their way around, highlighting the need for a system that offers precise, 
efficient navigation within the campus.

Methodology
Dijkstra’s Algorithm constructs a Shortest Path Tree (SPT) from a given source node. It maintains two sets: labeled vertices (with known shortest paths) and
candidate vertices (with unknown shortest paths). At each iteration, a vertex with the minimum distance from the source is moved from the candidate set to the labeled set.
The project involves identifying key campus locations as nodes, estimating distances to create a weighted graph, and using Dijkstra’s Algorithm to propose the shortest path to users.
# Point to be Noted #
The Directory list is given in the image folder . Go and check it .
And before going to run the server.js file be sure that JavaScript is intalled on your system . 
To download the node_modules use the command "npm install" .
