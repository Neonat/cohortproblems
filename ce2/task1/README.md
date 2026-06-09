# CE2 Task 1

A simple REST API web app built with Express, TypeScript, and MongoDB. It manages departments and staff with a many-to-one relationship (many staff belong to one department).

---

## Prerequisites

- Node.js
- MongoDB installed via tarball (arm64)
- `mongosh` installed via Homebrew

---

## Setup

### 1. Install dependencies

```bash
cd task1
npm install
```

### 2. Start MongoDB

MongoDB must be running before starting the app. Run this every time after a restart:

```bash
nohup mongod --dbpath ~/data/db --logpath ~/data/log/mongodb/mongod.log >/dev/null &
```

Verify it's running:

```bash
ps aux | grep -v grep | grep mongod
```

### 3. Build and start the app

```bash
npm run build
npm run start
```

The server runs at `http://localhost:3000`.

---

## API Endpoints

### Add a department

```
GET /dept/add/:code
```

Example:
```
http://localhost:3000/dept/add/hr
```

Response:
```json
{ "code": "hr" }
```

---

### Add a staff member

```
GET /staff/add/:id/:name/:dept
```

Example:
```
http://localhost:3000/staff/add/1/aaron/hr
```

Response:
```json
{
  "id": "1",
  "name": "aaron",
  "dept": "hr"
}
```

---

### Get all departments

```
GET /dept/all/
```

Example:
```
http://localhost:3000/dept/all/
```

Response:
```json
[{ "code": "hr" }]
```

---

### Get all staff

```
GET /staff/all/
```

Example:
```
http://localhost:3000/staff/all/
```

Response:
```json
[{ "id": "1", "name": "aaron", "dept": "hr" }]
```

---

### Get all departments with their staff

```
GET /dept/all/withstaff/
```

Example:
```
http://localhost:3000/dept/all/withstaff/
```

Response:
```json
[{ "code": "hr", "staffs": [{ "id": "1", "name": "aaron", "dept": "hr" }] }]
```

---

## Database

The app uses MongoDB with database name `ce2q1`, defined in `models/db.ts`:

```typescript
const dbName = "ce2q1";
```

Two collections are used: `dept` and `staff`.

### Inspect data with mongosh

```bash
mongosh
```

```js
use ce2q1
db.dept.find()
db.staff.find()
```

### Wipe the database

```js
use ce2q1
db.dept.deleteMany({})
db.staff.deleteMany({})
```

---

## Stopping the server

```bash
kill -9 $(lsof -t -i :3000)
kill -9 $(lsof -t -i :27017)
```

---

## Project Structure

```
task1/
├── app.ts               # Express app setup
├── bin/                 # Server entry point
├── models/
│   ├── db.ts            # MongoDB connection (dbName = "ce2q1")
│   ├── dept.ts          # Dept model and queries
│   └── staff.ts         # Staff model and queries
├── routes/
│   ├── dept.ts          # Dept endpoints
│   └── staff.ts         # Staff endpoints
├── views/               # EJS templates
├── public/              # Static files
└── tsconfig.json
```

## Dashboard (org_chart_dashboard.html)

A visual frontend for the API. Displays departments and staff as a live org chart, with forms to add departments and staff without using the browser address bar. Plain html without any css styling.

### Opening the dashboard

Open `org_chart_dashboard.html` via a local server such as VS Code Live Server. Right-click the file in VS Code and select **Open with Live Server**. It will typically be served at:

```
http://127.0.0.1:5500/ce2/task1/org_chart_dashboard.html
```

127.0.0.1 is the loopback address but port 5500 may vary according to what your machine is running. If you are running something else, the port will increment (5501, 5502, 5503...) by one.

Make sure the Express server and MongoDB are both running first, otherwise the dashboard will show "Could not connect to server."

### Usage

1. Type a department code in the **Add department** field and click Add.
2. Fill in id, name, and dept in the **Add staff** fields and click Add.
3. The org chart updates automatically. New entries are highlighted with a green "new" badge for 3 seconds.
4. The chart also auto-refreshes every 5 seconds.

### Known limitations and points of improvement

**Duplicate staff IDs**
The API currently allows inserting two staff members with the same id into the same department. For example, adding `id=1, name=aaron, dept=hr` twice creates two separate records. A fix would be to check if a staff id already exists in the department before inserting:

```typescript
const existing = await staffmodel.find({ id: req.params.id, dept: req.params.code });
if (existing.length > 0) {
    res.status(400).json({ error: "Staff ID already exists in this department" });
    return;
}
```

**Department name case sensitivity**
`HR`, `hr`, and `Hr` are currently stored as three separate departments. To normalise department codes, convert to lowercase before inserting and querying:

```typescript
const code = req.params.code.toLowerCase();
```

Apply this in both `routes/dept.ts` and `routes/staff.ts` wherever `:code` or `:dept` is read from the URL params. This ensures all variations map to the same department.