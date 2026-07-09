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

### Get Lecturer Profile

```sh
curl -X GET http://localhost:3001/api/lecturer/profile \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "profile": {
    "userId": "35rUwjw80KO9xJv7ItTCxxRvNMIe8UWd",
    "nidn": "0412038501",
    "campus": "Universitas SIBITA",
    "department": "Teknik Informatika",
    "createdAt": "2026-07-06T05:55:50.821Z",
    "updatedAt": "2026-07-06T05:55:50.821Z"
  }
}
```

### Get Lecturer Summary Dashboard

```sh
curl -X GET http://localhost:3001/api/lecturer/dashboard/summary \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "totalStudents": 2,
  "approachingDeadlineCount": 1,
  "overdueCount": 0
}
```

### Get All Students for Lecturer

```sh
curl -X GET http://localhost:3001/api/lecturer/students \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "students": [
    {
      "studentId": "PWqKV1ZJbiLZJ8uSi0w78fsHMhmFX6o0",
      "name": "Mahasiswa SIBITA",
      "nim": "10115001",
      "studyProgram": "Teknik Informatika",
      "image": null,
      "email": "student@sibita.com",
      "thesisTitle": "Analisis Performa Model Bahasa Besar pada Dataset Lokal.",
      "currentStageName": "Revisi Proposal Penelitian",
      "currentStage": {
        "id": "9b6b53db-bd27-4ae9-bd0a-32e695b766dd",
        "order": 4,
        "name": "Revisi Proposal Penelitian",
        "durationDays": 7
      },
      "progressPercentage": 18,
      "status": "Mendekati Tenggat"
    },
    {
      "studentId": "94o3nj2Lh6sKdRIe8SHXm6IH11hltTKN",
      "name": "jokimu2100@gmail.com",
      "nim": "2215091001",
      "studyProgram": "Teknik Informatika",
      "image": null,
      "email": "jokimu2100@gmail.com",
      "thesisTitle": "Bab 1 direvisi sesuai saran",
      "currentStageName": "Belum Mulai",
      "currentStage": null,
      "progressPercentage": 0,
      "status": "Aktif"
    }
  ]
}
```

### Get Student Progress for Lecturer

```sh
curl -X GET http://localhost:3001/api/lecturer/students/:studentId \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "stages": [
    {
      "id": "5f8eefeb-589b-4617-a48f-93b6651d0461",
      "order": 1,
      "name": "Diskusi Konsep dan Judul Penelitian",
      "description": "Diskusikan topik, permasalahan, dan judul penelitian bersama dosen pembimbing",
      "durationDays": 7,
      "createdAt": "2026-07-06T05:55:49.810Z"
    },
    {
      "id": "9ccfe310-a17b-48b8-8e06-f6b358ec2415",
      "order": 2,
      "name": "Penyusunan Proposal Penelitian",
      "description": "Susun BAB I–III sebagai dasar proposal yang akan diajukan ke pembimbing",
      "durationDays": 14,
      "createdAt": "2026-07-06T05:55:49.842Z"
    },
    {
      "id": "759f25a1-e19d-4dae-a384-604717a61f22",
      "order": 3,
      "name": "Konsultasi Dosen Pembimbing (ke-1)",
      "description": "Ajukan proposal ke pembimbing untuk mendapatkan masukan pertama",
      "durationDays": 7
    },
    {
      "id": "9b6b53db-bd27-4ae9-bd0a-32e695b766dd",
      "order": 4,
      "name": "Revisi Proposal Penelitian",
      "description": "Perbaiki proposal sesuai masukan dosen pada konsultasi pertama",
      "durationDays": 7
    },
    {
      "id": "ba70ce0f-2efe-48a5-9dd9-91c0db303fa6",
      "order": 5,
      "name": "Persiapan dan Ujian Proposal",
      "description": "Siapkan berkas dan presentasi untuk ujian proposal penelitian",
      "durationDays": 7
    },
    {
      "id": "22c5c749-2eb8-4b48-b348-d50c5a3bf97b",
      "order": 6,
      "name": "Penyusunan Instrumen Penelitian",
      "description": "Buat instrumen (kuesioner/wawancara) sesuai metodologi yang telah disetujui",
      "durationDays": 7
    },
    {
      "id": "9cd96443-2729-4631-94b6-cb726fa6afb4",
      "order": 7,
      "name": "Konsultasi Dosen Pembimbing (ke-2)",
      "description": "Validasikan instrumen penelitian bersama dosen pembimbing",
      "durationDays": 7,
      "createdAt": "2026-07-06T05:55:49.980Z"
    },
    {
      "id": "afbabbb1-c93a-4b43-85f5-0b4faa73d2db",
      "order": 8,
      "name": "Pengambilan Data Penelitian",
      "description": "Lakukan pengumpulan data di lapangan sesuai instrumen yang telah divalidasi",
      "durationDays": 21
    },
    {
      "id": "2f05df6e-7eef-4271-b9e1-6e0c136acc72",
      "order": 9,
      "name": "Pengolahan Data Penelitian",
      "description": "Analisis dan olah data yang telah dikumpulkan menggunakan metode yang dipilih",
      "durationDays": 7
    },
    {
      "id": "e26007d1-e7c6-4859-b0b2-a446717efd82",
      "order": 10,
      "name": "Penyusunan Bab IV (Hasil Penelitian & Pembahasan)",
      "description": "Tulis hasil analisis dan pembahasan penelitian secara komprehensif",
      "durationDays": 14
    },
    {
      "id": "db73b929-5d31-416a-b00a-6915ff2fe1ad",
      "order": 11,
      "name": "Konsultasi Dosen Pembimbing (ke-3)",
      "description": "Konsultasikan BAB IV kepada dosen untuk mendapatkan masukan",
      "durationDays": 7
    },
    {
      "id": "dfd2ea06-049a-40a5-bd91-3685bb3b211b",
      "order": 12,
      "name": "Revisi Bab IV",
      "description": "Perbaiki BAB IV berdasarkan masukan dari dosen pembimbing",
      "durationDays": 7
    },
    {
      "id": "12d518d0-e5d7-4c15-943e-de5afad3f8c3",
      "order": 13,
      "name": "Penyusunan Bab V",
      "description": "Tulis kesimpulan dan saran berdasarkan temuan penelitian",
      "durationDays": 7
    },
    {
      "id": "07c37de6-3b8a-403b-af03-4f5521a46110",
      "order": 14,
      "name": "Penyusunan Bab I sd Bab V",
      "description": "Gabungkan seluruh bab menjadi satu naskah utuh dan periksa konsistensinya",
      "durationDays": 7
    },
    {
      "id": "3f266738-547e-430b-9f87-66f57fc16c68",
      "order": 15,
      "name": "Konsultasi Dosen Pembimbing (ke-4)",
      "description": "Ajukan draft final untuk persetujuan akhir sebelum sidang",
      "durationDays": 7
    },
    {
      "id": "97206fcc-17ef-42c9-87bb-9db5f71a34fd",
      "order": 16,
      "name": "Persiapan Ujian Akhir",
      "description": "Lengkapi administrasi sidang dan siapkan berkas pendaftaran ujian akhir",
      "durationDays": 7
    },
    {
      "id": "80f7b686-cf53-413d-bd4f-46ae161c3fba",
      "order": 17,
      "name": "Ujian Akhir & Revisi Naskah Akhir",
      "description": "Ikuti ujian akhir/sidang dan lakukan revisi naskah akhir sesuai masukan penguji",
      "durationDays": 7
    }
  ],
  "progress": {
    "studentId": "PWqKV1ZJbiLZJ8uSi0w78fsHMhmFX6o0",
    "currentStageId": "9b6b53db-bd27-4ae9-bd0a-32e695b766dd",
    "startedAt": "2026-06-06T05:55:51.004Z",
    "status": "in progress",
    "finishedAt": null,
    "updatedAt": "2026-07-06T05:55:51.059Z"
  }
}
```

### Get Student Detail Stage for Lecturer

```sh
curl -X GET http://localhost:3001/api/lecturer/students/:studentId/:stageId \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "stage": {
    "id": "5f8eefeb-589b-4617-a48f-93b6651d0461",
    "order": 1,
    "name": "Diskusi Konsep dan Judul Penelitian",
    "description": "Diskusikan topik, permasalahan, dan judul penelitian bersama dosen pembimbing",
    "durationDays": 7,
    "createdAt": "2026-07-06T05:55:49.810Z"
  },
  "notes": [
    {
      "id": "107f32c7-a9c9-4d4d-9771-54efc9ebf9ca",
      "studentId": "PWqKV1ZJbiLZJ8uSi0w78fsHMhmFX6o0",
      "stageId": "5f8eefeb-589b-4617-a48f-93b6651d0461",
      "data": {
        "comment": "Diskusi konsep judul skripsi disetujui oleh dosen pembimbing: Analisis Performa Model Bahasa Besar pada Dataset Lokal."
      },
      "createdAt": "2026-06-11T05:55:51.083Z",
      "completedAt": "2026-06-12T05:55:51.083Z",
      "updatedAt": "2026-07-06T05:55:51.138Z"
    }
  ],
  "files": []
}
```
