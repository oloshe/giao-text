const simulate = require('miniprogram-simulate')

test('../component/text-control/index', () => {
  const id = simulate.load('component/text-control/index');
  const comp = simulate.render(id);

  const parent = document.createElement('parent-wrapper');
  comp.attach(parent);
  
});