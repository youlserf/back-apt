### **1. Configuración inicial**

1. **Clonar el proyecto:**
   ```bash
   git clone <repositorio>
   cd <directorio-proyecto>
   ```

2. **Instalar dependencias:**
   ```bash
   pnpm install
   # o
   npm install
   ```

---

### **2. Configurar la base de datos PostgreSQL**

1. **Iniciar un contenedor Docker para PostgreSQL:**
   ```bash
   docker run --name postgres-container -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=apuestatotal -p 5432:5432 -d postgres:latest
   ```

2. **Definir la configuración en el archivo `.env`:**
   ```dotenv
   # PostgreSQL
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=password
   POSTGRES_DB=apuestatotal
   ```

---

### **3. Ejecutar el servidor**

1. **Iniciar el servidor NestJS:**
   ```bash
   pnpm run start:dev
   # o
   npm run start:dev
   ```

---

### **4. Poblar la base de datos (Seed)**

1. **Llamar al endpoint de Seed:**
   - URL: `http://localhost:4000/seed`
   - Método: `POST`

   Esto agregará las medallas (`badges`) y algunos usuarios iniciales (`users`) a la base de datos.

   **Controlador de Seed:**
   - Crea medallas predeterminadas (ej., "MADERA", "ORO", "RADIANTE", etc.).
   - Registra usuarios iniciales: un administrador y un usuario estándar.

---

### **5. Rutas disponibles**

Estas son las rutas principales que puedes probar:

#### **Autenticación**
- **Login:** `POST /auth/login`
- **Registro:** `POST /auth/register`

#### **Usuarios**
- **Registrar un usuario:** `POST /users/register`
- **Obtener medallas de un usuario:** `GET /users/badges/:userId`

#### **Medallas (Badges)**
- **Obtener todas las medallas:** `GET /badges`
- **Obtener medalla por ID:** `GET /badges/:id`
- **Crear una medalla:** `POST /badges`
- **Actualizar una medalla:** `PUT /badges/:id`
- **Eliminar una medalla:** `DELETE /badges/:id`

#### **Solicitudes de medallas (Badge Requests)**
- **Crear una solicitud de medalla:** `POST /badge-requests/create`
- **Actualizar una solicitud:** `POST /badge-requests/update/:id`
- **Obtener todas las solicitudes:** `GET /badge-requests`
- **Obtener medallas de un usuario por solicitudes:** `GET /badge-requests/user/:userId/badges`

#### **Pokemones**
- **Subir archivo CSV de pokemones:** `POST /pokemons/upload`
- **Obtener pokemones de un usuario:** `GET /pokemons/user/:userId`
