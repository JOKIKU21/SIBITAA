### Get Student Stage List

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
    "startedAt": "2026-07-09T13:52:43.847Z",
    "status": "in progress",
    "finishedAt": "2026-07-09T13:52:43.847Z",
    "updatedAt": "2026-07-09T13:52:43.847Z"
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
curl -X GET http://localhost:3001/api/student/bimbingan/{stageId} \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "stage": {
    "id": "09ceb569-1a9c-4bd0-9b6a-3b29d37502ff",
    "order": 1,
    "name": "Diskusi Konsep dan Judul Penelitian",
    "slug": "diskusi-konsep-dan-judul-penelitian",
    "durationDays": 7,
    "createdAt": "2026-07-09T13:24:33.863Z"
  },
  "notes": [
    {
      "id": "1765ce76-6d5d-44e8-a1dc-a5dbd38fe39f",
      "studentId": "Q3oGcQsMU7Fg8m7Yb9RhKoRCLHU9GXj8",
      "stageId": "09ceb569-1a9c-4bd0-9b6a-3b29d37502ff",
      "data": {
        "rumusan_masalah": "Bagaimana meningkatkan akurasi fine-tuning Model Bahasa Besar (LLM) untuk mendeteksi dialek bahasa daerah dengan keterbatasan dataset?",
        "judul_penelitian": "Analisis Performa Model Bahasa Besar pada Dataset Lokal",
        "topik_penelitian": "Kecerdasan Buatan dan Pemrosesan Bahasa Alami",
        "alasan_penelitian": "Dialek bahasa daerah sering kali tidak terwakili dengan baik dalam LLM komersial, sehingga penelitian ini penting untuk pelestarian bahasa lokal."
      },
      "comment": "Diskusi konsep judul skripsi disetujui oleh dosen pembimbing: Analisis Performa Model Bahasa Besar pada Dataset Lokal.",
      "status": "approved",
      "createdAt": "2026-06-14T13:26:28.146Z",
      "completedAt": "2026-06-15T13:26:28.146Z",
      "updatedAt": "2026-07-09T13:28:24.617Z"
    }
  ],
  "files": [
    {
      "id": "3b86ca95-4f08-4ed5-ac75-147af1ee6a50",
      "studentId": "Q3oGcQsMU7Fg8m7Yb9RhKoRCLHU9GXj8",
      "stageId": "09ceb569-1a9c-4bd0-9b6a-3b29d37502ff",
      "fileName": "Draft_Judul_Skripsi.pdf",
      "fileUrl": "https://example.com/files/draft_judul.pdf",
      "fileType": "application/pdf",
      "fileSize": 153600,
      "type": "student",
      "createdAt": "2026-06-14T13:26:28.180Z"
    }
  ]
}
```

### Get Student Stage List (Lecturer View)

```sh
curl -X GET http://localhost:3001/api/lecturer/bimbingan/{studentId} \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "progress": {
    "studentId": "user-uuid-1234",
    "currentStageId": "stage_1",
    "startedAt": "2026-07-09T13:52:43.852Z",
    "status": "in progress",
    "finishedAt": "2026-07-09T13:52:43.852Z",
    "updatedAt": "2026-07-09T13:52:43.852Z"
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

### Get Detail Student Stage (Lecturer View)

```sh
curl -X GET http://localhost:3001/api/lecturer/bimbingan/{studentId}/{stageId} \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "stage": {
    "id": "09ceb569-1a9c-4bd0-9b6a-3b29d37502ff",
    "order": 1,
    "name": "Diskusi Konsep dan Judul Penelitian",
    "slug": "diskusi-konsep-dan-judul-penelitian",
    "durationDays": 7,
    "createdAt": "2026-07-09T13:24:33.863Z"
  },
  "notes": [
    {
      "id": "1765ce76-6d5d-44e8-a1dc-a5dbd38fe39f",
      "studentId": "Q3oGcQsMU7Fg8m7Yb9RhKoRCLHU9GXj8",
      "stageId": "09ceb569-1a9c-4bd0-9b6a-3b29d37502ff",
      "data": {
        "rumusan_masalah": "Bagaimana meningkatkan akurasi fine-tuning Model Bahasa Besar (LLM) untuk mendeteksi dialek bahasa daerah dengan keterbatasan dataset?",
        "judul_penelitian": "Analisis Performa Model Bahasa Besar pada Dataset Lokal",
        "topik_penelitian": "Kecerdasan Buatan dan Pemrosesan Bahasa Alami",
        "alasan_penelitian": "Dialek bahasa daerah sering kali tidak terwakili dengan baik dalam LLM komersial, sehingga penelitian ini penting untuk pelestarian bahasa lokal."
      },
      "comment": "Diskusi konsep judul skripsi disetujui oleh dosen pembimbing: Analisis Performa Model Bahasa Besar pada Dataset Lokal.",
      "status": "approved",
      "createdAt": "2026-06-14T13:26:28.146Z",
      "completedAt": "2026-06-15T13:26:28.146Z",
      "updatedAt": "2026-07-09T13:34:11.068Z"
    }
  ],
  "files": [
    {
      "id": "3b86ca95-4f08-4ed5-ac75-147af1ee6a50",
      "studentId": "Q3oGcQsMU7Fg8m7Yb9RhKoRCLHU9GXj8",
      "stageId": "09ceb569-1a9c-4bd0-9b6a-3b29d37502ff",
      "fileName": "Draft_Judul_Skripsi.pdf",
      "fileUrl": "https://example.com/files/draft_judul.pdf",
      "fileType": "application/pdf",
      "fileSize": 153600,
      "type": "student",
      "createdAt": "2026-06-14T13:26:28.180Z"
    }
  ]
}
```

### Get Student Stage Chat Messages

```sh
curl -X GET http://localhost:3001/api/student/chat/:stageId \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "messages": [
    {
      "id": "chat-uuid-111",
      "studentId": "user-uuid-1234",
      "senderId": "lecturer-uuid-5678",
      "stageId": "stage-uuid-555",
      "message": "Silakan kirimkan perbaikan latar belakang.",
      "fileName": "koreksi.pdf",
      "fileUrl": "string",
      "fileType": "string",
      "fileSize": 0,
      "createdAt": "2026-07-09T13:56:25.876Z"
    }
  ]
}
```

### Get Lecturer Stage Chat Messages

```sh
curl -X GET http://localhost:3001/api/lecturer/chat/:studentId/:stageId \
  -H "Cookie: better-auth.session_token=..."
```

returns:

```json
{
  "messages": [
    {
      "id": "chat-uuid-111",
      "studentId": "user-uuid-1234",
      "senderId": "lecturer-uuid-5678",
      "stageId": "stage-uuid-555",
      "message": "Silakan kirimkan perbaikan latar belakang.",
      "fileName": "koreksi.pdf",
      "fileUrl": "string",
      "fileType": "string",
      "fileSize": 0,
      "createdAt": "2026-07-09T13:57:23.912Z"
    }
  ]
}
```

### Send Chat Message (Student)

```sh
curl -X POST http://localhost:3001/api/student/chat/:stageId \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{
    "message": "Silakan kirimkan perbaikan latar belakang.",
  }'
```

### Send Chat Message (Lecturer)

```sh
curl -X POST http://localhost:3001/api/lecturer/chat/:studentId/:stageId \
  -H "Content-Type: application/json" \
  -H "Cookie: better-auth.session_token=..." \
  -d '{
    "message": "Saya sudah menerima perbaikan latar belakang Anda. Silakan lanjutkan ke tahap berikutnya.",
  }'
```