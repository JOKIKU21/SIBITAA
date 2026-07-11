# SIBITA API Documentation (Bimbingan & Chat)

Dokumentasi ini menjelaskan endpoints API untuk fitur **Bimbingan Mandiri** (Thesis Stages) dan **Chat** baik untuk peran Mahasiswa (Student) maupun Dosen (Lecturer).

> [!NOTE]
> Parameter `:stageId` atau `stageId` pada seluruh endpoint di bawah menggunakan nomor urut/sequence **`order`** tahapan (integer 1-17), bukan UUID atau slug.

---

## 📚 Fitur Bimbingan Mandiri

### 1. Ambil Daftar Tahapan Bimbingan (Mahasiswa)
Mengambil seluruh 17 tahapan bimbingan beserta data progres aktif mahasiswa saat ini.

* **Endpoint:** `GET /api/student/bimbingan`
* **Autentikasi:** Wajib (Role: `student`)

#### Contoh Response (200 OK)
```json
{
  "progress": {
    "id": "progress-uuid-1111",
    "studentId": "student-uuid-1234",
    "currentStageOrder": 4,
    "startedAt": "2026-07-09T13:52:43.847Z",
    "status": "in_progress",
    "stageDeadline": "2026-07-16T13:52:43.847Z",
    "createdAt": "2026-07-09T13:52:43.847Z",
    "updatedAt": "2026-07-09T13:52:43.847Z"
  },
  "stages": [
    {
      "order": 1,
      "name": "Diskusi Konsep dan Judul Penelitian",
      "durationDays": 7
    },
    {
      "order": 2,
      "name": "Penyusunan Proposal",
      "durationDays": 14
    }
  ]
}
```

---

### 2. Ambil Detail Tahapan Bimbingan (Mahasiswa)
Mengambil detail dari satu tahapan tertentu berdasarkan nomor urut `:stageId` (1-17), termasuk daftar catatan (`notes`) dan berkas lampiran (`files`).

* **Endpoint:** `GET /api/student/bimbingan/:stageId`
* **Autentikasi:** Wajib (Role: `student`)

#### Contoh Response (200 OK)
```json
{
  "stage": {
    "order": 1,
    "name": "Diskusi Konsep dan Judul Penelitian",
    "durationDays": 7,
    "createdAt": "2026-07-09T13:24:33.863Z",
    "updatedAt": "2026-07-09T13:24:33.863Z"
  },
  "notes": [
    {
      "id": "note-uuid-1111",
      "studentId": "student-uuid-1234",
      "stageOrder": 1,
      "authorId": "student-uuid-1234",
      "data": {
        "judul_penelitian": "Analisis Performa Model Bahasa Besar pada Dataset Lokal",
        "topik_penelitian": "Kecerdasan Buatan dan Pemrosesan Bahasa Alami"
      },
      "comment": "Konsep judul skripsi disetujui.",
      "status": "approved",
      "completedAt": "2026-06-15T13:26:28.146Z",
      "createdAt": "2026-06-14T13:26:28.146Z",
      "updatedAt": "2026-07-09T13:28:24.617Z"
    }
  ],
  "files": [
    {
      "id": "file-uuid-2222",
      "studentId": "student-uuid-1234",
      "stageOrder": 1,
      "uploadedById": "student-uuid-1234",
      "fileName": "Draft_Judul_Skripsi.pdf",
      "fileUrl": "https://example.com/files/draft_judul.pdf",
      "fileType": "application/pdf",
      "fileSize": 153600,
      "createdAt": "2026-06-14T13:26:28.180Z",
      "updatedAt": "2026-06-14T13:26:28.180Z"
    }
  ]
}
```

---

### 3. Ambil Daftar Tahapan Bimbingan Mahasiswa (Dosen View)
Dosen memantau daftar tahapan bimbingan serta progres aktif mahasiswa bimbingan tertentu.

* **Endpoint:** `GET /api/lecturer/bimbingan/:studentId`
* **Autentikasi:** Wajib (Role: `lecturer`, harus dosen wali/pembimbing mahasiswa tersebut)

#### Contoh Response (200 OK)
Struktur respon sama dengan versi mahasiswa:
```json
{
  "progress": {
    "id": "progress-uuid-1111",
    "studentId": "student-uuid-1234",
    "currentStageOrder": 4,
    "startedAt": "2026-07-09T13:52:43.852Z",
    "status": "in_progress",
    "stageDeadline": "2026-07-16T13:52:43.852Z",
    "createdAt": "2026-07-09T13:52:43.852Z",
    "updatedAt": "2026-07-09T13:52:43.852Z"
  },
  "stages": [
    {
      "order": 1,
      "name": "Diskusi Konsep dan Judul Penelitian",
      "durationDays": 7
    }
  ]
}
```

---

### 4. Ambil Detail Tahapan Bimbingan Mahasiswa (Dosen View)
Dosen melihat detail tahapan tertentu, termasuk catatan bimbingan (`notes`) dan berkas (`files`) mahasiswa bimbingannya.

* **Endpoint:** `GET /api/lecturer/bimbingan/:studentId/:stageId`
* **Autentikasi:** Wajib (Role: `lecturer`, harus dosen wali/pembimbing mahasiswa tersebut)

#### Contoh Response (200 OK)
Struktur respon sama dengan detail bimbingan versi mahasiswa.

---

## 💬 Fitur Chat / Percakapan Bimbingan

### 5. Ambil Riwayat Chat (Mahasiswa)
Mengambil riwayat pesan bimbingan mahasiswa pada tahapan bimbingan tertentu.

* **Endpoint:** `GET /api/student/chat/:stageId?limit=50&offset=0`
* **Autentikasi:** Wajib (Role: `student`)

#### Contoh Response (200 OK)
```json
{
  "messages": [
    {
      "id": "chat-message-uuid-abcde",
      "studentId": "student-uuid-1234",
      "senderId": "lecturer-uuid-5678",
      "stageOrder": 1,
      "message": "Silakan kirimkan perbaikan latar belakang.",
      "fileName": "koreksi.pdf",
      "fileUrl": "https://example.com/uploads/koreksi.pdf",
      "fileType": "application/pdf",
      "fileSize": 102400,
      "createdAt": "2026-07-09T13:56:25.876Z",
      "updatedAt": "2026-07-09T13:56:25.876Z",
      "sender": {
        "id": "lecturer-uuid-5678",
        "name": "Dr. Dosen Pembimbing",
        "image": null
      }
    }
  ],
  "advisor": {
    "id": "lecturer-uuid-5678",
    "name": "Dr. Dosen Pembimbing",
    "image": null
  },
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 1
  }
}
```

---

### 6. Ambil Riwayat Chat dengan Mahasiswa (Dosen View)
Dosen mengambil riwayat pesan dengan mahasiswa bimbingan tertentu pada tahapan tertentu.

* **Endpoint:** `GET /api/lecturer/chat/:studentId/:stageId?limit=50&offset=0`
* **Autentikasi:** Wajib (Role: `lecturer`, harus dosen wali/pembimbing mahasiswa tersebut)

#### Contoh Response (200 OK)
```json
{
  "messages": [
    {
      "id": "chat-message-uuid-abcde",
      "studentId": "student-uuid-1234",
      "senderId": "lecturer-uuid-5678",
      "stageOrder": 1,
      "message": "Silakan kirimkan perbaikan latar belakang.",
      "fileName": "koreksi.pdf",
      "fileUrl": "https://example.com/uploads/koreksi.pdf",
      "fileType": "application/pdf",
      "fileSize": 102400,
      "createdAt": "2026-07-09T13:56:25.876Z",
      "updatedAt": "2026-07-09T13:56:25.876Z",
      "sender": {
        "id": "lecturer-uuid-5678",
        "name": "Dr. Dosen Pembimbing",
        "image": null
      }
    }
  ],
  "student": {
    "id": "student-uuid-1234",
    "name": "Mahasiswa SIBITA",
    "image": null
  },
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 1
  }
}
```

---

### 7. Kirim Pesan Chat (Mahasiswa)
Mengirimkan pesan ke dosen pembimbing pada tahapan bimbingan tertentu.

* **Endpoint:** `POST /api/student/chat/:stageId`
* **Autentikasi:** Wajib (Role: `student`)
* **Request Body:**
  ```json
  {
    "message": "Selamat pagi Pak, saya sudah mengunggah draf bab 1."
  }
  ```

#### Contoh Response (201 Created)
```json
{
  "message": {
    "id": "chat-message-uuid-2222",
    "studentId": "student-uuid-1234",
    "senderId": "student-uuid-1234",
    "stageOrder": 1,
    "message": "Selamat pagi Pak, saya sudah mengunggah draf bab 1.",
    "fileName": null,
    "fileUrl": null,
    "fileType": null,
    "fileSize": null,
    "createdAt": "2026-07-09T14:02:11.120Z",
    "updatedAt": "2026-07-09T14:02:11.120Z"
  }
}
```

---

### 8. Kirim Pesan Chat ke Mahasiswa (Dosen View)
Dosen mengirimkan pesan ke mahasiswa bimbingannya pada tahapan bimbingan tertentu.

* **Endpoint:** `POST /api/lecturer/chat/:studentId/:stageId`
* **Autentikasi:** Wajib (Role: `lecturer`, harus dosen wali/pembimbing mahasiswa tersebut)
* **Request Body:**
  ```json
  {
    "message": "Saya sudah memeriksa draf Anda. Silakan lengkapi revisi bagian metodologi."
  }
  ```

#### Contoh Response (201 Created)
```json
{
  "message": {
    "id": "chat-message-uuid-3333",
    "studentId": "student-uuid-1234",
    "senderId": "lecturer-uuid-5678",
    "stageOrder": 1,
    "message": "Saya sudah memeriksa draf Anda. Silakan lengkapi revisi bagian metodologi.",
    "fileName": null,
    "fileUrl": null,
    "fileType": null,
    "fileSize": null,
    "createdAt": "2026-07-09T14:04:45.312Z",
    "updatedAt": "2026-07-09T14:04:45.312Z"
  }
}
```


### 9. Daftar Thread Obrolan Mahasiswa (List Chat Threads)
Menampilkan daftar seluruh mahasiswa bimbingan dosen tersebut beserta preview pesan terakhir dan total pesan dari chat thread mereka.

* **Endpoint:** `GET /api/lecturer/chat`
* **Autentikasi:** Wajib (Role: `lecturer`)

#### Contoh Response (200 OK)
```json
{
  "threads": [
    {
      "student": {
        "userId": "student-uuid-1234",
        "name": "Mahasiswa SIBITA",
        "email": "student@sibita.com",
        "image": "https://lh3.googleusercontent.com/a/acds12"
      },
      "latestMessage": {
        "id": "chat-uuid-111",
        "studentId": "student-uuid-1234",
        "senderId": "student-uuid-1234",
        "stageOrder": 1,
        "message": "Permisi pak, saya sudah mengunggah revisi proposal bab 1.",
        "fileName": "Proposal_Revisi_v1.pdf",
        "fileUrl": "https://storage.sibita.com/files/proposal_revisi_v1.pdf",
        "fileType": "application/pdf",
        "fileSize": 2048576,
        "createdAt": "2026-07-11T01:23:45.000Z",
        "stage": {
          "order": 1,
          "name": "Pengajuan Proposal"
        }
      },
      "totalMessages": 12
    }
  ]
}
```
