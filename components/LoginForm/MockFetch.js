function mockFetch(url, options) {
    if (url === 'https://api.example.com/login' && options.method === 'POST') {
      return Promise.resolve({
        json: () => Promise.resolve({ data: 'Запрос выполнен успешно' }),
      });
    } else {
      throw new Error('Неверные параметры fetch');
    }
  }
  
  export { mockFetch };
  