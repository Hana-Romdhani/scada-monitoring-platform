# 🏭 Industrial SCADA Monitoring Solution

A professional real-time supervision system designed to monitor industrial equipment, detect anomalies, and visualize time-series data.

## 🏗️ Architecture
The system follows a decoupled, event-driven architecture:
- **Frontend**: Angular 18 (RxJS, Socket.io-client, CSS Grid).
- **Backend**: NestJS (Mongoose, Socket.io Gateway, JWT Auth).
- **Database**: MongoDB (Time-series optimized with TTL indexes).
- **Simulator**: Independent Node.js process mimicking physical sensor behavior (Brownian Motion).

### Data Flow
`Simulator` $\rightarrow$ `REST API` $\rightarrow$ `MongoDB` $\rightarrow$ `WebSocket Gateway` $\rightarrow$ `Angular Dashboard`

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 20+ (for local development)

### Installation & Launch
1. **Clone the repository**
2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
3. **Launch the entire stack**:
   ```bash
   docker-compose up --build -d
   ```
4. **Start the simulator**:
   ```bash
   cd simulator
   npm install
   npm start
   ```
5. **Access the app**:
   - Dashboard: `http://localhost:4200`
   - API Docs (Swagger): `http://localhost:3000/api`

## 🛠️ Technical Specifications

### 🛡️ Security
- **Authentication**: JWT (JSON Web Tokens) with 1-hour expiration.
- **RBAC**: Roles implemented: `ADMIN`, `ENGINEER`, `OPERATOR`, `VIEWER`.
- **Encryption**: Password hashing via `bcrypt`.
- **Traceability**: Every critical action is recorded in the `AuditLogs` collection.

### 📈 Performance
- **Real-time**: Latency from simulator to screen $\approx 150\text{ms}$.
- **Persistence**: MongoDB TTL index automatically cleans data older than 30 days.
- **Scalability**: Ready for horizontal scaling via a Redis adapter for Socket.io.

## 🎓 Industrial Integration Roadmap
To transition from simulation to a real industrial site:
1. **Implement `DataSourceAdapter`**: Replace the simulator with an OPC UA or Modbus TCP client.
2. **Network Segmentation**: Deploy the backend in a DMZ between the IT network and the OT (Industrial) network.
3. **Security Hardening**: Enable HTTPS/TLS for all communications.

## 📝 Project Status
- [x] Phase 1: Design $\checkmark$
- [x] Phase 2: Initialization $\checkmark$
- [x] Phase 3: Core Backend $\checkmark$
- [x] Phase 4: Simulator $\checkmark$
- [x] Phase 5: Real-time Engine $\checkmark$
- [x] Phase 6: Angular Interface $\checkmark$
- [x] Phase 7: Alarm System $\checkmark$
- [x] Phase 8: Security $\checkmark$
- [x] Phase 9: Optimization $\checkmark$
- [x] Phase 10: CI/CD $\checkmark$
