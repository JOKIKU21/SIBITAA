### Get Session Info (Better Auth)

```sh
curl -X GET http://localhost:3001/api/auth/session \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "session": {
    "id": "DKVAvxcwDiMdRiJe27goQ8QYHkkzaBDm",
    "userId": "y84GD4aSsU1bQDxpO7tPRKzBCs0uGcV0",
    "token": "7UHYBS6MPlKdDLAuOgmU98T8nfbLVxxC",
    "expiresAt": "2026-07-11T04:08:17.370Z",
    "userAgent": "PostmanRuntime/7.39.1",
    "ipAddress": "",
    "createdAt": "2026-07-04T04:08:17.370Z",
    "updatedAt": "2026-07-04T04:08:17.370Z"
  },
  "user": {
    "id": "user-uuid-1234",
    "name": "Budi Utomo",
    "email": "budi@student.unud.ac.id",
    "emailVerified": true,
    "image": "https://lh3.googleusercontent.com/...",
    "phoneNumber": "081234567890",
    "role": "student",
    "status": "active",
    "createdAt": "2026-07-03T06:11:01.000Z",
    "updatedAt": "2026-07-03T06:31:04.000Z"
  }
}
```

### Change Password (while Logged In)

```sh
curl -X POST http://localhost:3001/api/auth/change-password \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"currentPassword": "password123", "newPassword": "newpassword456"}'
```

### Update Profile (student)

```sh
curl -X PATCH http://localhost:3001/api/users/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{"name": "John Updated", "campus": "Universitas Udayana", "studyProgram": "Teknik Informatika", "education": "S1"}'
```

### Get Student Profile

```sh
curl -X GET http://localhost:3001/api/student/profile \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "name": "Ahmad Fauzi",
  "nim": "10115001",
  "email": "ahmad.fauzi@sibita.com",
  "education": "S1",
  "phoneNumber": "081234567890",
  "studyProgram": "Teknik Informatika",
  "campus": "Universitas Negeri",
  "advisor": {
    "name": "Dr. Ir. Budi Santoso, M.T.",
    "email": "budi.santoso@sibita.com"
  },
  "status": "active"
}
```

### Get Student Stage

```sh
curl -X GET http://localhost:3001/api/student/bimbingan \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "progress": {
    "studentId": "user-uuid-1234",
    "currentStageId": "stage_1",
    "startedAt": "2026-07-08T14:26:14.651Z",
    "status": "in progress",
    "finishedAt": "2026-07-08T14:26:14.651Z",
    "updatedAt": "2026-07-08T14:26:14.651Z"
  },
  "stages": [
    {
      "id": "stage_1",
      "order": 1,
      "name": "Pengajuan Topik Skripsi",
      "description": "Mahasiswa mengajukan judul skripsi beserta rumusan masalah.",
      "durationDays": 14
    }
  ]
}
```

### Get Detail Student Stage

```sh
curl -X GET http://localhost:3001/api/student/bimbingan/:stageId \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "stage": {
    "id": "stage_1",
    "order": 1,
    "name": "Pengajuan Topik Skripsi",
    "description": "Mahasiswa mengajukan judul skripsi beserta rumusan masalah.",
    "durationDays": 14,
    "createdAt": "2026-07-08T14:26:49.546Z"
  },
  "notes": [
    {
      "id": "note-uuid-999",
      "studentId": "user-uuid-1234",
      "stageId": "stage_1",
      "data": {
        "topik_penelitian": "Draft pertama diserahkan ke pembimbing",
        "rumusan_masalah": "Perlu diperjelas pada bagian latar belakang",
        "judul_penelitian": "Analisis Pengaruh Media Sosial terhadap Perilaku Konsumen"
      },
      "createdAt": "2026-07-08T14:26:49.546Z",
      "completedAt": "2026-07-08T14:26:49.546Z",
      "updatedAt": "2026-07-08T14:26:49.546Z"
    }
  ],
  "files": [
    {
      "id": "file-uuid-888",
      "studentId": "user-uuid-1234",
      "stageId": "stage_1",
      "fileName": "Proposal_Skripsi.pdf",
      "fileUrl": "https://storage.sibita.com/files/proposal.pdf",
      "fileType": "application/pdf",
      "fileSize": 1453200,
      "createdAt": "2026-07-08T14:26:49.546Z"
    }
  ]
}
```

### Create Note for Student Stage

```sh
curl -X POST http://localhost:3001/api/student/bimbingan/:stageId/notes \
  -H "Cookie: better-auth.session_token=..." \
  -H "Content-Type: application/json" \
  -d '{"data": {"topik_penelitian": "Draft pertama diserahkan ke pembimbing", "rumusan_masalah": "Perlu diperjelas pada bagian latar belakang", "judul_penelitian": "Analisis Pengaruh Media Sosial terhadap Perilaku Konsumen"}}'
```

returns:

```json
{
  "note": {
    "id": "note-uuid-999",
    "studentId": "user-uuid-1234",
    "stageId": "stage_1",
    "data": {
      "topik_penelitian": "Draft pertama diserahkan ke pembimbing",
      "rumusan_masalah": "Perlu diperjelas pada bagian latar belakang",
      "judul_penelitian": "Analisis Pengaruh Media Sosial terhadap Perilaku Konsumen"
    },
    "createdAt": "2026-07-09T02:46:18.329Z",
    "completedAt": null,
    "updatedAt": null
  }
}
```

### Update Detail Student Stage

```sh
curl -X PATCH http://localhost:3001/api/student/bimbingan/:stageId \
  -H "Cookie: better-auth.session_token=..." \
  -H "Content-Type: application/json" \
  -d '{"data": {"topik_penelitian": "Topik penelitian telah diperbarui", "rumusan_masalah": "Rumusan masalah telah diperjelas", "judul_penelitian": "Judul penelitian telah disesuaikan"}}'
```

returns:

```json
{
  "note": {
    "id": "note-uuid-999",
    "studentId": "user-uuid-1234",
    "stageId": "stage_1",
    "data": {
      "comment": "Draft pertama diserahkan ke pembimbing"
    },
    "createdAt": "2026-07-09T02:46:18.329Z",
    "completedAt": "2026-07-09T02:46:18.329Z",
    "updatedAt": "2026-07-09T02:46:18.329Z"
  }
}
```

### Get Reference File

```sh
curl -X GET http://localhost:3001/api/reference-files \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "referenceFiles": [
    {
      "id": "ref-uuid-111",
      "title": "Pedoman Penulisan Skripsi",
      "description": "Buku panduan format dan tata cara penulisan skripsi.",
      "type": "guideline",
      "fileName": "panduan_skripsi_v2.pdf",
      "fileUrl": "https://example.com/files/panduan_skripsi_v2.pdf",
      "fileType": "application/pdf",
      "fileSize": 2048000,
      "author": "Tim Akademik",
      "createdAt": "2026-07-06T05:52:21.195Z",
      "updatedAt": "2026-07-06T05:52:21.195Z"
    }
  ]
}
```
