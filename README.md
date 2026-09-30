# Intelligent Fitness & Wellness Platform (MCA Final-Year Project)

An enterprise-grade, distributed microservices web application designed for comprehensive fitness, nutrition, hydration, and rule-based algorithmic health intelligence. Built specifically for an MCA (Master of Computer Applications) final-year project, showcasing modern cloud-native architectural patterns with **Spring Boot 3**, **Spring Cloud (Eureka, API Gateway, OpenFeign)**, **PostgreSQL**, **JWT Authentication**, and **React + Vite**.

*(Note: In accordance with project requirements, the administrative overhead role is omitted, focusing directly on **USER** and **TRAINER** workflows).*

---

## 1. Project Overview

The **Intelligent Fitness & Wellness Platform** enables individuals to manage their complete health lifecycle:
- **User Authentication & Personal Profiling**: Secure user registration, authentication via JWT Bearer tokens, profile configuration with physiological metrics (height, weight, age, activity level, fitness goal).
- **Workout & Exercise Catalog**: Pre-populated exercise database (Running, Push-ups, Squats, Bench Press, Yoga, etc.), workout logging with sets, reps, duration, and calories burned.
- **Nutrition & Hydration Tracking**: Pre-seeded nutritional database (Rice, Roti, Chicken, Dal, Paneer, Oats, Eggs, etc.), meal logging by meal type, daily macronutrient breakdown (calories, protein, carbs, fats), and water intake monitoring against a 2.5L target.
- **Fitness Goals & Physical Progress**: Target weight and calorie goal tracking, historical logs of weight and body fat trends.
- **Rule-Based Intelligent AI Recommendation Engine**: Completely self-contained algorithm calculating BMI classification, Basal Metabolic Rate (BMR), and Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor formula. Aggregates telemetry via OpenFeign across microservices to generate actionable workout routines and nutritional adjustments without requiring paid third-party AI APIs.
- **In-App Notifications & Reminders**: Automated reminders for workouts, hydration checkpoints, and fitness milestones stored in PostgreSQL.

---

## 2. Microservices Architecture

```
                                  +-------------------------------+
                                  |    React.js Frontend (Vite)   |
                                  |          Port: 5173           |
                                  +---------------+---------------+
                                                  |
                                         REST + JWT Bearer
                                                  |
                                                  v
                                  +---------------+---------------+
                                  |      API Gateway (Reactive)   |
                                  |          Port: 8080           |
                                  +---------------+---------------+
                                                  |
               +------------------+---------------+------------------+------------------+
               |                  |                                  |                  |
               v                  v                                  v                  v
     +------------------+ +------------------+             +------------------+ +------------------+
     |   User Service   | | Fitness Service  |             | Nutrition Service| | Notification Svc |
     |    Port: 8081    | |    Port: 8082    |             |    Port: 8083    | |    Port: 8085    |
     +--------+---------+ +--------+---------+             +--------+---------+ +--------+---------+
              |                    |                                |                    |
              v                    v                                v                    v
         PostgreSQL           PostgreSQL                       PostgreSQL           PostgreSQL
       (fitness_users)      (fitness_data)                 (fitness_nutrition)  (fitness_notifications)
              ^                    ^                                ^
              |                    |                                |
              |          OpenFeign (Internal REST)                  |
              +--------------------+--------------------------------+
                                   |
                          +--------+---------+
                          |    AI Service    |
                          |    Port: 8084    |
                          +--------+---------+
                                   |
                                   v
                              PostgreSQL
                             (fitness_ai)

                          +------------------+
                          |  Eureka Server   |
                          |    Port: 8761    |
                          +------------------+
                  (All microservices register dynamically)
```

---

## 3. Technology Stack & Versions

### Backend
- **Language**: Java 17 LTS
- **Framework**: Spring Boot 3.2.3
- **Cloud Components**: Spring Cloud 2023.0.0
  - **Service Discovery**: Spring Cloud Netflix Eureka Server
  - **API Gateway**: Spring Cloud Gateway (Reactive, Non-blocking Netty)
  - **Inter-service Communication**: Spring Cloud OpenFeign
- **Security**: Spring Security 6, JJWT 0.11.5 (HMAC-SHA256)
- **Data Access**: Spring Data JPA / Hibernate
- **Build Tool**: Apache Maven 3.9+
- **Testing**: JUnit 5, Mockito, Spring Boot Test

### Frontend
- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS & Responsive Modern Dashboard UI
- **Routing**: React Router 7
- **HTTP Client**: Axios (with centralized JWT interceptors)
- **Charts & Visualizations**: Recharts

### Database & DevOps
- **Database**: PostgreSQL 15 / 16 (with fallback in-memory H2 for zero-config quick testing)
- **Containers**: Docker, Docker Compose
- **API Testing**: Postman Collection (v2.1)

---

## 4. Port & Database Mapping

| Service Name | Port | Database Name | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **Eureka Server** | `8761` | *None* | Centralized registry for all microservices |
| **API Gateway** | `8080` | *None* | Routing, global CORS, and JWT authorization |
| **User Service** | `8081` | `fitness_users` | User registration, login, profile management, JWT issuance |
| **Fitness Service**| `8082`| `fitness_data` | Exercises catalog, workout tracking, goals, physical progress |
| **Nutrition Service**| `8083`| `fitness_nutrition` | Food database, daily meal logs, macros, hydration logging |
| **AI Recommendation**| `8084`| `fitness_ai` | BMR, TDEE, BMI categorization & rule-based health guidance |
| **Notification Service**| `8085`| `fitness_notifications` | In-app reminders (workouts, hydration, goal milestones) |
| **React Frontend** | `5173` | *LocalStorage* | Interactive user/trainer dashboard with metrics and charts |

---

## 5. Project Directory Structure

```
intelligent-fitness-and-wellness/
├── backend/
│   ├── pom.xml                               # Root parent POM
│   ├── eureka-server/                        # Port 8761
│   ├── api-gateway/                          # Port 8080
│   ├── user-service/                         # Port 8081 (fitness_users)
│   ├── fitness-service/                      # Port 8082 (fitness_data)
│   ├── nutrition-service/                    # Port 8083 (fitness_nutrition)
│   ├── ai-service/                           # Port 8084 (fitness_ai)
│   └── notification-service/                 # Port 8085 (fitness_notifications)
├── frontend/                                 # Port 5173: React + Vite + Tailwind
│   ├── src/
│   │   ├── components/                       # Reusable UI widgets, layout, cards, navigation
│   │   ├── pages/                            # Dashboard, Workout, Nutrition, Progress, AiChat
│   │   ├── services/                         # api.js, authService, fitnessService, nutritionService, aiService
│   │   └── router/                           # AppRouter & ProtectedRoute
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml                        # Full containerized stack
├── init-db.sql                               # Multi-database PostgreSQL creation script
├── .env.example                              # Template environment variables
├── postman/
│   ├── Intelligent_Fitness_Platform.postman_collection.json
│   └── Intelligent_Fitness_Platform.postman_environment.json
└── README.md
```

---

## 6. How to Run the Application

### Option A: Running with Docker Compose (Recommended)

Make sure Docker Desktop is running on your machine:

```powershell
# In the root directory (intelligent-fitness-and-wellness/)
docker compose up --build
```
This automatically initializes:
- PostgreSQL with all 5 required databases
- Eureka Server (`http://localhost:8761`)
- API Gateway (`http://localhost:8080`)
- All 5 microservices
- React Frontend at `http://localhost:5173`

---

### Option B: Running Locally (Windows PowerShell)

#### 1. Compile the Backend
```powershell
cd c:\spring\intelligent-fitness-and-wellness\backend
mvn clean compile
```

#### 2. Start Eureka Server (Port 8761)
Open a new PowerShell terminal:
```powershell
cd c:\spring\intelligent-fitness-and-wellness\backend\eureka-server
mvn spring-boot:run
```
*(Verify Eureka at `http://localhost:8761`)*

#### 3. Start API Gateway (Port 8080)
Open a new PowerShell terminal:
```powershell
cd c:\spring\intelligent-fitness-and-wellness\backend\api-gateway
mvn spring-boot:run
```

#### 4. Start Core Microservices
Open separate PowerShell tabs for each service:
```powershell
# Tab 1: User Service (8081)
cd c:\spring\intelligent-fitness-and-wellness\backend\user-service
mvn spring-boot:run

# Tab 2: Fitness Service (8082)
cd c:\spring\intelligent-fitness-and-wellness\backend\fitness-service
mvn spring-boot:run

# Tab 3: Nutrition Service (8083)
cd c:\spring\intelligent-fitness-and-wellness\backend\nutrition-service
mvn spring-boot:run

# Tab 4: AI Service (8084)
cd c:\spring\intelligent-fitness-and-wellness\backend\ai-service
mvn spring-boot:run

# Tab 5: Notification Service (8085)
cd c:\spring\intelligent-fitness-and-wellness\backend\notification-service
mvn spring-boot:run
```

#### 5. Start React Frontend
Open a new PowerShell terminal:
```powershell
cd c:\spring\intelligent-fitness-and-wellness\frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 7. Key REST API Endpoints

All client requests should be routed through the API Gateway at `http://localhost:8080`:

### Authentication & Users
- `POST /api/users/register` - Create new user account (`ROLE_USER` or `ROLE_TRAINER`)
- `POST /api/users/login` - Authenticate and receive JWT token
- `POST /api/users/logout` - Invalidate session
- `GET /api/users/me` - Get current authenticated user profile
- `GET /api/users/{id}` - Get user profile by ID
- `PUT /api/users/{id}` - Update profile information
- `GET /api/users` - List all registered users

### Fitness & Workouts
- `GET /api/fitness/exercises` - List all exercises (pre-seeded with running, cycling, squats, bench press, etc.)
- `POST /api/fitness/exercises` - Add new exercise
- `POST /api/fitness/workouts` - Log completed workout session
- `GET /api/fitness/workouts/user/{userId}` - View user's workout history
- `POST /api/fitness/goals` - Set target weight, target calories, and deadline
- `GET /api/fitness/goals/{userId}` - View active fitness goals
- `POST /api/fitness/progress` - Log weight, body fat %, and calories burned
- `GET /api/fitness/progress/{userId}` - View historical progress records

### Nutrition & Hydration
- `GET /api/nutrition/foods` - Catalog of standard foods (Rice, Roti, Chicken, Dal, Paneer, etc.)
- `POST /api/nutrition/foods` - Add custom food item
- `POST /api/nutrition/meals` - Log food intake by meal type (Breakfast, Lunch, Dinner, Snack)
- `GET /api/nutrition/meals/{userId}` - Retrieve meal logs
- `GET /api/nutrition/meals/user/{userId}/daily` - Retrieve aggregated macronutrient summary
- `POST /api/nutrition/water` - Log water intake (e.g. 250ml, 500ml)
- `GET /api/nutrition/water/user/{userId}/today` - Check today's hydration against 2500ml goal

### AI Recommendation Engine
- `GET /api/ai/bmi/{userId}` - Calculate BMI, classification (Underweight, Normal, Overweight, Obese)
- `GET /api/ai/calories/{userId}` - Compute BMR and TDEE based on Mifflin-St Jeor formula
- `GET /api/ai/recommendation/{userId}` - Aggregate cross-service data via OpenFeign and deliver rule-based workout & nutritional recommendations

### Notifications
- `GET /api/notifications/{userId}` - Retrieve user notifications
- `POST /api/notifications` - Create reminder notification
- `PUT /api/notifications/{id}/read` - Mark notification as read
- `DELETE /api/notifications/{id}` - Remove notification

---

## 8. Postman Testing Guide

1. Open Postman.
2. Click **Import** and select:
   - `postman/Intelligent_Fitness_Platform.postman_collection.json`
   - `postman/Intelligent_Fitness_Platform.postman_environment.json`
3. Select the **Intelligent Fitness Local Environment**.
4. Run the **1. Authentication > Register User** request.
5. Run the **1. Authentication > Login User** request. The test script automatically captures the JWT token and saves it to the `token` environment variable.
6. Run any other request in the collection (Fitness, Nutrition, AI, Notifications) — all requests will automatically include `Bearer {{token}}`.

---

## 9. Viva Questions & Project Explanations (MCA Defense Preparation)

### Q1: What are Microservices, and why choose them over a Monolithic architecture?
**Answer**: In a monolithic architecture, all modules (user, workout, nutrition, notifications) reside in a single codebase and deployment unit. A failure or memory leak in one module can crash the entire platform, and scaling requires replicating the entire application. Microservices decouple business capabilities into independently deployable, loosely-coupled services. Each service owns its domain and database (Database-per-Service pattern), allowing independent scalability, fault isolation, and technology flexibility.

### Q2: What is the role of the Eureka Server?
**Answer**: In dynamic environments (cloud, Docker, containers), service instances change IP addresses and ports dynamically. Spring Cloud Netflix Eureka acts as a **Service Registry**. When each microservice boots, it registers its name (`user-service`, `fitness-service`, etc.) and port with Eureka. Downstream services or the API Gateway query Eureka to locate live instances, eliminating hardcoded hostnames or IPs.

### Q3: How does Spring Cloud Gateway work and why is it needed?
**Answer**: The API Gateway acts as the single entry point (Reverse Proxy) for all incoming client traffic. It routes requests like `/api/users/**` to `lb://user-service` using Eureka load balancing. It provides centralized cross-cutting concerns:
1. **CORS Configuration**: Allowing the React frontend to communicate smoothly.
2. **Authentication Filter**: Verifying JWT tokens before routing requests downstream.
3. **Traffic Aggregation**: Shielding internal microservices architecture from external exposure.

### Q4: How do microservices communicate with each other in this project?
**Answer**: Communication is handled through **Spring Cloud OpenFeign**, a declarative REST client. In our `ai-service`, we declare simple Java interfaces annotated with `@FeignClient(name = "user-service")`. Feign automatically integrates with Eureka to resolve the service instance and performs HTTP communication transparently.

### Q5: Explain the AI recommendation logic implemented in this platform.
**Answer**: The platform uses a **deterministic, rule-based expert recommendation engine** grounded in exercise science formulas:
1. **Mifflin-St Jeor Formula**: Estimates Basal Metabolic Rate (BMR) using physiological variables:
   $$\text{BMR (Men)} = 10 \times \text{weight} + 6.25 \times \text{height} - 5 \times \text{age} + 5$$
   $$\text{BMR (Women)} = 10 \times \text{weight} + 6.25 \times \text{height} - 5 \times \text{age} - 161$$
2. **Total Daily Energy Expenditure (TDEE)**: BMR scaled by user activity level multiplier (Sedentary: 1.2, Light: 1.375, Moderate: 1.55, Active: 1.725).
3. **Rule Inference Engine**:
   - High BMI ($\ge 25$) triggers weight-management recommendations (caloric deficit target, circuit training, cardio).
   - Low BMI ($< 18.5$) triggers caloric surplus suggestions and compound strength overload routines.
   - Low workout frequency ($< 3$ logs) triggers habit-building beginner guidance.
   - Caloric intake over TDEE triggers dietary adjustment warnings.

### Q6: How does JWT Authentication work across microservices?
**Answer**: When a user logs in, `user-service` validates credentials using `BCryptPasswordEncoder` and signs a JSON Web Token (JWT) using HMAC-SHA256 with a secret key. The token contains claims (subject ID, email, role, expiration). The client stores this token in browser `localStorage` and includes it in the `Authorization: Bearer <token>` header of every subsequent HTTP request. The API Gateway intercepts and validates the token signature, then injects `X-Auth-User-Id` downstream.

### Q7: Why use separate databases for each microservice?
**Answer**: Adhering to the **Database-per-Service pattern** ensures that microservices remain loosely coupled. One microservice cannot directly query or corrupt another service's tables. Any cross-domain data sharing must occur via well-defined REST/OpenFeign APIs, maintaining data encapsulation and allowing each database to scale or migrate independently.
