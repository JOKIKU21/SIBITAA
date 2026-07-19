--

## 📡 Kelompok API: 💳 Student Payments (Pembayaran Mahasiswa)
API yang digunakan oleh mahasiswa untuk mengelola dan memantau riwayat cicilan pembayaran pendaftaran mereka.

### 🔹 Daftar Pembayaran Cicilan Sendiri
Mendapatkan daftar seluruh riwayat cicilan pembayaran mahasiswa yang bersangkutan beserta status registrasinya.

* **Endpoint:** `GET /api/student/payments`
* **Headers:** `Authorization: Bearer <token>`
* **Contoh Respons:**
  * **Status `200`**: Daftar cicilan pembayaran berhasil dimuat.
    * Body (`application/json`):
      ```json
      {
        "payments": [
          {
            "registrationId": "reg-uuid-444",
            "studentId": "student-uuid-555",
            "studentName": "Budi Utomo",
            "totalAmount": 2000000,
            "paidAmount": 1000000,
            "paymentOption": "installment_2x",
            "status": "approved",
            "payments": [
              {
                "id": "pay-uuid-222",
                "installment": 1,
                "amount": 1000000,
                "status": "paid",
                "paidAt": "2026-07-11T13:00:00.000Z",
                "note": "Cicilan ke-1 lunas",
                "files": [
                  {
                    "id": "file-uuid-111",
                    "type": "payment_proof",
                    "fileName": "bukti_bayar_cicilan_1.png",
                    "fileUrl": "https://api.sibita.com/uploads/registrations/bukti_bayar_cicilan_1.png",
                    "fileSize": 102456
                  }
                ]
              },
              {
                "id": "pay-uuid-333",
                "installment": 2,
                "amount": 1000000,
                "status": "processing",
                "paidAt": null,
                "note": null,
                "files": []
              }
            ]
          }
        ]
      }
      ```
  * **Status `404`**: Registrasi tidak ditemukan.
    * Body (`application/json`):
      ```json
      {
        "error": "Registration not found"
      }
      ```

---

### 🔹 Detail Pembayaran Cicilan Sendiri
Mendapatkan informasi detail satu cicilan pembayaran mahasiswa yang bersangkutan.

* **Endpoint:** `GET /api/student/payments/:paymentId`
* **Headers:** `Authorization: Bearer <token>`
* **Parameter URL (Path Parameters):**
  * `paymentId` (string, wajib) - ID Pembayaran Cicilan (`registration_payment.id`)
* **Contoh Respons:**
  * **Status `200`**: Detail cicilan pembayaran berhasil dimuat.
    * Body (`application/json`):
      ```json
      {
        "payment": {
          "id": "pay-uuid-222",
          "registrationId": "reg-uuid-444",
          "installment": 1,
          "amount": 1000000,
          "status": "paid",
          "paidAt": "2026-07-11T13:00:00.000Z",
          "note": "Cicilan ke-1 lunas",
          "createdAt": "2026-07-10T08:00:00.000Z",
          "files": [
            {
              "id": "file-uuid-111",
              "type": "payment_proof",
              "fileName": "bukti_bayar_cicilan_1.png",
              "fileUrl": "https://api.sibita.com/uploads/registrations/bukti_bayar_cicilan_1.png",
              "fileSize": 102456
            }
          ]
        }
      }
      ```
  * **Status `404`**: Cicilan pembayaran tidak ditemukan atau tidak milik Anda.

---

### 🔹 Unggah Bukti Pembayaran Cicilan
Mengunggah berkas bukti pembayaran untuk cicilan tertentu. Jika data pembayaran (`registration_payment`) dengan `paymentId` tersebut belum ada di database, endpoint ini akan otomatis membuat record baru dengan mengkalkulasi urutan cicilan (`installment`) secara otomatis (mulai dari 1 jika belum ada data sebelumnya, atau increment +1 dari cicilan sebelumnya). Status pembayaran cicilan diatur menjadi `"processing"` dan tanggal `paidAt` diisi dengan waktu pengiriman data.

* **Endpoint:** `POST /api/student/payments/:paymentId/proof`
* **Headers:** `Authorization: Bearer <token>`
* **Content-Type:** `multipart/form-data`
* **Request Body:**
  * `file` (file, wajib) - Berkas bukti pembayaran fisik (PDF, DOCX, PNG, JPEG asli, maks 20MB)
  * `amount` (integer, wajib jika membuat baru) - Nominal uang pembayaran cicilan
* **Contoh Respons:**
  * **Status `200`**: Bukti pembayaran cicilan berhasil disimpan.
    * Body (`application/json`):
      ```json
      {
        "payment": {
          "id": "pay-uuid-222",
          "registrationId": "reg-uuid-444",
          "installment": 1,
          "amount": 1000000,
          "status": "processing",
          "paidAt": "2026-07-19T14:56:00.000Z",
          "note": null
        },
        "file": {
          "id": "file-uuid-111",
          "type": "payment_proof",
          "fileName": "bukti_bayar_cicilan_1.png",
          "fileUrl": "https://api.sibita.com/uploads/registrations/bukti_bayar_cicilan_1.png",
          "fileSize": 102456
        }
      }
      ```
  * **Status `400`**: Pembayaran sudah lunas / Tipe berkas tidak diizinkan.

---

### 🔹 Edit Pembayaran Sendiri (Belum Approved)
Mengubah data pembayaran cicilan mahasiswa sendiri (nominal, urutan cicilan, catatan, atau berkas bukti pembayaran) selama statusnya belum disetujui (belum `paid`).

* **Endpoint:** `PATCH /api/student/payments/:paymentId`
* **Headers:** `Authorization: Bearer <token>`
* **Content-Type:** `multipart/form-data` atau `application/json`
* **Request Body:**
  * `installment` (integer, opsional) - Urutan cicilan baru
  * `amount` (integer, opsional) - Nominal baru
  * `note` (string, opsional) - Catatan baru
  * `file` (file, opsional) - Berkas bukti pembayaran baru untuk menggantikan bukti lama
* **Contoh Respons:**
  * **Status `200`**: Pembayaran berhasil diperbarui. Status cicilan berubah kembali menjadi `"processing"`.
    * Body (`application/json`):
      ```json
      {
        "payment": {
          "id": "pay-uuid-222",
          "registrationId": "reg-uuid-444",
          "installment": 1,
          "amount": 1200000,
          "status": "processing",
          "note": "Revisi cicilan 1"
        },
        "file": {
          "id": "file-uuid-111",
          "type": "payment_proof",
          "fileName": "bukti_bayar_baru.png",
          "fileUrl": "https://api.sibita.com/uploads/registrations/bukti_bayar_baru.png",
          "fileSize": 204800
        }
      }
      ```
  * **Status `400`**: Pembayaran sudah disetujui (paid), tidak dapat diubah.

---

### 🔹 Hapus Pembayaran Sendiri (Belum Approved)
Menghapus data record cicilan pembayaran beserta berkas bukti fisiknya selama statusnya belum disetujui (belum `paid`).

* **Endpoint:** `DELETE /api/student/payments/:paymentId`
* **Headers:** `Authorization: Bearer <token>`
* **Contoh Respons:**
  * **Status `200`**: Pembayaran berhasil dihapus.
    * Body (`application/json`):
      ```json
      {
        "success": true,
        "message": "Data pembayaran berhasil dihapus"
      }
      ```
  * **Status `400`**: Pembayaran sudah disetujui (paid), tidak dapat dihapus.
