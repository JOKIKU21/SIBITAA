# Melakukan ACC Tahap & Otomatis Majukan Progress (Approve & Advance)
Menyetujui (ACC) tahapan bimbingan mahasiswa. Endpoint ini akan mengubah status `stageNote` di tahap saat ini menjadi `"approved"`, mengisi `completedAt`, dan secara otomatis **menaikkan `currentStageOrder` pada `studentProgress` mahasiswa ke tahap berikutnya** sesuai urutan skema. Jika ini adalah tahap terakhir (Tahap 17), status progress akan diubah menjadi `"completed"`.

* **Endpoint:** `POST /api/lecturer/bimbingan/:studentId/:stageId/approve`
* **Autentikasi:** Wajib (Role: `lecturer`)
* **URL Params:**
  * `studentId` (string, wajib): UUID mahasiswa bimbingan.
  * `stageId` (integer, wajib): Nomor urut tahapan bimbingan yang ingin disetujui (1 - 17).
* **Content-Type:** `application/json`

#### Contoh Response (200 OK)
```json
{
  "message": "Stage approved successfully",
  "currentStageOrder": 2,
  "status": "in progress",
  "progress": {
    "studentId": "student-uuid-5566-7788",
    "currentStageOrder": 2,
    "startedAt": "2026-07-14T08:45:00.000Z",
    "status": "in progress",
    "finishedAt": null,
    "updatedAt": "2026-07-15T19:09:30.000Z"
  }
}
```