
## Работа с проектом

### Экспорт OpenAPI

```sh
poetry run poe export_openapi
```

## Установка

- создать БД maintenance в PostgreSQL

### Файл с настройками
Настройки проекта хранятся в файле .env. После установки этого файла нет. Создать файл можно командой

```sh
poetry run poe create_env
```


## Симулятор

```sh
poetry run poe simulator
```