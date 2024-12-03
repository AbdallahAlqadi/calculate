const { NlpManager } = require('node-nlp');

// إعداد النموذج
const manager = new NlpManager({ languages: ['en'] });

// إضافة بيانات تدريب
manager.addDocument('en', 'What is your name?', 'greet.name');
manager.addDocument('en', 'Who are you?', 'greet.name');
manager.addAnswer('en', 'greet.name', 'I am a chatbot created to help you.');

manager.addDocument('en', 'What is the capital of France?', 'info.capital');
manager.addAnswer('en', 'info.capital', 'The capital of France is Paris.');

// تدريب النموذج
(async () => {
  await manager.train();
  manager.save();
  console.log('Model trained successfully.');
})();

// تشغيل المنطق عند النقر على زر
document.getElementById('askBtn').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value.trim();
  const responseDiv = document.getElementById('response');

  if (!userInput) {
    responseDiv.textContent = 'يرجى إدخال سؤال.';
    return;
  }

  // معالجة السؤال
  const response = await manager.process('en', userInput);
  responseDiv.textContent = response.answer || 'عذرًا، لا أستطيع الإجابة على هذا السؤال.';
});
