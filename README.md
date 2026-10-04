# Express Age Check API

Bài tập Express.js tạo middleware kiểm tra độ tuổi thông qua query string.

## Endpoint

`GET /api/info?name=<string>&age=<number>`

- `age < 18`: Trả về `403 Forbidden`.
- `age >= 18`: Trả về `200 OK` cùng thông tin `name` và `age`.
- Thiếu `age` hoặc `age` không phải số: Trả về `400 Bad Request`.

## Cài đặt & Chạy

```bash
npm install
npm start
```
