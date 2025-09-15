const NotFoundPage = () => {
  return (
<div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl">Страница не найдена</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        На главную
      </a>
    </div>
  );
}

export default NotFoundPage;
