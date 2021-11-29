const logContainerEl = document.querySelector('#log-container');

function CreateLog(message, color) {
  const logData = document.createElement('div');
  logData.classList.add('logData');

  if(color == undefined) {
    color = '#234';
    logData.style.borderRight = '5px solid #0a0';
  }
  logData.style.background = color;
  
  logData.innerText = message;

  logContainerEl.insertAdjacentElement('beforeend', logData);
}