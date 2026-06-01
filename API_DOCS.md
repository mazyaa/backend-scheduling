# API Documentation

Base URL: `https://api.example.com`

---

## Authentication

### 1. Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "string",
    "user": {}
  }
}
```

### 2. Register
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "string"
}
```

**Response:**
```json
{
  "status": 201,
  "message": "User registered successfully",
  "data": {}
}
```

### 3. Logout
**POST** `/api/auth/logout`

**Headers:**
- Authorization: Bearer {token}

**Response:**
```json
{
  "status": 200,
  "message": "Logout successful"
}
```

### 4. Refresh Token
**POST** `/api/auth/refresh`

**Response:**
```json
{
  "status": 200,
  "data": {
    "token": "string"
  }
}
```

### 5. Forgot Password
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "string"
}
```

---

## Training

### 6. Get All Trainings
**GET** `/api/training`

**Query Parameters:**
- page (int)
- limit (int)
- search (string)
- status (string)

**Response:**
```json
{
  "status": 200,
  "data": {
    "trainings": [],
    "total": 0,
    "page": 1,
    "totalPages": 1
  }
}
```

### 7. Get Training By ID
**GET** `/api/training/{id}`

**Response:**
```json
{
  "status": 200,
  "data": {}
}
```

### 8. Create Training
**POST** `/api/training`

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "type": "string"
}
```

### 9. Update Training
**PUT** `/api/training/{id}`

### 10. Delete Training
**DELETE** `/api/training/{id}`

---

## Schedule

### 11. Get All Schedules
**GET** `/api/schedule`

### 12. Get Schedule By ID
**GET** `/api/schedule/{id}`

### 13. Create Schedule
**POST** `/api/schedule`

### 14. Update Schedule
**PUT** `/api/schedule/{id}`

### 15. Delete Schedule
**DELETE** `/api/schedule/{id}`

---

## Detail Schedule

### 16. Get All Detail Schedules
**GET** `/api/detail-schedule`

### 17. Get Detail Schedule By ID
**GET** `/api/detail-schedule/{id}`

### 18. Create Detail Schedule
**POST** `/api/detail-schedule`

### 19. Update Detail Schedule
**PUT** `/api/detail-schedule/{id}`

### 20. Delete Detail Schedule
**DELETE** `/api/detail-schedule/{id}`

---

## Session Detail Schedule

### 21. Get All Sessions
**GET** `/api/session-detail-schedule`

### 22. Get Session By ID
**GET** `/api/session-detail-schedule/{id}`

### 23. Create Session
**POST** `/api/session-detail-schedule`

### 24. Update Session
**PUT** `/api/session-detail-schedule/{id}`

### 25. Delete Session
**DELETE** `/api/session-detail-schedule/{id}`

---

## Instruktur / Asesor

### 26. Get All Instruktur
**GET** `/api/instruktur`

### 27. Get Instruktur By ID
**GET** `/api/instruktur/{id}`

### 28. Create Instruktur
**POST** `/api/instruktur`

### 29. Update Instruktur
**PUT** `/api/instruktur/{id}`

### 30. Delete Instruktur
**DELETE** `/api/instruktur/{id}`

---

## Participant

### 31. Get All Participants
**GET** `/api/participant`

### 32. Get Participant By ID
**GET** `/api/participant/{id}`

### 33. Create Participant
**POST** `/api/participant`

### 34. Update Participant
**PUT** `/api/participant/{id}`

### 35. Delete Participant
**DELETE** `/api/participant/{id}`

---

## Assesment

### 36. Get All Assesments
**GET** `/api/assesment`

### 37. Get Assesment By ID
**GET** `/api/assesment/{id}`

### 38. Create Assesment
**POST** `/api/assesment`

### 39. Update Assesment
**PUT** `/api/assesment/{id}`

### 40. Delete Assesment
**DELETE** `/api/assesment/{id}`

---

## Credential

### 41. Get All Credentials
**GET** `/api/credential`

### 42. Get Credential By ID
**GET** `/api/credential/{id}`

### 43. Create Credential
**POST** `/api/credential`

### 44. Update Credential
**PUT** `/api/credential/{id}`

### 45. Delete Credential
**DELETE** `/api/credential/{id}`

---

## Notification

### 46. Get All Notifications
**GET** `/api/notification`

### 47. Get Notification By ID
**GET** `/api/notification/{id}`

### 48. Create Notification
**POST** `/api/notification`

### 49. Mark Notification Read
**PUT** `/api/notification/{id}/read`

### 50. Delete Notification
**DELETE** `/api/notification/{id}`

---

## Set Password

### 51. Set Password
**POST** `/api/set-password`

**Request Body:**
```json
{
  "token": "string",
  "password": "string",
  "confirmPassword": "string"
}
```

---

## Media

### 52. Upload Media
**POST** `/api/media/upload`

**Request:** multipart/form-data
- file (file)

### 53. Get Media By ID
**GET** `/api/media/{id}`

### 54. Delete Media
**DELETE** `/api/media/{id}`

---

## Participant Import

### 55. Import Participants (Excel/CSV)
**POST** `/api/participant/import`

**Request:** multipart/form-data
- file (file)

### 56. Download Import Template
**GET** `/api/participant/import/template`

---

## Materi

### 57. Get All Materi
**GET** `/api/materi`

### 58. Get Materi By ID
**GET** `/api/materi/{id}`

### 59. Create Materi
**POST** `/api/materi`

### 60. Update Materi
**PUT** `/api/materi/{id}`

### 61. Delete Materi
**DELETE** `/api/materi/{id}`

---

## E-Sertifikat

### 62. Get All E-Sertifikat
**GET** `/api/e-sertifikat`

### 63. Generate E-Sertifikat
**POST** `/api/e-sertifikat/generate`

### 64. Download E-Sertifikat
**GET** `/api/e-sertifikat/{id}/download`

---

## Revisi

### 65. Get All Revisi
**GET** `/api/revisi`

### 66. Create Revisi
**POST** `/api/revisi`

### 67. Update Revisi
**PUT** `/api/revisi/{id}`

---

## Laporan

### 68. Get All Laporan
**GET** `/api/laporan`

### 69. Generate Laporan
**POST** `/api/laporan/generate`

### 70. Export Laporan
**GET** `/api/laporan/export/{type}`

---

## Dashboard

### 71. Get Dashboard Stats
**GET** `/api/dashboard`

**Response:**
```json
{
  "status": 200,
  "data": {
    "totalTraining": 0,
    "totalParticipant": 0,
    "totalInstruktur": 0,
    "activeSessions": 0
  }
}
```

---

## Profile

### 72. Get Profile
**GET** `/api/profile`

### 73. Update Profile
**PUT** `/api/profile`

### 74. Change Password
**PUT** `/api/profile/change-password`

---

## Sertifikat Verify

### 75. Verify Sertifikat
**POST** `/api/sertifikat/verify`

**Request Body:**
```json
{
  "nomorSertifikat": "string"
}
```

---

## My Training

### 76. Get My Trainings
**GET** `/api/my-training`

### 77. Get My Training By ID
**GET** `/api/my-training/{id}`

---

## Penilaian

### 78. Get All Penilaian
**GET** `/api/penilaian`

### 79. Get Penilaian By ID
**GET** `/api/penilaian/{id}`

### 80. Create Penilaian
**POST** `/api/penilaian`

### 81. Update Penilaian
**PUT** `/api/penilaian/{id}`

### 82. Delete Penilaian
**DELETE** `/api/penilaian/{id}`

---

## Authentication Headers

All endpoints (except Login, Register, Forgot Password, Verify Sertifikat) require:

- Authorization: Bearer {token}
- Content-Type: application/json

## Error Response Format

```json
{
  "status": "4xx",
  "message": "Error description",
  "errors": {}
}
```

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Validation Error |
| 500 | Internal Server Error |

---

*Document generated on 2026-06-01*
