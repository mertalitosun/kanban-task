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

API uç noktaları hakkında detaylı bilgi için [Postman Collection](path_to_postman_collection) dosyasını kullanabilirsiniz. Bu koleksiyon, API'nin tüm uç noktalarını test etmenizi sağlar.

## Kimlik Doğrulama

API'nin kimlik doğrulama gereksinimleri yoktur.

## Yanıt Formatları

Yanıtlar JSON formatında döner.

## Hata Kodları

- `400 Bad Request` - Geçersiz istek.
- `401 Unauthorized` - Geçersiz veya eksik kimlik doğrulama.
- `404 Not Found` - Uç nokta bulunamadı.
- `500 Internal Server Error` - Sunucu tarafında bir hata oluştu.

## Destek

Sorularınız veya sorunlarınız için [destek e-posta adresi] ile iletişime geçin.

## Sürüm Notları

- **v1.0.0** - İlk sürüm.
