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