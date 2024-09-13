#include <iostream>
#include <vector>
#include <climits>
#include <queue>
#include <sstream>

using namespace std;

typedef pair<int, int> pii; // Pair of (distance, vertex)

void dijkstra(int start, const vector<vector<pii>>& graph, vector<int>& distances, vector<vector<int>>& paths) {
    int n = graph.size();
    distances.assign(n, INT_MAX);
    distances[start] = 0;
    paths[start] = {start};

    priority_queue<pii, vector<pii>, greater<pii>> pq;
    pq.push({0, start}); // Distance, vertex

    while (!pq.empty()) {
        int u = pq.top().second;
        int dist_u = pq.top().first;
        pq.pop();

        if (dist_u > distances[u]) continue;

        for (const auto& edge : graph[u]) {
            int v = edge.first;
            int weight = edge.second;

            if (dist_u + weight < distances[v]) {
                distances[v] = dist_u + weight;
                paths[v] = paths[u];
                paths[v].push_back(v);
                pq.push({distances[v], v});
            }
        }
    }
}

int main() {
    int n, e;
    cin >> n >> e;
    vector<vector<pii>> graph(n);

    for (int i = 0; i < e; ++i) {
        int u, v, w;
        cin >> u >> v >> w;
        graph[u].emplace_back(v, w);
        graph[v].emplace_back(u, w); // For undirected graph
    }

    int start;
    cin >> start;

    vector<int> distances;
    vector<vector<int>> paths(n);
    dijkstra(start, graph, distances, paths);

    for (int i = 0; i < distances.size(); ++i) {
        cout << "Distance from " << start << " to " << i << " is " << distances[i] << " (Path: ";
        for (int j = 0; j < paths[i].size(); ++j) {
            if (j > 0) cout << " -> ";
            cout << paths[i][j];
        }
        cout << ")\n";
    }

    return 0;
}
