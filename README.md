[![Actions Status](https://github.com/Chuvikovsky/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Chuvikovsky/frontend-project-12/actions)

### Проект "Hexlet Chat"
Упрощенный онлайн чат с бекенд сервером, фронтенд которого построен на технологии React.
Особенности: авторизация, регистрация новых пользователей, переключение по каналам, управление каналами (добавление, переименование, удаление), интернационализация, всплывающие уведомления ( react-toastify), фильтрация нецензурных слов (leo-profanity).

Сообщения отправляются на сервер через POST запрос, получение данных от сервера через websockets.

React приложение постоено с помощью Vite.

#### Ссылка на проект
https://frontend-project-12-yvu1.onrender.com/

#### Используемые технологии
- React, React Router, Redux Toolkit, React Bootstrap
- Formik, Yup, i18next
- Socket.io client
- Bootstrap

### Системные требования
 - Node.js & npm

### Установка и запуск
Установка зависимостей
```bash
make install
```

Запуск сервера
```bash
make start
```
Сборка приложения
```bash
make build
```