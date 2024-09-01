# Boards API

Boards API, kanban tablosu uygulamaları için bir arka uç API'sidir. Bu API, panoları yönetmek ve kullanıcılar arasında etkileşim sağlamak için gerekli uç noktaları sunar.

## Kurulum

### Gereksinimler

- Node.js v14+
- npm v6+

### Kurulum Adımları

1. Depoyu klonlayın:

2. Bağımlılıkları yükleyin:
    ```
    npm install
    ```

3. `.env` dosyasını oluşturun ve aşağıdaki bilgileri ekleyin:
    ```env
    DB_URL="<your_database>"
    ```
    Kendi veritabanı bilgilerinizi buraya girin.

4. (Opsiyonel) Port ayarlarını `.env` dosyasına ekleyebilirsiniz. Varsayılan olarak, API 5001 portunda çalışacaktır. Örneğin:
    ```env
    PORT=5001
    ```

5. Sunucuyu başlatın:
    ```
    npm start
    ```

## API Kullanımı

### Temel Uç Noktalar

API uç noktaları hakkında detaylı bilgi için [Postman Collection](https://github.com/mertalitosun/kanban-task/tree/main/postman) dosyasını kullanabilirsiniz. Bu koleksiyon, API'nin tüm uç noktalarını test etmenizi sağlar.

## Kimlik Doğrulama

API'nin kimlik doğrulama gereksinimleri yoktur.

## Yanıt Formatları

Yanıtlar JSON formatında döner.

## Hata Kodları

- `400 Bad Request` - Geçersiz istek.
- `401 Unauthorized` - Geçersiz veya eksik kimlik doğrulama.
- `404 Not Found` - Uç nokta bulunamadı.
- `500 Internal Server Error` - Sunucu tarafında bir hata oluştu.

## API Kullanımı

### Kullanıcı Kaydı (Register)

**POST** `/api/v1/register`

Kullanıcı kaydı oluşturur.

**Örnek İstek (fetch):**
**Kullanıcı Kayıt**

```javascript
fetch('http://localhost:5001/api/v1/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        firstName: 'mertali',
        lastName: 'tosun',
        email: 'mertalitosun@mail.com',
        password: 'mertalitosun123'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```
**Başarılı İstek Sonucu:**
```
{
    "success": true,
    "data": {
        "_id": "64d9b2e7b0c16c1e00000001",
        "firstName": "mertali",
        "lastName": "tosun",
        "email": "mertalitosun@mail.com",
        "password": "$2b$10$e.lm....", // hashed password
        "__v": 0
    },
    "message": "Kayıt Başarılı"
}
```

**Hatalı İstek Sonucu:**
```
{
    "error": "Girmiş olduğunuz mail kullanılıyor."
}
```

**Kullanıcı Girişi:**
```javascript
fetch('http://localhost:5001/api/v1/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: 'mertalitosun@mail.com',
        password: 'mertalitosun123'
    })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```
**Başarılı İstek Sonucu:**
```
{
    "success": true,
    "message": "Giriş Başarılı"
}
```

**Hatalı İstek Sonucu:**
```
{
    "error": "Girilen maile ait kullanıcı bulunamadı."
}
```

## Destek

Sorularınız veya sorunlarınız için benimle iletişime geçin.

## Sürüm Notları

- **v1.0.0** - İlk sürüm.
